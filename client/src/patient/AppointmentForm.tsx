import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {useLogIN} from "../../ContextLog";
import img from "../assets/appotmint.png";

const AppointmentForm = () => {
  const {Patient, dark} = useLogIN();
  console.log("Patient", Patient._id);

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [symptoms, setSymptoms] = useState([]);

  const handleChange = event => {
    const selectedSymptom = event.target.value;
    if (event.target.checked) {
      //@ts-ignore
      setSymptoms([...symptoms, selectedSymptom]);
    } else {
      setSymptoms(symptoms.filter(symptom => symptom !== selectedSymptom));
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/user/getDoctor"
        );
        setDoctors(response.data);
        setLoading(false);
        console.log("response", response.data);
      } catch (error) {
        setLoading(false);

        console.log("Error while fetching doctors: ", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      !selectedDoctor ||
      !appointmentDate ||
      !appointmentTime ||
      !symptoms.length
    ) {
      setErrorMessage("Please fill up all the fields");
      return;
    }

    try {
      setLoading(true);
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
      setLoading(false);

      console.log("response", response.data);
    } catch (error) {
      //@ts-ignore

      //delettheerrormassage after2s
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);

      setErrorMessage(error.response.data.error);

      console.log(
        "Error while creating appointment: ",
        //@ts-ignore
        error.response.data.error
      );
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "#fff",
      }}
      className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5"
    >
      <div
        className="bg-cyan-300  rounded-3xl shadow-xl w-full overflow-hidden"
        style={{
          maxWidth: "950px",
        }}
      >
        <div className="md:flex w-full ">
          <div className="hidden md:block w-1/2 py-20 px-2">
            <img src={img} alt="img" />
            {errorMessage ? (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline">{errorMessage}</span>
              </div>
            ) : null}
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl text-gray-900">
                Make an Appointment
              </h1>
              <p className="text-gray-600">Fill up the form below</p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className=" px-3 mb-5">
                  <label
                    htmlFor="doctor"
                    className="text-xs font-semibold px-1 "
                  >
                    Select Doctor:
                  </label>
                  <div className="flex">
                    <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                      <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                    </div>
                    <select
                      name="doctor"
                      id="doctor"
                      className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
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
                  </div>
                </div>

                <div className="flex space-x-14">
                  <div className="w-1/2 px-3 mb-5">
                    <label
                      htmlFor="appointmentDate"
                      className="text-xs font-semibold px-1"
                    >
                      Appointment Date:
                    </label>

                    <input
                      required
                      className="w-full  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      type="date"
                      name="appointmentDate"
                      id="appointmentDate"
                      value={appointmentDate}
                      onChange={e => setAppointmentDate(e.target.value)}
                    />
                  </div>
                  <div className="w-1/2 px-3 mb-5">
                    <label
                      htmlFor="appointmentTime"
                      className="text-xs font-semibold -ml-7 text-center  mt-9"
                    >
                      Appointment Time:
                    </label>

                    <input
                      required
                      className="w-full -ml-10  py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                      type="time"
                      name="appointmentTime"
                      id="appointmentTime"
                      value={appointmentTime}
                      onChange={e => setAppointmentTime(e.target.value)}
                    />
                  </div>
                </div>

                <label
                  htmlFor="symptoms"
                  className=" text-xl font-semibold px-1 mr-28 mt-5"
                >
                  Symptoms:
                </label>
                <div className="grid grid-cols-3 gap-4 px-3  mb-5  p-4">
                  <div className="">
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="headache"
                      onChange={handleChange}
                    />
                    Headache
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="fever"
                      onChange={handleChange}
                    />
                    Fever
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="cough"
                      onChange={handleChange}
                    />
                    Cough
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="body pain"
                      onChange={handleChange}
                    />
                    Body Pain
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="sore throat"
                      onChange={handleChange}
                    />
                    Sore Throat
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="fatigue"
                      onChange={handleChange}
                    />
                    Fatigue
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="stomach ache"
                      onChange={handleChange}
                    />
                    Stomach Ache
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="vomiting"
                      onChange={handleChange}
                    />
                    Vomiting
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="diarrhea"
                      onChange={handleChange}
                    />
                    Diarrhea
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      value="nausea"
                      onChange={handleChange}
                    />
                    Nausea
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="dizziness"
                      onChange={handleChange}
                    />
                    Dizziness
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="chest pain"
                      onChange={handleChange}
                    />
                    Chest Pain
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="shortness of breath"
                      onChange={handleChange}
                    />
                    Shortness of Breath
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="loss of appetite"
                      onChange={handleChange}
                    />
                    Loss of Appetite
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="loss of taste"
                      onChange={handleChange}
                    />
                    Loss of Taste
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="loss of smell"
                      onChange={handleChange}
                    />
                    Loss of Smell
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="muscle pain"
                      onChange={handleChange}
                    />
                    Muscle Pain
                  </div>
                  <div>
                    <input
                      className="mr-1"
                      type="checkbox"
                      value="skin rash"
                      onChange={handleChange}
                    />
                    Skin Rash
                  </div>
                </div>
                <div>
                  <input
                    className="mr-1"
                    type="checkbox"
                    value="Other than that, I don't know the symptoms"
                    onChange={handleChange}
                  />
                  Other than that, I don't know the symptoms
                </div>
                <div className="text-gray-700 text-sm font-bold my-4">
                  Selected Symptoms: {symptoms.join(", ")}
                </div>

                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      className="bg-indigo-500 text-white px-4 py-2 rounded font-medium w-full"
                      type="submit"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
