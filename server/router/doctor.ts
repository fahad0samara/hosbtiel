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

      // Update the doctor's available days and working hours
      doctor.availableDays = req.body.availableDays;
      doctor.availableTime = {
        start: req.body.startTime,
        end: req.body.endTime,
      };

      // Save the updated doctor
      await doctor.save();

    

      // Send a success message to the client
      res.json({
        message: "Working hours and available days added successfully",
      });
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }
);

router.get("/doctors/:id/working-hours"
  , extractToken, checkDoctor, async (req, res) => {
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
        availableDays: doctor.availableDays,
        workingHours: doctor.availableTime && {
          start: doctor.availableTime.start,
          end: doctor.availableTime.end,
        },
      });
    } catch (err) {
      res.status(500).json({error: err.message});
    }
  }
);

router.get("/appointments/:id",extractToken, checkDoctor, async (req, res) => {

  try {
    const doctorId = req.params.id;
    const skip = parseInt(req.query.skip as string);
    const limit = parseInt(req.query.limit as string);

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("patient")
    
      .populate("doctor")
      .skip(skip)
      .limit(limit);
    



    if (!appointments || appointments.length === 0) {
      res.status(404).json({message: "No appointments found for this doctor"});
    } else {
      const count = await Appointment.countDocuments({doctor: doctorId});
      res.json({
        appointments: appointments,
        total: count,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: error.message});
      
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
    console.log(
      "appointments",
      appointments

    );
    





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






// router.get("/doctors/:id/patients", extractToken, checkDoctor, async (req, res) => {
//   try {
//     // Find the doctor by their ID
//     const doctor = await Doctor.findById(req.params.id);

//     // Check if the doctor exists
//     if (!doctor) {
//       return res.status(404).json({
//         error: "Doctor not found",
//       });

//     }

//     // Find all the patients that have been assigned to the doctor
//     const patients = await Patient.find({ doctor: doctor._id });

//     // Send the patients to the client
//     res.json(patients);
//   } catch (err) {
//     res.status(500).json({ error: err.message });

//   }
// });















    








  




    
    

 





router.post("/update-availability", async (req, res) => {
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
  
    doctor.availableDays = req.body.availableDays;
    doctor.availableTime = req.body.availableTime;

    // Save the updated doctor to the database
    await doctor.save();

    // Send a success message to the client
    res.json({message: "Working hours and availability updated successfully"});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});





// PUT route for updating the doctor's working hours
// router.put("/working-hours/:id", async (req, res) => {
//   try {
//     // Find the doctor by their ID
//     const doctor = await Doctor.findById(req.params.id);

//     // Check if the doctor exists
//     if (!doctor) {
//       return res.status(404).json({
//         error: "Doctor not found",
//       });
//     }


//     // Update the doctor's 


//     await doctor.save();

//     res.json({message: "Working hours updated successfully"});
//   } catch (err) {
//     res.status(500).json({error: err.message});
//   }
// });

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
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/prescription", async (req, res) => {
  try {
    // Find all prescriptions and populate the doctor and patient fields
    const prescriptions = await Prescription.find()
      .populate("patient")
      .populate("doctor")
      .exec();

    // Map over the prescriptions and return a new array with the desired properties
    res.json(
      prescriptions.map(prescription => {
        return {
          _id: prescription._id,
          //@ts-ignore
          doctor: `${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
          //@ts-ignore
          patient: ` ${prescription.patient.name.firstName} ${prescription.patient.name.lastName}`,
          medication: prescription.medication,
          notes: prescription.notes,
          date: prescription.date,
          dosage: prescription.dosage,
          frequency: prescription.frequency,
          duration: prescription.duration,
          refills: prescription.refills,
        };
      })
    );
  } catch (error) {
    // If there is an error, send a response with a status of 500 and the error message
    res.status(500).json({message: error.message});
  }
});

// get the id
router.get("/prescription/:id", async (req, res) => {
  try {
    // Find the prescription by id and populate the doctor and patient fields
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient")

      .populate("doctor")
      .exec();

    // If the prescription is not found, send a response with a status of 404 and a message
    if (!prescription) {
      return res.status(404).json({message: "Prescription not found"});
    }

    // If the prescription is found, send a response with a status of 200 and the prescription
    res.status(200).json({
      message: "Prescription retrieved successfully",
      data: prescription,
    });
  } catch (error) {
    // If there is an error, send a response with a status of 500 and the error message
    res.status(500).json({message: error.message});
  }
});

router.get("/prescription/:id", (req, res) => {
  Prescription.findById(req.params.id)
    .populate("patient")
    .populate({
      path: "doctor",
      populate: {
        path: "user",
      },
    })

    .exec((err, prescription) => {
      if (err) {
        return res.status(500).json({error: err});
      }
      if (!prescription) {
        return res.status(404).json({message: "Prescription not found"});
      }
      res.json({
        message: "Prescription retrieved successfully",

        data: prescription,
      });
    });
});

// router.get("/", async (req, res) => {
//   try {
//     const prescriptions = await Prescription.find().populate("doctor");
//     res.json(
//       prescriptions.map(prescription => {
//         return {
//           _id: prescription._id,
//           patient: prescription.patient,
//           medication: prescription.medication,
//           notes: prescription.notes,
//           date: prescription.date,
//           doctor: `${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
//         };
//       })
//     );
//   } catch (error) {
//     res.status(500).json({message: error.message});
//   }
// });

module.exports = router;

// router.get("/prescription/:id", (req, res) => {
//   Prescription.findById(req.params.id)
//     .populate("patient")
//     .populate({
//       path: "doctor",
//       populate: {
//         path: "User",
//       },
//     })

//     .exec((err, prescription) => {
//       if (err) {
//         return res.status(500).json({error: err});
//       }
//       if (!prescription) {
//         return res.status(404).json({message: "Prescription not found"});
//       }
//       res.json({
//         message: "Prescription retrieved successfully",
//         data: prescription,
//       });
//     });
// });

router.get("/prescription/:id", async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient")
      .populate({
        path: "doctor",
        populate: {
          path: "User",
        },
      });
    if (!prescription) {
      return res.status(404).json({message: "Prescription not found"});
    }
    res.status(200).json({
      message: "Prescription retrieved successfully",
      data: prescription,
    });
  } catch (err) {
    res.status(500).json({message: "Internal Server Error", error: err});
  }
});

// create a new doctor
// router.post("/register", async (req, res) => {
//   // validate the data before we make a doctor
//   const {error} = doctorValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   // check if the User is already in the database
//   const Userfind = await User.findById(req.body.user);
//   if (!Userfind) return res.status(400).send("User not1 found");

//   // check if the User the role is doctor
//   if (Userfind.role !== "doctor") return res.status(400).send("User not doctor");

//   // check if the doctor is already in the database
//   const userExist = await Doctor.findOne({
//     user: req.body.user,
//   });
//   if (userExist) return res.status(400).send("User already exists");

//   const doctor = new Doctor({
//     user: req.body.user,
//     name: req.body.name,
//     Hospital: req.body.Hospital,
//     HospitalAddress: req.body.HospitalAddress,
//     date: req.body.date,
//     phoneNumber: req.body.phoneNumber,
//     bloodGroup: req.body.bloodGroup,
//     degree: req.body.degree,
//     specialty: req.body.specialty,
//     experience: req.body.experience,
//   });
//   try {
//     const newDoctor = await doctor.save();
//     res.status(201).json(newDoctor);
//   } catch (err) {
//     res.status(400).json({message: err.message});
//   }
// });

// // get the dr
// router.get("/getDoctor", async (req, res) => {
//   try {
//     const doctor = await Doctor.find().populate("user")
//     res.json(doctor);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }

// });

// // loginDoctor
// // router.post("/loginDoctor", async (req, res) => {
// //   // validate the data before we make a doctor
// //   const {error} = loginDoctorValidation(req.body);
// //   if (error) return res.status(400).send(error.details[0].message);

// //   // check if the doctor is already in the database
// //   try {
// //     const doctor = await User.findOne({
// //       email: req.body.email,
// //     });
// //     if (!doctor) return res.status(400).send("Email is not found");

// //     // create and assign a token
// //     const token = jwt.sign({_id: doctor._id}, process.env.JWT_SECRET as string);
// //     res.header("auth-token", token);

// //     res.json({
// //       token,
// //       doctor,
// //     });
// //   } catch (error) {
// //     res.status(400).json({
// //       message: (error as Error).message,
// //       error,
// //     });
// //   }
// // });

// router.post("/addPrescriptions/:id", async (req, res) => {
//   // validate the data before we make a user
//   const {error} = addPrescriptionsValidation(req.body);
//   if (error) return res.status(400).send(error.details[0].message);

//   try {
//    /* Finding a patient by id and if it is not found it is returning a 400 status code with a message. */
//     const patient = await Patient.findOne({
//       _id: req.params.id,
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     const prescriptions = {
//       doctorID: req.body.doctorID,
//       medicines: req.body.medicines,
//       department: req.body.department,
//       date: req.body.date,
//       doctor: req.body.doctor,
//       advice: req.body.advice,
//       dosage: req.body.dosage,
//       nextVisit: req.body.nextVisit,
//       tests: req.body.tests,
//     };
//     patient.prescriptions.push(prescriptions);
//     const savedPatient = await patient.save();
//     res.send({
//       savedPatient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.post("/patients/:id/prescriptions", (req, res) => {
//   const patientId = req.params.id;
//   const prescription = req.body;

//   // Add the prescription to the patient's prescriptions array
//   Patient.findByIdAndUpdate(
//     patientId,
//     {$push: {prescriptions: prescription}},
//     {new: true}
//   )
//     .then(updatedPatient => res.send(updatedPatient))
//     .catch(err => res.status(400).send(err));
// });

// router.get("/getPrescriptions/:id", async (req, res) => {
//   try {
//     const patient = await Patient.findOne({
//       _id: req.params.id,
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     res.send({
//       patient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.get("/getPatients", async (req, res) => {
//   try {
//     const patients = await Patient.find();
//     res.send({
//       patients,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.get("/getPatient/:id", async (req, res) => {
//   try {
//     const patient = await Patient.findOne({
//       id: req.params.id,
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     res.send({
//       patient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// router.get("/getPatientForDoctor/:id", async (req, res) => {
//   try {
//     const patient = await Patient.find({
//       prescriptions: {
//         $elemMatch: {
//           doctorID: req.params.id,
//         },
//       },
//     });
//     if (!patient) return res.status(400).send("Patient not found");

//     res.send({
//       patient,
//     });
//   } catch (err) {
//     res.status(400).json({
//       err,
//     });
//   }
// });

// // Create a new prescription
// router.post('/pre', (req, res) => {

//   Patient.findById(req.body.patient, (err: any, patient: any) => {
//     if (err || !patient) {
//       return res.status(400).send('Invalid patient ID');
//     }

//     Doctor.findById(req.body.doctor, (err: any, doctor: any) => {
//       if (err || !doctor) {
//         return res.status(400).send('Invalid doctor ID');
//       }

//       const prescription = new Pre(req.body);
//       prescription.save((err: any) => {
//         if (err) {
//           return res.send(err);
//         }
//         res.json({ message: 'Prescription created successfully' });
//       });
//     });
//   });
// });

// // Get all prescriptions
// router.get('/pre', (req, res) => {
//   Pre.find((err: any, prescriptions: any) => {
//     if (err) {
//       return
//     }
//     res.json(prescriptions);
//   });
// });

// // Get a prescription by ID
// router.get('/pre/:id', (req, res) => {
//   Pre.findById(req.params.id, (err: any, prescription: any) => {
//     if (err) {
//       return
//     }
//     res.json(prescription);
//   });
// });

export default router

