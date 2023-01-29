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

  const [errorMessage, setErrorMessage] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const handleChange = event => {
    const selectedSymptom = event.target.value;
    if (event.target.checked) {
      setSymptoms([...symptoms, selectedSymptom]);
    } else {
      setSymptoms(symptoms.filter(symptom => symptom !== selectedSymptom));
    }
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/getDoctor"
        );
        setDoctors(response.data);
        console.log("response", response.data);
      } catch (error) {
        console.log("Error while fetching doctors: ", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/appointment",
        {
          doctorId: selectedDoctor,
          patient: Patient._id,
          appointmentDate,
          appointmentTime,
          symptoms,
        }
      );
      console.log("response", response.data);
    } catch (error) {
      //@ts-ignore
      setErrorMessage(error.response.data.error);
      console.log(
        "Error while creating appointment: ",
        error.response.data.error
      );
    }
  };

  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-center
        w-full
        mx-20
        p-12
        h-full"
    >
      <h1>Appointment Form</h1>
      <form
        className="
        flex
        flex-col
        items-center
        justify-center"
        onSubmit={handleSubmit}
      >
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
          className=" border border-gray-400 p-2 rounded-lg"
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

        <div
          className="
     
        "
        >
          <label htmlFor="symptoms">Symptoms:</label>
          <div
            className="  grid 
     grid-cols-7
      gap-4
     "
          >
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="headache"
                onChange={handleChange}
              />
              Headache
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="fever"
                onChange={handleChange}
              />
              Fever
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="cough"
                onChange={handleChange}
              />
              Cough
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="body pain"
                onChange={handleChange}
              />
              Body Pain
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="sore throat"
                onChange={handleChange}
              />
              Sore Throat
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="fatigue"
                onChange={handleChange}
              />
              Fatigue
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="stomach ache"
                onChange={handleChange}
              />
              Stomach Ache
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="vomiting"
                onChange={handleChange}
              />
              Vomiting
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="diarrhea"
                onChange={handleChange}
              />
              Diarrhea
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="nausea"
                onChange={handleChange}
              />
              Nausea
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="dizziness"
                onChange={handleChange}
              />
              Dizziness
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="chest pain"
                onChange={handleChange}
              />
              Chest Pain
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="shortness of breath"
                onChange={handleChange}
              />
              Shortness of Breath
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="loss of appetite"
                onChange={handleChange}
              />
              Loss of Appetite
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="loss of taste"
                onChange={handleChange}
              />
              Loss of Taste
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="loss of smell"
                onChange={handleChange}
              />
              Loss of Smell
            </div>
            <div>
              <input
                className="w-full border border-gray-400 p-2 rounded-lg"
                type="checkbox"
                value="muscle pain"
                onChange={handleChange}
              />
              Muscle Pain
            </div>
          </div>
          <div
            className="text-gray-700
            text-sm
            font-bold
            mt-2
            "
          >
            Selected Symptoms: {symptoms.join(", ")}
          </div>
        </div>

        <p
          className="text-red-500
          text-xs italic"
        >
          {errorMessage}
        </p>

        <button
          className="bg-cyan-300
          mt-5
           hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;