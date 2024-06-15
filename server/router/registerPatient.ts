import express from "express";
const router = express.Router();
import Patient from "../model/patient";
const {
  registerValidation,
  loginValidation,
} = require("../middleware/validtion");
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { isAuth } from "../middleware/jwtPatient";
import Doctor from "../model/doctor";
import Appointment from "../model/appointment";

router.post("/registerPatient", async (req, res) => {
  // validate the data before we make a user
  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const emailExist = await Patient.findOne({
      email: req.body.email,
    });
    if (emailExist) return res.status(400).send("Email already exists");

    // create  healthID id for user start from 10
    const healthID = await Patient.find().countDocuments();
    const healthIDNumber = healthID + 10;

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const patient = new Patient({
      prescriptions: req.body.prescriptions,
      healthIDNumber: healthIDNumber,
      name: req.body.name,
      password: hashedPassword,
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
    });
    const savedPatient = await patient.save();
    res.json({
      success: true,
      message: "Patient registered successfully",
      user: savedPatient,
    });
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message,
      err,
    });
  }
});

// log in
router.post("/loginPatient", async (req, res) => {
  // validate the data before we make a user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    // check if the healthIDNumber exists
    const patient = await Patient.findOne({
      healthIDNumber: req.body.healthIDNumber,
    });
    if (!patient) return res.status(400).send(" healthIDNumber is wrong");
    // check if the email exists
    const emailExist = await Patient.findOne({
      email: req.body.email,
    });
    if (!emailExist) return res.status(400).send("Email is wrong");

    // create and assign a token
    const token = jwt.sign(
      {
        _id: patient._id,
      },
      process.env.JWT_SECRET as string
    );
    res.header("auth-token", token);

    res.send({
      patient,
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message,
      err,
    });
  }
});

// get the Patient
router.get("/getPatient:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    res.send(patient);
  } catch (err) {
    res.status(400).json({
      message: (err as Error).message,
      err,
    });
  }
});

// router.post("/appointments", async (req, res) => {
//   try {
//     // Find the patient and doctor by their respective IDs
//     const patient = await Patient.findById(req.body.patient);
//     const doctor = await Doctor.findById(req.body.doctor);

//     // Check if the doctor is available for the appointment date and time
//     const workingHours = doctor.workingHours.find(
//       (hours) => hours.day === req.body.date
//     );

//     if (!workingHours) {
//       return res.status(400).json({
//         error: "Doctor is not available on the selected date",
//       });
//     }
//     const startTime = new Date("1970-01-01T" + workingHours.startTime + "Z");
//     const endTime = new Date("1970-01-01T" + workingHours.endTime + "Z");
//     const appointmentTime = new Date("1970-01-01T" + req.body.time + "Z");
//     if (appointmentTime < startTime || appointmentTime > endTime) {
//       return res.status(400).json({
//         error: "Doctor is not available at the selected time",
//       });
//     }

//     // If either the patient or doctor does not exist, return an error
//     if (!patient || !doctor) {
//       return res.status(404).json({
//         error: "Patient or doctor not found",
//       });
//     }

//     // Create a new appointment with the provided information
//     const appointment = new Appointment({
//       patient: req.body.patient,
//       doctor: req.body.doctor,
//       date: req.body.date,
//       time: req.body.time,
//       status: "pending",
//     });

//     // Save the appointment to the database
//     await appointment.save();

//     // Return the created appointment
//     res.json(appointment);
//   } catch (error) {
//     res.status(500).json({
//       error: error.message,
//     });
//   }
// });

// get the Patient

export default router;
