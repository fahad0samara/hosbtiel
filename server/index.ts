import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const webpush = require("web-push");

const vapidKeys = {
  publicKey:
    "BKzyNZ7PEyjFhXQaX0iz_P158hXukZrZ2-ZomAr0TmUIhAq6bnd77isLD517nrJ8k_2maIPECIkxYqeuWoh_7w8",
  privateKey: "yvFgcoD0tx242jvZwhqWzwkHHQeTgNYHzmNtTA-7DzE",
};

webpush.setVapidDetails(
  "mailto:fahad0samara@gmail.com",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

import cors from "cors";
import patientRouter from "./router/registerPatient";

import doctorRouter from "./router/doctor";
import adminRouter from "./router/admin";
import user from "./router/user";

import Event from "./router/Event";

app.use(express.json());
app.use(cors());

app.use("/auth", patientRouter);

// doctor
app.use("/doctor", doctorRouter);

// admin
app.use("/admin", adminRouter);

// user
app.use("/user", user);

// event
app.use("/Event", Event);

app.set("port", process.env.PORT || 3000);

app.get("/", (_req, res): void => {
  res.send("<h1>Hello world<h1>");
});

app.listen(app.get("port"), () => {
  console.info(`Server listen on port ${app.get("port")}`);
});
