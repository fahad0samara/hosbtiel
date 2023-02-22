import express from "express";
const router = express.Router();
import Event from "../model/Event";

router.post("/add", async (req, res) => {
  const {title, description, date, time, patient, doctor} = req.body;
  const newEvent = new Event({
    title,
    description,
    date,
    time,
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

router.get("/all", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/get/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
