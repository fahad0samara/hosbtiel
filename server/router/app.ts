import express from "express";
const router = express.Router();
import Appointment from "../model/appointment";

router.get("/appointments", async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name")
      .populate("patient", "name");
    res.json(appointments);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

router.post("/", (req: any, res: any) => {});

router.put("/:id", (req: any, res: any) => {
  // update an existing appointment
});

router.delete("/:id", (req: any, res: any) => {
  // delete an appointment
});

router.post(
  "/appointments",
  (
    req: {
      body: {
        doctor: any;
        patient: any;
        appointmentDate: any;
        appointmentTime: any;
        symptoms: any;
      };
    },
    res: {send: (arg0: any) => void; json: (arg0: any) => void}
  ) => {
    const {doctor, patient, appointmentDate, appointmentTime, symptoms} =
      req.body;
    const newAppointment = new Appointment({
      doctor,
      patient,
      appointmentDate,
      appointmentTime,
      symptoms,
    });

    newAppointment.save((error: any, appointment: any) => {
      if (error) {
        res.send(error);
      } else {
        res.json(appointment);
      }
    });
  }
);

// Create Appointment Route
router.post("/appointments", (req, res) => {
  const appointment = new Appointment({
    doctor: req.body.doctor,
    patient: req.body.patient,
    appointmentDate: req.body.appointmentDate,
    appointmentTime: req.body.appointmentTime,
    symptoms: req.body.symptoms,
  });
  appointment.save((err, appointment) => {
    if (err) {
      res.send(err);
    } else {
      res.send(appointment);
    }
  });
});

// Read Appointment Route
router.get("/appointments", (req, res) => {
  Appointment.find({}, (err: any, appointments: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(appointments);
    }
  });
});

// Update Appointment Route
router.put("/appointments/:id", (req, res) => {
  Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, appointment: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(appointment);
      }
    }
  );
});

// Delete Appointment Route
router.delete("/appointments/:id", (req, res) => {
  Appointment.findByIdAndRemove(req.params.id, (err: any, appointment: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(appointment);
    }
  });
});


export default router;

