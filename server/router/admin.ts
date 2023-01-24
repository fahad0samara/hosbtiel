import express from "express";
const router = express.Router();

import Doctor from "../model/doctor";
import Patient from "../model/patient";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User";
import Prescription from "../model/prescription";
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;











// registerAdmin

interface JwtPayload {
  _id: string;
}
// Middleware to check if user is an admin

const checkAdmin = async (req: any, res: any, next: any) => {
  if (req.header && req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      const user = await User.findById((decoded as JwtPayload)._id);
      if (!user) {
        return res.status(400).send("user not found");
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(400).send("Invalid Token 2");
    }
  } else {
    res.status(400).send("Invalid Token");
  }
};

router.get(
  "/patient/:id/prescriptions/:prescriptionId/download",
  checkAdmin,
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
          //@ts-ignore
          text: `This is a prescription for ${prescription.patient.name.firstName} ${prescription.patient.name.LastName}`,
          style: "header",
          alignment: "center",
          margin: [20, 10, 20, 10],
          color: "red",
        },

        {
          text: `Date: ${new Date().toLocaleDateString()}`,
          alignment: "right",
          margin: [0, 0, 0, 10],
        },
      ];

      const getFooter = (currPage: any, totalPage: any) => [
        {
          //@ts-ignore
          text: `Doctor: ${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
          alignment: "left",
          margin: [10, 10, 10, 10],
        },
     
       
      ];

      const docDefinition = {
        pageSize: {
          width: 550.28,
          height: 400.89,
        },

        pageMargins: [20, 60, 40, 40],
        header: getHeader,
        footer: getFooter,
        content: [
       

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
            text: `Quantity: ${prescription.quantity}`,
            alignment: "left",
            margin: [0, 0, 0, 10],
          },
          {
            text: `Refills: ${prescription.refills}`,
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

// router.get("/patient/:id/prescriptions/:prescriptionId/download", checkAdmin, async (req, res) => {
//     try {
//         // Find the prescription by ID
//         const prescription = await Prescription.findById(req.params.prescriptionId)
//             .populate("patient")
//             .populate("doctor");
//         if (!prescription) return res.status(404).send("Prescription not found.");

//         // Create a new PDF document
//         var docDefinition = {
//             content: [
//                 { text: 'Prescription ID: ' + prescription._id, style: 'header' },
//                 { text: 'Patient: ' + prescription.patient, style: 'subheader' },
//                 { text: 'Doctor: ' + prescription.doctor, style: 'subheader' },
//                 { text: 'Medication: ' + prescription.medication, style: 'subheader' },
//                 { text: 'Dosage: ' + prescription.dosage, style: 'subheader' },
//                 { text: 'Frequency: ' + prescription.frequency, style: 'subheader' },
//                 { text: 'Duration: ' + prescription.duration, style: 'subheader' },
//                 { text: 'Date: ' + prescription.date, style: 'subheader' },
//                 { text: 'Notes: ' + prescription.notes, style: 'subheader' },
//                 { text: 'Refills: ' + prescription.refills, style: 'subheader' }
//             ],
//             styles: {
//                 header: {
//                     fontSize: 18,
//                     bold: true
//                 },
//                 subheader: {
//                   fontSize: 18,
//                   bold: false
//               }
//           }
//       };

//       // Create a PDF from the document definition
//       const pdfDoc = pdfMake.createPdf(docDefinition);

//       // Send the PDF as a response
//       pdfDoc.getBase64((data) => {
//         res.writeHead(200,
//           {
//             'Content-Type': 'application/pdf',
//             'Content-Disposition': 'attachment;filename="prescription.pdf"'
//           });
//         const download = Buffer.from(
//           //@ts-ignore
//           data.toString('utf-8'), 'base64');
//         res.end(download);


    
  


    
        
        
      
     
//       });
//     } catch (error) {


//   }
// });

  
    




// Get a list of all admin
router.get("/admins", checkAdmin, (req, res) => {
  User.find({role: "admin"})
    .then(admins => res.json(admins))
    .catch(err => res.status(400).json(err));
});

// Delete an admin from the database
router.delete("/admin/:id", checkAdmin, (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(admin => res.json(admin))
    .catch(err => res.status(400).json(err));
});

// Get a list of all doctors
router.get("/doctor", checkAdmin, (req, res) => {
  Doctor.find()
    .populate("user")
    .then(doctors => res.json(doctors))
    .catch(err => res.status(400).json(err));
});

// Get a doctor by id
/* Finding a doctor by id and populating the user field. */
router.get("/doctor/:id", checkAdmin, (req, res) => {
  Doctor.findById(req.params.id)
    .populate("user")
    .then(doctor => res.json(doctor))
    .catch(err => res.status(400).json(err));
});

// Update a doctor's information
router.put("/doctor/:id", checkAdmin, (req, res) => {
  Doctor.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(doctor => res.json(doctor))
    .catch(err => res.status(400).json(err));
});

// Delete a doctor from the database
router.delete("/doctor/:id", checkAdmin, (req, res) => {
  Doctor.findByIdAndDelete(req.params.id)
    .then(doctor => res.json(doctor))
    .catch(err => res.status(400).json(err));
});

// Get a list of all patients
router.get("/patient", checkAdmin, (req, res) => {
  Patient.find().populate("user")
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json(err));
});

// Delete a patient from the database
router.delete("/patient/:id", checkAdmin, (req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then(patient => res.json(patient))
    .catch(err => res.status(400).json(err));
});

// Get a patient by id
router.get("/patient/:id", checkAdmin, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("user")
  
    if (!patient) return res.status(404).send("Patient not found");
    res.json(patient);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/patient/:id/prescriptions", checkAdmin, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({patient: req.params.id})
      .populate("patient")
      .populate("doctor");
    if (!prescriptions)
      return res.status(404).send("Prescriptions not found for this patient.");
    // Map over the prescriptions and return a new array with the desired properties
    const prescriptionsArray = prescriptions.map(prescription => {
      return {
        _id: prescription._id,

        //@ts-ignore
        patient: `${prescription.patient.name.firstName} ${prescription.patient.name.lastName}`,

        //@ts-ignore
        doctor: `${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
        medication: prescription.medication,
        notes: prescription.notes,
        date: prescription.date,
        dosage: prescription.dosage,
        frequency: prescription.frequency,
        duration: prescription.duration,
        refills: prescription.refills,
      

      };
    });
    res.json(prescriptionsArray);
      
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// router.get(
//    "/patient/:id/prescriptions/:prescriptionId/download",
//    checkAdmin,
//    async (req, res) => {
//      try {
//        // Find the prescription by ID
//        const prescription = await Prescription.findById(
//          req.params.prescriptionId
//        )
//          .populate("patient")
//          .populate("doctor");
//        if (!prescription)
//          return res.status(404).send("Prescription not found.");

//        // Create a new PDF document
//    const doc = new pdfkit();
//    doc.pipe(res);

//    const table = {
//      headers: [
//        "Prescription ID",
//        "Patient",
//        "Doctor",
//        "Medication",
//        "Dosage",
//        "Frequency",
//      ],
//      rows: [
//        [
//          prescription._id,
//          prescription.patient,
//          prescription.doctor,
//          prescription.medication,
//          prescription.dosage,
//          prescription.frequency,
//        ],
//      ],
//    };

//    doc
//      .fontSize(18)
//      .text("Prescription", {align: "center"})
//      .moveDown()
//      .fontSize(12)

//      .text(
//        //@ts-ignore
//        `Patient: ${prescription.patient.name.firstName} ${prescription.patient.name.lastName}`,
//        {align: "left"}
//      )
//      .moveDown()
//      .text(
//        //@ts-ignore
//        `Doctor: ${prescription.doctor.name.firstName} ${prescription.doctor.name.lastName}`,
//        {align: "left"}
//      )
//      .moveDown()
//      .text(`Medication: ${prescription.medication}`, {align: "left"})
//      .moveDown()
//      .text(`Dosage: ${prescription.dosage}`, {align: "left"})
//      .moveDown()
//      .text(`Frequency: ${prescription.frequency}`, {align: "left"})
//      .moveDown()
//      .text(`Duration: ${prescription.duration}`, {align: "left"})
//      .moveDown()
//      .text(`Refills: ${prescription.refills}`, {align: "left"})
//      .moveDown()
//      .text(`Notes: ${prescription.notes}`, {
//        align: "left",
//      })
//      .moveDown();

//    res.setHeader("Content-type", "application/pdf");
//    res.setHeader(
//      "Content-disposition",
//      "attachment; filename=Prescription.pdf"
//    );
//    doc.end()
//      } catch (error) {
//        res.status(500).send({
//          message: "Error downloading prescription",
//          error: error.message,
//        });
//      }

//   }
// );


  // router.get(
  //   "/patient/:id/prescriptions/:prescriptionId/download",
  //   async (req, res) => {
  //     console.log(
  //       "req.params.id",
  //       req.params.id,
  //       "req.params.prescriptionId",
  //       req.params.prescriptionId

  //     );
      

     
  //        try {
  //          const prescription = await Prescription.findById(req.params.prescriptionId)
  //            .populate("patient")
  //            .populate("doctor");
  //          if (!prescription)
  //            return res.status(404).send("Prescription not found.");
           

  //       // Create a new PDF document
  //       const pdfDoc = await pdfLib.PDFDocument.create();

  //       // Add a page to the document
  //       const page = pdfDoc.addPage();

  //       // Draw prescription details on the page
  //       page.drawText(`Prescription ID: ${prescription._id}`, { x: 50, y: 750 });
  //       page.drawText(`Patient: ${prescription.patient}`, { x: 50, y: 700 });
  //       page.drawText(`Doctor: ${prescription.doctor}`, { x: 50, y: 650 });
  //       page.drawText(`Medication: ${prescription.medication}`, { x: 50, y: 600 });
  //       page.drawText(`Dosage: ${prescription.dosage}`, { x: 50, y: 550 });
  //       page.drawText(`Frequency: ${prescription.frequency}`, { x: 50, y: 500 });
  //       page.drawText(`Duration: ${prescription.duration}`, { x: 50, y: 450 });
  //       page.drawText(`Date: ${prescription.date}`, { x: 50, y: 400 });
  //       page.drawText(`Notes: ${prescription.notes}`, { x: 50, y: 350 });
  //          page.drawText(`Refills: ${prescription.refills}`, { x: 50, y: 300 });
           
  //           // Serialize the PDFDocument to bytes (a Uint8Array)
  //          const pdfBytes = await pdfDoc.save();
           
  //           // Send the response
  //          res.set("Content-Type", "application/pdf");
  //          res.set("Content-Disposition", "attachment; filename=Prescription.pdf");
           



       
       
           
           
           
  




    
           
           
  //          res.send(pdfBytes);
           
  //          console.log("pdfBytes", pdfBytes);
           
  
       
  //     } catch (error)
 
    
  //     {
  //       console.log("error", error);
  //       console.log("error.message", error.message);
        
  //       res.status(500).send({
  //         message: "Error downloading prescription",
  //         error: error.message  
          
  //       });
  //     }
  //   }
  // );



module.exports = router;







  








          
 
    








// Update a patient's information
router.put("/patient/:id", checkAdmin, async (req, res) => {
  try {
    const patient
      = await
        Patient.findByIdAndUpdate(req
          .params
          .
          id
          , req
            .body
          , { new: true });
    if (!patient) return res.status(404).send("Patient not found"); 
    res.json(patient);
  } catch (error) {
    res.status(500).send(error.message);
  }
});









 
  



router.post("/update", async (req, res) => {
  try {
    // Find the user to be updated
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(404).send("User not found");

    // Update the user's role to "Admin"
    user.role = "admin";
    await user.save();

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Router for an administrator to register a new user with any role:

router.post("/register-user", async (req: any, res: any) => {
  // Check if the user is an admin

  // check if the user is already in the database
  const emailFind = await User.findOne({
    email: req.body.email,
  });
  if (emailFind) return res.status(400).send("Email already exists");

  // destructure the request body
  const {name, email, password, role} = req.body;

  // hash the password
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  // create a new user with the specified role
  try {
    const user = new User({
      name,
      email,
      password: hashPassword,
      role,
    });
    await user.save();
    res.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Router for an administrator to register a new doctor:
router.post("/register-dr", async (req, res) => {
  // validate the data before we make a doctor
  // const {error} = doctorValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // check if the User is already in the database
  const Userfind = await User.findById(req.body.user);
  if (!Userfind) return res.status(400).send("User not1 found");

  // check if the User the role is doctor
  if (Userfind.role !== "doctor") return res.status(400).send("User not doctor");

  // check if the doctor is already in the database
  const userExist = await Doctor.findOne({
    user: req.body.user,
  });
  if (userExist) return res.status(400).send("User already exists");

  const doctor = new Doctor({
    user: req.body.user,
    name: req.body.name,
    Hospital: req.body.Hospital,
    availableDays: req.body.availableDays,
    availableTime: req.body.availableTime,
    
     
  

    HospitalAddress: req.body.HospitalAddress,
    date: req.body.date,
    phoneNumber: req.body.phoneNumber,
    bloodGroup: req.body.bloodGroup,
    degree: req.body.degree,
    specialty: req.body.specialty,
    experience: req.body.experience,
  });
  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// Router for an administrator to register a new patient:
router.post("/register-patient", async (req, res) => {
  // validate the data before we make a patient
  // const { error } = registerValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  // check if the User is already in the database
  const Userfind = await User.findById
    (req.body.user);
  if (!Userfind) return res.status(400).send("User not found");

  // check if the User the role is patient
  if (Userfind.role !== "patient") return res.status(400).send("User not patient");

  // check if the patient is already in the database
  const userExist = await Patient.findOne({
    user: req.body.user,
  });
  if (userExist) return res.status(400).send("User already exists");
      // create  healthID id for user start from 10
    const healthID = await Patient.find().countDocuments();
    const healthIDNumber = healthID + 10;


    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const patient = new Patient({
    user: req.body.user,
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
  try {
    const newPatient = await patient.save();
    res.status(201).json(newPatient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





  








export default router;
