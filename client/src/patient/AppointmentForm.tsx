import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import {useLogIN} from "../../ContextLog";
import img from "../assets/appotmint.png";
import moment from "moment-timezone";

const AppointmentForm = () => {
  const {Patient, dark} = useLogIN();
  console.log("Patient", Patient._id);

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [doctorAvailability, setDoctorAvailability] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  // Update the available appointment times when the doctor or date is changed
  useEffect(() => {
    if (doctorAvailability && appointmentDate) {
      const selectedDay = doctorAvailability.find(
        day => day.day === appointmentDate
      );
      if (selectedDay) {
        const start = moment(selectedDay.startTime, "h:mm A");
        const end = moment(selectedDay.endTime, "h:mm A");
        const times = [];
        while (start.isBefore(end)) {
          times.push(start.format("h:mm A"));
          start.add(30, "minutes");
        }
        setAvailableTimes(times);
      } else {
        setAvailableTimes([]);
      }
    } else {
      setAvailableTimes([]);
    }
  }, [doctorAvailability, appointmentDate]);

  // Handle the appointment time selection
  const handleTimeChange = event => {
    setAppointmentTime(event.target.value);
  };
  const handleChange = event => {
    const selectedSymptom = event.target.value;
    if (event.target.checked) {
      //@ts-ignore
      setSymptoms([...symptoms, selectedSymptom]);
    } else {
      setSymptoms(symptoms.filter(symptom => symptom !== selectedSymptom));
    }
  };
  const handleDoctorChange = event => {
    const newDoctor = event.target.value;
    setSelectedDoctor(newDoctor);

    // Set the doctor availability for the newly selected doctor
    const selectedDoctorData = doctors.find(doctor => doctor._id === newDoctor);
    if (selectedDoctorData) {
      setDoctorAvailability(selectedDoctorData.availableDaysAndHours);
    } else {
      setDoctorAvailability([]);
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

        // Get the current date and add a week to it
        const nextWeek = moment().startOf("day").add(1, "weeks");

        // Filter out the past dates from the doctor's availability data
        const futureAvailability = response.data.map(doctor => ({
          ...doctor,
          availableDaysAndHours: doctor.availableDaysAndHours.filter(day => {
            const dayDate = moment(day.day, "YYYY-MM-DD");
            return dayDate.isSameOrAfter(nextWeek);
          }),
        }));

        // Set the doctor availability for the selected doctor
        const selectedDoctorData = futureAvailability.find(
          doctor => doctor._id === selectedDoctor
        );
        if (selectedDoctorData) {
          setDoctorAvailability(selectedDoctorData.availableDaysAndHours);
        } else {
          setDoctorAvailability([]);
        }

        setLoading(false);
        console.log("response", response.data);
      } catch (error) {
        setLoading(false);

        console.log("Error while fetching doctors: ", error);
      }
    };
    fetchDoctors();
  }, []);

  // const handleSubmit = async e => {
  //   e.preventDefault();
  //   if (!appointmentDate || !appointmentTime) {
  //     setErrorMessage("Please fill up all the fields");
  //     return;
  //   }

  //   // Convert the selected date to a JavaScript date object
  //   const appointmentDateObject = moment(
  //     appointmentDate,
  //     "dddd, MMMM D YYYY"
  //   ).toDate();

  //   // Check if the selected date is before today's date
  //   const today = moment().startOf("day");
  //   const selectedDate = moment(appointmentDateObject).startOf("day");

  //   if (selectedDate.isBefore(today)) {
  //     // If the selected date has already passed, add 7 days to move it to the next week
  //     selectedDate.add(7, "days");
  //   }

  //   try {
  //     setLoading(true);
  //     const response = await axios.post(
  //       "http://localhost:3000/user/appointment",
  //       {
  //         doctorId: selectedDoctor,
  //         patient: Patient._id,
  //         appointmentDate: selectedDate.toDate(),
  //         appointmentTime,
  //         symptoms,
  //       }
  //     );
  //     setLoading(false);

  //     console.log("response", response.data);
  //   } catch (error) {
  //     // Delete the error message after 2s
  //     setTimeout(() => {
  //       setErrorMessage("");
  //     }, 4000);

  //     setErrorMessage(error.response.data.error);

  //     console.log(
  //       "Error while creating appointment: ",
  //       error.response.data.error
  //     );
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!appointmentDate || !appointmentTime) {
      setErrorMessage("Please fill up all the fields");
      return;
    }

    // Convert the selected date to a JavaScript date object
    const appointmentDateObject = moment
      .utc(appointmentDate, "dddd, MMMM D YYYY")
      .toDate();

    // Check if the selected date is before today's date in UTC timezone
    const today = moment.utc().startOf("day");
    const selectedDate = moment.utc(appointmentDateObject).startOf("day");
    if (selectedDate.isBefore(today)) {
      // If the selected date has already passed, add 7 days to move it to the next week
      selectedDate.add(7, "days");
    }

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/user/appointment",
        {
          doctorId: selectedDoctor,
          patient: Patient._id,
          appointmentDate: selectedDate.toDate(),
          appointmentTime,
          symptoms,
        }
      );
      setLoading(false);

      console.log("response", response.data);
    } catch (error) {
      // Delete the error message after 2s
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);

      setErrorMessage(error.response.data.error);

      console.log(
        "Error while creating appointment: ",
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
            <div className=" ml-2">
              <p className="mb-4">Before your appointment:</p>
              <ul className="list-disc list-inside mb-4">
                <li>
                  Please arrive 15 minutes early to check in and fill out any
                  necessary paperwork.
                </li>
                <li>
                  If you have any questions or concerns about your appointment,
                  please call our office at{" "}
                  <a href="tel:[phone number]" className="text-blue-600">
                    [phone number]
                  </a>{" "}
                  before your scheduled appointment time.
                </li>
                <li>
                  If you need to cancel or reschedule your appointment, please
                  notify us at least 24 hours in advance.
                </li>
                <li>
                  If you have any insurance information or documents that need
                  to be submitted before your appointment, please bring them
                  with you.
                </li>
              </ul>
            </div>
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
                <div className="px-3 mb-5">
                  <label className="block font-medium text-lg mb-2">
                    Choose a doctor:
                    <select
                      className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 mt-2"
                      value={selectedDoctor}
                      onChange={handleDoctorChange}
                    >
                      <option value="">Select a doctor</option>
                      {doctors &&
                        doctors.length > 0 &&
                        doctors.map(doctor => (
                          <option key={doctor._id} value={doctor._id}>
                            {doctor.name.firstName} {doctor.name.lastName} (
                            {doctor.specialty})
                          </option>
                        ))}
                    </select>
                  </label>
                  <label className="block font-medium text-lg mb-2">
                    Choose an appointment date:
                    <select
                      className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 mt-2"
                      value={appointmentDate}
                      onChange={event => setAppointmentDate(event.target.value)}
                    >
                      <option value="">Select an appointment date</option>
                      {doctorAvailability &&
                        doctorAvailability.length > 0 &&
                        doctorAvailability.map(availability => (
                          <option
                            key={availability._id}
                            value={availability.day}
                          >
                            {availability.day}
                          </option>
                        ))}
                    </select>
                  </label>
                  <label className="block font-medium text-lg mb-2">
                    Choose an appointment time:
                    <select
                      className="w-full border-2 border-gray-300 rounded-lg py-2 px-4 mt-2"
                      value={appointmentTime}
                      onChange={handleTimeChange}
                      disabled={availableTimes.length === 0}
                    >
                      <option value="">Select an appointment time</option>
                      {availableTimes.map(time => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                    </select>
                  </label>
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
