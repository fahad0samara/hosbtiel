import express from "express";
const router = express.Router();

import jwt from "jsonwebtoken";
import Doctor from "../model/doctor";
import User from "../model/User";

import Patient from "../model/patient";
import Prescription from "../model/prescription";
import Appointment from "../model/appointment";

const {
  doctorValidation,
  loginDoctorValidation,
  addPrescriptionsValidation,

} = require("../middleware/validtion");


// Middleware to extract and decode the token from the headers
const extractToken = (req: any, res: any, next: any) => {


  // Get the token from the headers
  const token = req.headers.authorization?.split(" ")[1];

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access1" });
  }
  


  try {
    // Decode the token and add it to the request object
    //
    req.user = jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized access2" });
  }
};

// Middleware to check if the user is a doctor and has the correct ID
const checkDoctor = (req: any, res: any, next: any) => {
  try {
    // Get the user's role and id from the token
    const { role, doctorId } = req.user;

    // Check if the user is a doctor and if the id in the token matches the id in the route
    if (role === "doctor" && doctorId === req.params.id) {
      next();
    } else {
      return res.status(401).json({
        error: "Unauthorized access3"
      });
    }
  } catch (error) {
    return res.status(401).json({
      error: "Unauthorized access4"
    });
  }
};

router.get("/doctors/:id", extractToken, checkDoctor, async (req, res) => {
  try {
    // Find the doctor by their ID and populate the user field
    const doctor = await Doctor.findById(req.params.id).populate("user");

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found"
      });
    }

    // Send the doctor's information to the client
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post(
  "/doctors/:id/working-hours",

  async (req, res) => {
    try {
      // Find the doctor by their ID
      const doctor = await Doctor.findById(req.params.id);

      // Check if the doctor exists
      if (!doctor) {
        return res.status(404).json({
          error: "Doctor not found",
        });
      }

      // Update the doctor's availableDaysAndHours

      doctor.availableDaysAndHours = req.body.availableDaysAndHours;

      // Save the doctor's information
      await doctor.save();

      // Send the doctor's available days and working hours to the client
      res.json({
        availableDaysAndHours: doctor.availableDaysAndHours,
      });
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }
);

router.get(
  "/doctors/:id/working-hours",
  extractToken,
  checkDoctor,
  async (req, res) => {
    try {
      // Find the doctor by their ID
      const doctor = await Doctor.findById(req.params.id);

      // Check if the doctor exists
      if (!doctor) {
        return res.status(404).json({
          error: "Doctor not found",
        });
      }

      // Send the doctor's available days and working hours to the client
      res.json({
        availableDaysAndHours: doctor.availableDaysAndHours,
      });
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }
);

router.get("/appointments/:id", extractToken, checkDoctor, async (req, res) => {
  try {
    const doctorId = req.params.id;
    const skip = parseInt(req.query.skip as string);
    const limit = parseInt(req.query.limit as string);

    const appointments = await Appointment.find({doctor: doctorId})
      .populate("patient")

      .populate("doctor")
      .skip(skip)
      .limit(limit);

    res.json({
      appointments: appointments,
    });
  } catch (error) {
    console.log("====================================");
    console.log("🚀 ~ file: doctor.ts ~ line 152 ~ router.get ~ error", error);
    console.log("====================================");
    console.log(error);
    res.status(500).json({error});
  }
});

router.get("/appointments/:id/:date", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointmentDate = new Date(req.params.date);

    // Get the appointments for the current day
    const appointments = await Appointment.find({
      doctor: doctorId,
      appointmentDate: appointmentDate,
    }).populate("patient");
    console.log("appointments", appointments);

    // Get the appointment count for the current day
    const appointmentCount = await Appointment.countDocuments({
      doctor: doctorId,
      appointmentDate: appointmentDate,
    });

    // Update the doctor's appointmentCount field with the new count
    await Doctor.findByIdAndUpdate(doctorId, {
      appointmentCount: appointmentCount,
    });

    // Get the next day's appointments
    const nextDayAppointments = await Appointment.find({
      doctor: doctorId,

      appointmentDate: {
        $gte: new Date(
          new Date(appointmentDate).setDate(
            new Date(appointmentDate).getDate() + 1
          )
        ),
      },
    }).populate("patient");

    // Return the appointments for the current day and the next day
    res.json({
      appointments: appointments,
      appointmentCount: appointmentCount,
      nextDayAppointments: nextDayAppointments,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
});

router.get(
  "/all-appointments/:id",
  extractToken,
  checkDoctor,
  async (req, res) => {
    try {
      const doctorId = req.params.id;

      // Get the page number from the query string
      const page = parseInt(req.query.page as string);

      // Get the limit from the query string
      const limit = parseInt(req.query.limit as string);

      const skip = (page - 1) * limit;

      // Get all patients that the doctor saw
      const patients = await Appointment.find({
        doctor: doctorId,
      })
        .populate("patient")
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit);

      const count = await Appointment.countDocuments({doctor: doctorId});
      const totalPages = Math.ceil(count / limit);
      res.json({
        patients: patients,
        pagination: {
          page: page,
          limit: limit,
          totalPages: totalPages,
        },
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({error: error.message});
    }
  }
);

router.get("/all-patients/:id/:date", async (req, res) => {
  try {
    const doctorId = req.params.id;
    const appointmentDate = new Date(req.params.date);

    // Get all patients that the doctor has seen on the current day
    const patients = await Appointment.find({
      doctor: doctorId,
      appointmentDate: appointmentDate,
    })
      .populate("patient")
      .sort({createdAt: -1});

    // Send the patients to the client
    res.json({
      patients,
    });
  } catch (error) {
    console.log("====================================");
    console.log("error", error);
    console.log("====================================");
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
});

router.post(
  "/update-availability",

  async (req, res) => {
    try {
      // Find the doctor by their ID
      const doctor = await Doctor.findById(req.body.doctorId);

      // Check if the doctor exists
      if (!doctor) {
        return res.status(404).json({
          error: "Doctor not found",
        });
      }
      // Update the doctor's working hours and availability
      doctor.availableDaysAndHours = req.body.availableDaysAndHours;

      // Save the updated doctor to the database
      await doctor.save();

      // Send a success message to the client
      res.json({
        message: "Working hours and availability updated successfully",
      });
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  }
);

router.post("/Prescription", async (req, res) => {
  // validate the data before we make a doctor
  // const {error} = addPrescriptionsValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);
  const patient = await Patient.findById(req.body.patient);
  if (!patient) return res.status(404).send("Patient not found");

  const doctor = await Doctor.findById(req.body.doctor);
  if (!doctor) return res.status(404).send("Doctor not found");
  try {
    const prescription = new Prescription({
      patient: req.body.patient,
      doctor: req.body.doctor,
      medication: req.body.medication,
      dosage: req.body.dosage,
      frequency: req.body.frequency,
      duration: req.body.duration,
      date: req.body.date,
      notes: req.body.notes,
      refills: req.body.refills,
    });

    const result = await prescription.save();
    res.status(201).send({
      message: "Prescription created successfully",
      result,
    });
  } catch (error) {
    res.status(500).send({
      message: "Error creating prescription",
      error,
    });
  }
});

router.get("/Prescription", async (req, res) => {
  try {
    // Find all prescriptions and populate the doctor and patient fields
    const prescriptions = await Prescription.find()
      .populate("patient")
      .populate("doctor")
      .exec();

    // Return the prescriptions in the response
    res.json(prescriptions);
  } catch (error) {
    // If there is an error, send a response with a status of 500 and the error message
    res.status(500).json({message: error.message});
  }
});

router.get("/Prescription/:id", async (req, res) => {
  try {
    // Find the prescription by its ID and populate the doctor and patient fields
    const doctorId = req.params.id;
    const prescription = await Prescription.find({
      doctor: doctorId,
    })
      .populate("patient")

      .exec();
    // If the prescription is not found, return a 404 response
    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    // Return the prescription in the response
    res.json({
      prescription,
    });
  } catch (error) {
    // If there is an error, send a response with a status of 500 and the error message
    res.status(500).json({message: error.message});
  }
});





    

    


router.get("/all-patient/:id", extractToken, checkDoctor, async (req, res) => {
  try {
    const doctorId = req.params.id;

    // Get the page number from the query string
    const page = parseInt(req.query.page as string);

    // Get the limit from the query string
    const limit = parseInt(req.query.limit as string);

    const skip = (page - 1) * limit;

    // Get all patients that the doctor saw
    const patients = await Appointment.find({
      doctor: doctorId,
    })
      .populate("patient")

      .sort({createdAt: -1})
      .skip(skip)
      .limit(limit);
    // Remove duplicate patients
    const uniquePatients = patients.filter(
      (patient, index, self) =>
        index ===
        self.findIndex(
          t => t.patient._id.toString() === patient.patient._id.toString()
        )
    );

    // Extract only the patient data
    const extractedPatients = uniquePatients.map(patient => patient.patient);

    // Get the total number of patients that the doctor saw

    const count = await Appointment.countDocuments({doctor: doctorId});
    const totalPages = Math.ceil(count / limit);
    res.json({
      patients: extractedPatients,
      pagination: {
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
  }
});

// get the patients



export default router

