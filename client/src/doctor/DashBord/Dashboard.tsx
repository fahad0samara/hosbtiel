import axios from "axios";

import {useEffect, useRef, useState} from "react";
import moment from "moment-timezone";


import "../Loder.css";

import Chart from "./Chart";
import {patient} from "../../types";
import Patient from "./Patient";
import MyCalendar from "./MyCalendar";

import img from "../../assets/Appointment.png";
import {useLogIN} from "../../../ContextLog";
import Loder from "../../tools/Loder";

import {BsAlarm} from "react-icons/bs";
import {FcOvertime} from "react-icons/fc";
import {formatDate} from "@fullcalendar/core";
import {AiOutlineReload} from "react-icons/ai";

import AppointmentModal from "./Model/AppointmentModal";
import Alert from "../../tools/Alert";

interface Appointment {
  _id: string;
  doctor: string;
  patient: {};
  appointmentDate: number;
  appointmentTime: string;
}

interface AppointmentsResponse {
  appointments: Array<Appointment>;
  appointmentCount: number;
  nextDayAppointments: Array<Appointment>;
}
const Dashboard = () => {
  const {Doctor, dark} = useLogIN();
  const [timeUntilNextAppointment, setTimeUntilNextAppointment] = useState("");
  const [appointmentData, setAppointments] = useState<any>([]);

  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const handleViewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    if (!Doctor || !Doctor._id) {
      return;
    }

    axios
      .get(`http://localhost:3000/doctor/appointment/${Doctor._id}`)
      .then(response => {
        setAppointments(response.data);

        setLoading(false);
      })

      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [Doctor]);
  useEffect(() => {
    if (!appointmentData || !appointmentData.currentAppointment) {
      return;
    }

    const intervalId = setInterval(() => {
      setLoading(true);
      const now = moment();
      const appointmentDateTime = moment(
        `${appointmentData.currentAppointment.appointmentDate} ${appointmentData.currentAppointment.appointmentTime}`,
        "YYYY-MM-DD h:mm A"
      );
      const timeDiff = appointmentDateTime.diff(now);

      if (timeDiff < 0) {
        setLoading(true);
        setTimeUntilNextAppointment("Appointment is in progress");
      } else {
        const duration = moment.duration(timeDiff);
        const days = Math.floor(duration.asDays());
        const hours = duration.hours();
        const minutes = duration.minutes();
        const seconds = duration.seconds();

        const timeString = `${
          days > 0 ? days + "d " : ""
        }${hours}h ${minutes}m ${seconds}s`;

        // Convert the appointment time to the user's local time zone
        const localAppointmentTime = appointmentDateTime
          .local()
          .format("h:mm A");
        setLoading(false);
        setTimeUntilNextAppointment(`Appointment at  ${timeString}`);
      }
      setLoading(false);
    }, 1000);

    setLoading(false);
    return () => clearInterval(intervalId);
  }, [appointmentData]);

  const [appointmentsCount, setAppointmentsCount] = useState<number>(0);

  const phrases0 = [
    "I hope you're having a great day, ",
    "Starting off the day with a positive attitude, ",
    "Here's to a productive day, ",
    "Ready for a busy day ahead, ",
    "It's going to be a great day, ",
    "Let's make today count, ",
    "Let's get to work, ",
    "Time to tackle the day, ",
    "Bringing our A-game, ",
    "Let's knock it out of the park, ",
    "Let's make the most of today, ",
    "Time to shine, ",
    "Bringing our best selves, ",
    "Ready for action, ",
    "Let's make it a good one, ",
    "Let's make today count, ",
    "Let's get things done, ",
    "Bringing our best foot forward, ",
    "Bringing our best selves, ",
    "Bringing our A-game, ",
    "Let's knock it out of the park, ",
    "Let's make the most of today, ",
    "Time to shine, ",
    ,
    "Ready for action, ",
    "Let's make it a good one, ",
    "Let's make today count, ",
    "Let's get things done, ",
    "Bringing our best foot forward, ",
  ];
  let phraseIndex = 0;
  const [phrase, setPhrase] = useState(phrases0[0]);
  const [loading, setLoading] = useState(true);

  /* Using the useEffect hook to set an interval that will change the phrase every 36000 milliseconds. */
  useEffect(() => {
    const interval = setInterval(() => {
      setPhrase(phrases0[phraseIndex]);
      phraseIndex++;
      if (phraseIndex === phrases0.length) phraseIndex = 0;
    }, 36000);
    return () => clearInterval(interval);
  }, []);

  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    const date = new Date();

    const hour = date.getHours();

    if (hour >= 0 && hour < 12) {
      setMessage("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setMessage("Good Afternoon");
    } else if (hour >= 17 && hour < 24) {
      setMessage("Good Evening");
    }
    setLoading(false);
  }, []);

  return loading ? (
    <Loder />
  ) : (
    <div
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <div className="p-5 mx-20">
        <div className="flex flex-col my-3">
          <h1 className="text-2xl font-bold">
            {message} ,
            <span className="text-cyan-300 font-bold ml-1">
              Dr.{Doctor && Doctor.name.firstName}
            </span>
          </h1>
          <h1 className="text-lg text-gray-400">{phrase},</h1>
        </div>
        <div className=" ">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="md:text-2xl text-xl -ml-20 md:-ml-0 font-bold text-cyan-300 mt-4 mb-9 text-center lg:text-start lg:ml-5">
                upcoming Appointment{" "}
              </h1>
              <div
                className="grid -ml-12 md:-ml-0
                lg:grid-cols-3 md:gap-10 rounded-2xl mx-auto  md:mx-15  
        md:-mt-11
        p-3 lg:-mt-8 "
              >
                <div className="rounded-2xl h-32 md:w-40 hidden md:block mx-auto mb-10">
                  <img
                    src={img}
                    alt="Appointment"
                    className="
          rounded-2xl
          shadow-60
lg:w-60

          object-cover"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <h1 className="text-lg font-bold">Miracle hospital</h1>
                    <p className="text-sm font-bold text-cyan-300  mb-4">
                      cypress
                      <br />
                    </p>
                  </div>
                </div>
                {appointmentData.currentAppointment ? (
                  <div className="grid grid-rows-3 gap-4  w-[21rem]   ">
                    <div
                      className="grid grid-cols-3
                items-center  ml-3"
                    >
                      <img
                        src={appointmentData.currentAppointment.patient.avatar}
                        alt="avatar"
                        //avatar
                        className=" rounded-full shadow-cyan-300 h-12 w-12 object-cover shadow-sm"
                      />
                      <div
                        className="
                  
             -ml-12
             text-center
          

            "
                      >
                        <h1 className=" italic text-sm">
                          patient Name :{" "}
                          {
                            appointmentData.currentAppointment.patient.name
                              .firstName
                          }
                          {"  "}
                          {
                            appointmentData.currentAppointment.patient.name
                              .LastName
                          }
                        </h1>
                        {appointmentData.currentAppointment.patient.symptoms &&
                          appointmentData.currentAppointment.patient.symptoms.map(
                            (symptom, index) => (
                              <span
                                key={index}
                                className="text-sm italic mr-2 text-gray-400"
                              >
                                {symptom}
                              </span>
                            )
                          )}
                      </div>

                      <button
                        onClick={handleViewClick}
                        className=" bg-cyan-300 rounded-full h-8 w-20    hover:bg-cyan-400
                shadow-md
                focus:outline-none
                focus:shadow-outline
                transition duration-150 ease-in-out
                transform
                hover:-translate-y-1
                hover:scale-110
                active:scale-95
                active:translate-y-0"
                      >
                        <h1 className="text-sm font-bold text-white">View</h1>
                      </button>
                      {showModal && (
                        <AppointmentModal
                          appointmentData={appointmentData.currentAppointment}
                          onClose={handleCloseModal}
                        />
                      )}
                    </div>

                    <div
                      style={{
                        backgroundColor: dark ? "#000" : "#ddd",
                        color: dark ? "white" : "black",
                        boxShadow: dark
                          ? "0px 0px 5px 0px #ccc"
                          : "0px 0px 10px 0px #ccc",
                      }}
                      className=" -mt-2
              rounded-2xl
              shadow-60
              p-1
              mx-8
              sm:mx-3


      "
                    >
                      <div className="grid grid-cols-2 gap-5  p-4">
                        <div className="flex flex-row justify-center items-center space-x-1">
                          <div
                            className="
                  bg-white
                  rounded-full
                  h-10

                  w-10
                  flex
                  flex-row
                  justify-center
                  items-center
                  "
                          >
                            <BsAlarm className="text-xl text-red-500" />
                          </div>

                          <h1 className="text-sm font-bold ml-2">
                            {appointmentData.currentAppointment.appointmentTime}
                          </h1>
                        </div>

                        <div className="flex flex-row justify-center items-center space-x-2 ">
                          <div
                            className="
                  bg-white
                  rounded-full
                  h-10

                  w-10
                  flex
                  flex-row
                  justify-center
                  items-center
                  "
                          >
                            {" "}
                            <FcOvertime className="text-xl text-sky-400" />
                          </div>

                          <h1 className="text-sm font-bold ">
                            {formatDate(
                              appointmentData.currentAppointment.appointmentDate
                            )}
                          </h1>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="flex  w-80
          flex-col
          -mt-11
          sm:-mt-0
   
            justify-center items-center"
                  >
                    <div className="flex flex-col justify-center items-center ">
                      <h1 className="text-lg font-bold text-cyan-300 mt-4">
                        You have no upcoming appointment,
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <div
                style={{
                  backgroundColor: dark ? "#000" : "#fff",
                  color: dark ? "white" : "black",
                  boxShadow: dark
                    ? "0px 0px 5px 0px #ccc"
                    : "0px 0px 10px 4px #ccc",
                }}
                className=" 
                shadow-md
                border-solid   hidden md:block        border-2 border-cyan-300 h-64    rotate-6 transform space-y-6 rounded-2xl  duration-300 hover:rotate-0"
              >
                <div
                  style={{
                    backgroundColor: dark ? "#fff" : "#000",
                  }}
                  className=" rounded-full p-2 flex float-left h-4 w-4 "
                ></div>
                <div className="space-y-2 ">
                  <h1 className="text-xl font-bold text-center ">
                    Next Appointment
                  </h1>
                  <div className="border-b-2 border-cyan-300 my-2  mx-10  text-center  px-4 "></div>

                  {loading ? (
                    <div className="flex justify-center animate-spin items-center mt-20">
                      <AiOutlineReload className="text-4xl text-cyan-300" />
                    </div>
                  ) : appointmentData.currentAppointment ? (
                    <div className="flex flex-col mx-2 space-y-3">
                      <div className="flex flex-col mx-2 space-y-3">
                        <div className="space-x-2 flex">
                          <h1 className="text-lg font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
                            Date:
                          </h1>
                          <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
                            {formatDate(
                              appointmentData.currentAppointment.appointmentDate
                            )}
                          </h1>
                        </div>
                        <div
                          className="
                        flex"
                        >
                          <h1 className="text-lg font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
                            {" "}
                            Time:
                          </h1>
                          <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
                            {appointmentData.currentAppointment.appointmentTime}
                          </h1>
                        </div>

                        <div
                          className="
                        flex
                        "
                        >
                          <h1 className="text-lg font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
                            Patient Name:
                          </h1>
                          <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
                            {
                              // first name and lastname
                            }
                            {appointmentData.currentAppointment.patient
                              ? appointmentData.currentAppointment.patient.name
                                  .firstName
                              : "No patient"}{" "}
                            {appointmentData.currentAppointment.patient
                              ? appointmentData.currentAppointment.patient.name
                                  .LastName
                              : "No patient"}
                          </h1>
                        </div>
                        {timeUntilNextAppointment &&
                        timeUntilNextAppointment ? (
                          <div className="flex flex-row ">
                            <h1 className="text-md font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
                              {timeUntilNextAppointment}
                            </h1>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block">
          <Chart />
        </div>

        <Patient />
      </div>
    </div>
  );
};

export default Dashboard;
