import express from "express";
const router = express.Router();
import Event from "../model/Event";

router.post("/add-event-patient", async (req, res) => {
  const { title, start, end, patient, doctor } = req.body;
  const newEvent = new Event({
    title,
    start,
    end,
    patient,
    doctor,
  });
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/all-event-patient", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/get-event-patient/:id", async (req, res) => {
  try {
    const Patient = req.params.id;
    const events = await Event.find({ patient: Patient });
    res.status(200).json({
      events,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/add-event-dr", async (req, res) => {
  const { title, start, end, patient, doctor } = req.body;
  const newEvent = new Event({
    title,
    start,
    end,
    patient,
    doctor,
  });
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get-event-dr/:id", async (req, res) => {
  try {
    const Doctor = req.params.id;
    const events = await Event.find({ doctor: Doctor });
    res.status(200).json({
      events,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
