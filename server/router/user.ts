import express from "express";
const router = express.Router();
const webpush = require("web-push");
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";
const {
  registerUserValidation,
  loginUserValidation,
  registerValidation,
  loginValidation,
} = require("../middleware/validtion");

import {
  authAdmin,
  authPatient,
  isAdmin,
  isAuth,
} from "../middleware/jwtPatient";
import Patient from "../model/patient";
import Doctor from "../model/doctor";
import Appointment from "../model/appointment";
import {Document, Types} from "mongoose";
import Prescription from "../model/prescription";

interface JwtPayload {
  _id: string;
  role: string;
  doctorId?: string; // add this line
}

// loginUser
router.post(
  "/loginUser",

  async (req, res) => {
    // validate the data before we make a user
    const {error} = loginUserValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if the user is already in the database
    const user = await User.findOne({
      email: req.body.email,
    });
    if (!user) return res.status(400).send("Email is not found");

    try {
      // check if the password is correct
      const validPass = await bcrypt.compare(req.body.password, user.password);
      if (!validPass) return res.status(400).send("Invalid password");

      // Check if the user is a doctor
      if (user.role === "doctor") {
        // Find the corresponding doctor in the Doctor collection
        const doctor = await Doctor.findOne({
          user: user._id,
        });
        if (!doctor) return res.status(400).send("Doctor not found");

        // Create and assign a token and roles
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
            doctorId: doctor._id,
          },
          process.env.JWT_SECRET as string
        );
        res
          .header("auth-token", token)

          .json({
            token,
            user,
            doctor,
          });
      } else if (user.role === "patient") {
        // Find the corresponding patient in the Patient collection
        const patient = await Patient.findOne({
          user: user._id,
        });

        if (!patient) return res.status(400).send("Patient not found");

        // Create and assign a token and roles
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
            patientId: patient._id,
          },
          process.env.JWT_SECRET as string
        );

        res

          .header("auth-token", token)

          .json({
            token,
            user,
            patient,
          });
      } else if (user.role === "admin") {
        // Create and assign a token and roles
        const token = jwt.sign(
          {
            _id: user._id,
            role: user.role,
          },
          process.env.JWT_SECRET as string
        );
        res
          .header("auth-token", token)

          .json({
            token,
            user,
          });
      }
    } catch (error) {
      console.log(error);

      res.status(400).json({
        message: (error as Error).message,
        error,
      });
    }
  }
);

router.get("/getPatient/:id", async (req, res) => {
  try {
    // Find the patient by their ID and populate the user field
    const patient = await Patient.findById(req.params.id).populate("user");

    // Check if the patient exists
    if (!patient) {
      return res.status(404).json({
        error: "Patient not found",
      });
    }

    // Send the patient's information to the client
    res.json(patient);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.get("/getDoctor/:id", async (req, res) => {
  try {
    // Find the doctor by their ID and populate the user field
    const doctor = await Doctor.findById(req.params.id).populate("user");

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }

    // Send the doctor's information to the client
    res.json(doctor);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.get("/getAdmin/:id", async (req, res) => {
  try {
    // Find the admin by their ID and populate the user field
    const admin = await User.findById(req.params.id);

    // Check if the admin exists
    if (!admin) {
      return res.status(404).json({
        error: "Admin not found",
      });
    }

    // Send the admin's information to the client
    res.json(admin);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.get("/getPatient", async (req, res) => {
  try {
    // Find the patient by their ID and populate the user field
    const patient = await Patient.find().populate("user");

    // Check if the patient exists
    if (!patient) {
      return res.status(404).json({
        error: "Patient not found",
      });
    }

    // Send the patient's information to the client
    res.json(patient);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.get("/getDoctor", async (req, res) => {
  try {
    // Find the doctor by their ID and populate the user field
    const doctor = await Doctor.find().populate("user");

    // Check if the doctor exists
    if (!doctor) {
      return res.status(404).json({
        error: "Doctor not found",
      });
    }

    // Send the doctor's information to the client
    res.json(doctor);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});

router.post("/register-user", async (req: any, res: any) => {
  // validate
  const {error} = registerUserValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user is already in the database
  const emailFind = await User.findOne({
    email: req.body.email,
  });
  if (emailFind) return res.status(400).send("Email already exists");

  // destructure the request body
  const {email, password, role} = req.body;

  // hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  // create a new user with the specified role
  try {
    const user = new User({
      email,
      password: hashPassword,
      role,
    });
    await user.save();
    res.json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/register-patient", async (req, res) => {
  // validate the data before we make a patient
  const {error} = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the User is already in the database
  const Userfind = await User.findById(req.body.user);
  if (!Userfind) return res.status(400).send("User not found");

  // check if the patient is already in the database
  const userExist = await Patient.findOne({
    user: req.body.user,
  });
  if (userExist) return res.status(400).send("User already exists");
  // create  healthID id for user start from 10
  const healthIDNumber = (await Patient.countDocuments()) + 10;
  // create a new patient

  try {
    const patient = new Patient({
      user: req.body.user,
      prescriptions: req.body.prescriptions,
      healthIDNumber: healthIDNumber,
      name: req.body.name,
      mobile: req.body.mobile,
      email: req.body.email,
      relation: req.body.relation,
      address: req.body.address,
      date: req.body.date,
      medicationList: req.body.medicationList,
      diseaseList: req.body.diseaseList,
      allergyList: req.body.allergyList,
      bloodGroup: req.body.bloodGroup,
      contactPerson: req.body.contactPerson,
      weight: req.body.weight,
      height: req.body.height,
    });

    const newPatient = await patient.save();
    res.status(201).json({
      success: true,
      message: "Patient created successfully",
      newPatient,
    });
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});
router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find(); // Fetch all appointments from the database
    res.json(appointments); // Return the appointments as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"});
  }
});

router.get("/appointments/:id", async (req, res) => {
  try {
    // Check if the patient exists
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({error: "Patient not found"});
    }

    const now = new Date();

    let previousAppointment = null;
    let currentAppointment = null;
    let nextAppointment = null;

    const appointments = await Appointment.find({
      patient: req.params.id,
    })
      .sort({appointmentDate: 1})
      .populate("doctor", "name specialty");

    for (let i = 0; i < appointments.length; i++) {
      if (appointments[i].appointmentDate.getTime() > now.getTime()) {
        if (!currentAppointment) {
          currentAppointment = appointments[i];
        } else if (!nextAppointment) {
          nextAppointment = appointments[i];
        }
      } else if (appointments[i].appointmentDate.getTime() < now.getTime()) {
        previousAppointment = appointments[i];
      }
    }

    res.json({
      previousAppointment,
      currentAppointment,
      nextAppointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});
router.get("/all-appointments/:id", async (req, res) => {
  try {
    // Check if the patient exists
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({error: "Patient not found"});
    }

    // Get the page number from the query string
    const page = parseInt(req.query.page as string);

    // Get the limit from the query string
    const limit = parseInt(req.query.limit as string);

    const skip = (page - 1) * limit;

    const allAppointments = await Appointment.find({
      patient: req.params.id,
    })
      .sort({appointmentDate: 1})
      .skip(skip)
      .limit(limit)
      .populate("doctor", "name specialty");

    const count = await Appointment.countDocuments({
      patient: req.params.id,
    });
    const totalPages = Math.ceil(count / limit);
    res.json({
      allAppointments,
      pagination: {
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error});
  }
});

//  creating a new appointment for a patient.
router.post("/appointment", async (req, res) => {
  try {
    // Check if the patient exists
    const patient = await Patient.findById(req.body.patient);
    if (!patient) {
      return res.status(404).json({error: "Patient not found"});
    }

    // Check if the doctor exists
    const doctor = await Doctor.findById(req.body.doctorId);
    if (!doctor) {
      return res.status(404).json({error: "Doctor not found"});
    }

    // Extract the patient's ID, doctor's ID, appointment date, and appointment time from the request body
    const patientId = req.body.patient;
    const doctorId = req.body.doctorId;
    const appointmentDate = req.body.appointmentDate;
    const appointmentTime = req.body.appointmentTime;

    // Check if the patient has already made an appointment today
    const latestAppointment = await Appointment.findOne({
      patient: patientId,
      appointmentDate: appointmentDate,
    }).sort({appointmentTime: -1});
    if (latestAppointment) {
      // Compare the current time with the latest appointment time
      //@ts-ignore
      const diff = appointmentTime - latestAppointment.appointmentTime;
      const hours = diff / 1000 / 60 / 60;
      if (hours < 1.5) {
        return res.status(400).json({
          error:
            "Patient can only make one appointment per day and one appointment every hour and a half",
        });
      }
    }

    // Check if the patient already has an appointment for the same day
    const existing = await Appointment.findOne({
      patient: patientId,
      appointmentDate: appointmentDate,
      doctor: doctorId,
    });
    if (existing) {
      return res.status(400).json({
        error: "You already have an appointment for this date with this doctor",
      });
    }

    // Check if the doctor is available at the desired date and time
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
    });
    if (existingAppointment) {
      // If the doctor is not available, return an error message
      return res.status(400).json({
        error: `
          The doctor is not available at the desired date and time the have 
          another appointment at
          ${existingAppointment.appointmentTime}
          on
          ${existingAppointment.appointmentDate.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          
        `,
      });
    }
    // Check if the appointment date is in the past
    const today = new Date();
    const appointmentDateObj = new Date(appointmentDate);
    if (appointmentDateObj < today) {
      return res.status(400).json({
        error: `
          The appointment Time 
          ${appointmentDateObj.toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          is in you Try to Make it is in the Past, Please
          try again with a valid date and time
          `,
      });
    }

    // If the doctor is available, create a new appointment document
    const appointment = new Appointment({
      doctor: doctorId,
      patient: patientId,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,
      symptoms: req.body.symptoms,
    });
    await appointment.save();

    // Update appointment count for doctor
    const appointmentCount = await Appointment.countDocuments({
      doctor: doctorId,

      appointmentDate: appointmentDate,
    });
    await Doctor.findByIdAndUpdate(doctorId, {
      appointmentCount: appointmentCount,
    });

    console.log("====================================");
    console.log(appointmentCount);
    console.log("====================================");
    await Doctor.findByIdAndUpdate(doctorId, {
      pushSubscription: req.body.pushSubscription,
    });
    //  // Send push notification to doctor
    // const subscription = doctor.pushSubscription;
    // if (!subscription || !subscription.endpoint) {
    //   return res.status(400).json({error: "Invalid or missing push subscription"});
    // }
    //  const payload = JSON.stringify({
    //    title: "New Appointment",
    //    body: "You have a new appointment scheduled",
    //    icon: "path/to/icon.png",
    //  });
    //  webpush.sendNotification(subscription, payload);

    // Return success message to the patient
    res.json({
      message: "Appointment request sent successfully",
      success: true,
      appointmentCount,
      appointment,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

// get the prescription
router.get("/Prescription/:id", async (req, res) => {
  try {
    // Find the prescription by its ID and populate the doctor and patient fields
    const patientId = req.params.id;
    const prescription = await Prescription.find({
      patient: patientId,
    })
      .populate("patient")
      .populate("doctor")

      .exec();

    // Get the page number from the query string
    const page = parseInt(req.query.page as string);

    // Get the limit from the query string
    const limit = parseInt(req.query.limit as string);

    const skip = (page - 1) * limit;

    // Get the total number of prescriptions
    const count = await Prescription.countDocuments({
      patient: patientId,
    });

    // Calculate the total number of pages
    const totalPages = Math.ceil(count / limit);

    // If the prescription is not found, return a 404 response
    if (!prescription) {
      return res.status(404).json({
        message: "Prescription not found",
      });
    }

    // Return the prescription in the response
    res.json({
      prescription,
      pagination: {
        page: page,
        limit: limit,
        totalPages: totalPages,
      },
    });
  } catch (error) {
    // If there is an error, send a response with a status of 500 and the error message
    res.status(500).json({message: error.message});
  }
});
router.get(
  "/:id/prescriptions/:prescriptionId/download",

  async (req, res) => {
    try {
      // Find the prescription by ID
      const prescription = await Prescription.findById(
        req.params.prescriptionId
      )
        .populate("patient")
        .populate("doctor");
      if (!prescription) return res.status(404).send("Prescription not found.");

      // Create a new PDF document
      const getHeader = (currPage: any, totalPage: any) => [
        {
          text: "Hospital Name",
          style: "hospitalName",
          alignment: "center",
          margin: [0, 20, 0, 10],
          border: [true, true, true, false], // add border to top, left, right
        },
        {
          text: "Hospital Location",
          style: "hospitalLocation",
          alignment: "center",
          margin: [0, 0, 0, 10],
          border: [true, false, true, false], // add border to left and right
        },

        {
          text: `Date: ${new Date().toLocaleDateString()}`,

          margin: [0, 0, 0, 10],
        },
      ];

      const getFooter = (currPage: any, totalPage: any) => [
        {
          //@ts-ignore
          text: `Doctor: ${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
          alignment: "center",
          style: "footer",
          margin: [20, 10, 20, 10],
        },
      ];

      const docDefinition = {
        pageSize: {
          width: 350.28,
          height: 300.89,
        },

        pageMargins: [20, 60, 40, 40],
        header: getHeader,
        footer: getFooter,

        content: [
          {
            //@ts-ignore
            text: `This is a prescription for ${prescription.patient.name.firstName} ${prescription.patient.name.LastName}`,
            style: "header",
            alignment: "center",
            margin: [20, 10, 20, 10],

            border: [true, true, true, false], // add border to top, left, right
          },
          {
            text: `Medication: ${prescription.medication}`,
            alignment: "left",
            margin: [0, 0, 0, 10],
          },
          {
            text: `Dosage: ${prescription.dosage}`,
            alignment: "left",
            margin: [0, 0, 0, 10],
          },
          {
            //@ts-ignore
            text: `Frequency: ${prescription.frequency}`,
            alignment: "left",
            margin: [0, 0, 0, 10],
          },
          {
            text: `Refills: ${prescription.refills}`,
            alignment: "left",
            margin: [0, 0, 0, 10],
          },
          {
            text: `Duration: ${prescription.duration}`,
            alignment: "left",
            margin: [0, 0, 0, 10],
          },
          {
            text: `Notes: ${prescription.notes}`,
            alignment: "left",
            margin: [0, 0, 0, 10],
          },
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
          },
          footer: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10],
            color: "gray",
            backgroundColor: "red",
            border: [true, true, true, false], // add border to top, left, right
          },
          subheader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },

          hospitalName: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10],
            color: "gray",
          },

          prescriptionDate: {
            fontSize: 14,
            bold: true,
            margin: [0, 0, 0, 10],
            color: "white",
            textDecoration: "underline",
          },
        },
      };

      // Create a PDF from the document definition
      //@ts-ignore
      const pdfDoc = pdfMake.createPdf(docDefinition);
      // Send the PDF as a response
      pdfDoc.getBase64(data => {
        res.writeHead(200, {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment;filename="prescription.pdf"',
        });
        const download = Buffer.from(
          //@ts-ignore
          data.toString("utf-8"),
          "base64"
        );
        res.end(download);
      });
    } catch (error) {}
  }
);


export default router;
