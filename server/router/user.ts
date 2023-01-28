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

      // Send the doctor's information to the client
      res.json(doctor);
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

      // Send the admin's information to the client
      res.json(admin);
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

      // Send the patient's information to the client
      res.json(patient);
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
  // Check if the user is an admin

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

// router.post("/appointment", async (req, res) => {
//   try {
//     // Check if the patient exists patient:Patient._id,
//     const patient = await Patient.findById(req.body.patient);
//     if (!patient) {
//       return res.status(404).json({
//         error: "Patient not found",
//       });
//     }

//     // Check if the doctor exists
//     const doctor = await Doctor.findById(req.body.doctorId);
//     if (!doctor) {
//       return res.status(404).json({
//         error: "Doctor not found",
//       });
//     }

//     // Extract the patient's ID, doctor's ID, appointment date, and appointment time from the request body
//     const patientId = req.body.patient;
//     const doctorId = req.body.doctorId;
//     const appointmentDate = req.body.appointmentDate;
//     const appointmentTime = req.body.appointmentTime;

//     // Check if the doctor is available at the desired date and time
//     const existingAppointment = await Appointment.findOne({
//       doctor: doctorId,
//       appointmentDate: appointmentDate,
//       appointmentTime: appointmentTime,
//     });

//     if (existingAppointment) {
//       // If the doctor is not available, return an error message
//       return res.status(400).json({
//         error: "This doctor is not available at the desired date and time",
//       });
//     }

//     // If the doctor is available, create a new appointment document
//     const appointment = new Appointment({
//       doctor: doctorId,
//       patient: patientId,
//       appointmentDate: appointmentDate,
//       appointmentTime: appointmentTime,
//       symptoms: req.body.symptoms,
//     });
//     await appointment.save();

//     // Return success message to the patient
//     res.json({
//       message: "Appointment request sent successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       error: "Server error",
//     });
//   }
// });

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




    

    // Check if the doctor is available at the desired date and time
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      appointmentDate: appointmentDate,
      appointmentTime: appointmentTime,

    });
    if (existingAppointment) {
      // If the doctor is not available, return an error message
      return res.status(400).json({
        error: "This doctor is not available at the desired date and time",
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

    console.log('====================================');
    console.log(appointmentCount);
    console.log('====================================');
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
   error:error.message


    });
  }
});





export default router;
