import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useLogIN } from "../../ContextLog";


const AppointmentForm = () => {
  const { Patient

  } = useLogIN();
  console.log("Patient", Patient._id);
  
const [doctors, setDoctors] = useState([]);
const [selectedDoctor, setSelectedDoctor] =useState("");
const [appointmentDate, setAppointmentDate] =useState("");
const [appointmentTime, setAppointmentTime] =useState("");
const [symptoms, setsymptoms] = useState("");
const [errorMessage, setErrorMessage] =useState("");

useEffect(() => {
const fetchDoctors = async () => {
try {
const response = await axios.get("http://localhost:3000/user/getDoctor");
setDoctors(response.data);
console.log("response", response.data);


  } catch (error) {
    console.log("Error while fetching doctors: ", error);
  }
};

fetchDoctors();
}, []);

const handleSubmit = async (e) => {
e.preventDefault();
try {
  const response = await axios.post("http://localhost:3000/user/appointment", {
  doctorId: selectedDoctor,
  patient: Patient._id,
  appointmentDate,
  appointmentTime,
  symptoms,
});
console.log("response", response.data);


} catch (error) {
  //@ts-ignore
  setErrorMessage(error);
  console.log("Error while creating appointment: ", error);
}
};

return (
  <form onSubmit={handleSubmit}>
    <label htmlFor="doctor">Select Doctor:</label>
    <select
      name="doctor"
      id="doctor"
      value={selectedDoctor}
      onChange={e => setSelectedDoctor(e.target.value)}
    >
      {doctors.map(doctor => (
        //@ts-ignore
        <option key={doctor._id} value={doctor._id}>
   
          {doctor.name.firstName} {doctor.name.lastName}
        </option>
      ))}
    </select>
    <label htmlFor="appointmentDate">Appointment Date:</label>
    <input
      type="date"
      name="appointmentDate"
      id="appointmentDate"
      value={appointmentDate}
      onChange={e => setAppointmentDate(e.target.value)}
    />
    <label htmlFor="appointmentTime">Appointment Time:</label>
    <input
      type="time"
      name="appointmentTime"
      id="appointmentTime"
      value={appointmentTime}
      onChange={e => setAppointmentTime(e.target.value)}
    />
    <label htmlFor="symptoms">Symptoms:</label>
    <textarea
      name="symptoms"
      id="symptoms"
      value={symptoms}
      onChange={e => setsymptoms(e.target.value)}
    />
    <button type="submit">Book Appointment</button>
  </form>
);
};

export default AppointmentForm;