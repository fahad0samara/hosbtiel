import axios from "axios";

import {useEffect, useRef, useState} from "react";
import moment from "moment-timezone";
import img from "../../assets/Appointment.png";
import {useLogIN} from "../../../ContextLog";
import Loder from "../../tools/Loder";
import {Link} from "react-router-dom";

import "../Loder.css";

import Chart from "./Chart";
import {patient} from "../../types";
import Patient from "./Patient";
import MyCalendar from "./MyCalendar";
import {FcOvertime} from "react-icons/fc";
import {BsAlarm} from "react-icons/bs";

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

  const [nextAppointment, setNextAppointment] = useState<
    Appointment | undefined
  >(undefined);
  const [appointments, setAppointments] = useState<Array<Appointment>>([]);

  const [appointmentsCount, setAppointmentsCount] = useState<number>(0);

  const [appointmentsCountTomorrow, setAppointmentsCountTomorrow] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const phrases0 = [
    "I hope you're having a great day, there are",
    "Starting off the day with a positive attitude, you have",
    "Here's to a productive day, you have",
    "Ready for a busy day ahead, you have",
    "It's going to be a great day, with",
    "Let's make today count, with",
    "Let's get to work, you have",
    "Time to tackle the day, with",
    "Bringing our A-game, with",
    "Let's knock it out of the park, you have",
    "Let's make the most of today, with",
    "Time to shine, with",
    "Bringing our best selves, with",
    "Ready for action, you have",
    "Let's make it a good one, with",
    "Let's make today count, with",
    "Let's get things done, you have",
    "Bringing our best foot forward, with",
    "Bringing our best selves, with",
    "Bringing our A-game, with",
    "Let's knock it out of the park, you have",
    "Let's make the most of today, with",
    "Time to shine, with",
    ,
    "Ready for action, you have",
    "Let's make it a good one, with",
    "Let's make today count, with",
    "Let's get things done, you have",
    "Bringing our best foot forward, with",
  ];
  let phraseIndex = 0;
  const [phrase, setPhrase] = useState(phrases0[0]);
  const [loading, setLoading] = useState(true);
  const intervalIdRef = useRef(null);
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
    const date = new Date();

    const hour = date.getHours();

    if (hour >= 0 && hour < 12) {
      setMessage("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setMessage("Good Afternoon");
    } else if (hour >= 17 && hour < 24) {
      setMessage("Good Evening");
    }
  }, []);

  const date = moment().format("YYYY-MM-DD HH:mm:ss");
  const [selectedDate, setSelectedDate] = useState(moment().toDate());
  const dateString = moment(selectedDate).format("YYYY-MM-DD");

  /* Fetching the data from the server and setting the state. */
  useEffect(() => {
    if (Doctor) {
      const getNextAppointment = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3000/doctor/appointments/${Doctor._id}/${dateString}`
          );
          console.log(response.data, "responsedfddddddddddddd");

          setAppointments(response.data.appointments);
          setAppointmentsCount(response.data.appointmentCount);
          setAppointmentsCountTomorrow(response.data.nextDayAppointments);

          const currentDate = new Date();

          // Filter out appointments that have already passed for the current date
          const filteredAppointments = response.data.appointments.filter(
            appointment => {
              const appointmentDate = new Date(appointment.appointmentDate);
              appointmentDate.setHours(
                appointment.appointmentTime.split(":")[0]
              );
              appointmentDate.setMinutes(
                appointment.appointmentTime.split(":")[1]
              );
              return appointmentDate > currentDate;
            }
          );

          // Sort appointments by date
          const sortedAppointments = filteredAppointments.sort((a, b) => {
            const aDate = new Date(a.appointmentDate);
            aDate.setHours(a.appointmentTime.split(":")[0]);
            aDate.setMinutes(a.appointmentTime.split(":")[1]);
            const bDate = new Date(b.appointmentDate);
            bDate.setHours(b.appointmentTime.split(":")[0]);
            bDate.setMinutes(b.appointmentTime.split(":")[1]);
            return aDate.getTime() - bDate.getTime();
          });

          // Get the next appointment
          let nextAppointment = null;
          if (sortedAppointments.length > 0) {
            nextAppointment = sortedAppointments[0];
          } else if (response.data.nextDayAppointments.length > 0) {
            nextAppointment = response.data.nextDayAppointments[0];
          }

          setNextAppointment(nextAppointment);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log("🚀 ~ file: Dashboard.tsx ~ line 6...", error);
        }
      };
      getNextAppointment();

      // Refresh next appointment every 30 min
      const intervalId = setInterval(() => {
        getNextAppointment();
      }, 1800000);

      return () => clearInterval(intervalId);
    }
  }, [Doctor, dateString]);

  const intervalFunction = () => {
    if (nextAppointment && nextAppointment.appointmentTime) {
      const appointmentDate = new Date(nextAppointment.appointmentDate);
      appointmentDate.setHours(
        parseInt(nextAppointment.appointmentTime.split(":")[0], 10)
      );
      appointmentDate.setMinutes(
        parseInt(nextAppointment.appointmentTime.split(":")[1], 10)
      );
      setTimeLeft(appointmentDate.getTime() - new Date().getTime());
    } else {
      // handle the case when nextAppointment is undefined
      setTimeLeft(0);
    }
  };

  /* Setting the time left to the time of the next appointment minus the current time. */
  useEffect(() => {
    let intervalId: number | undefined;
    if (nextAppointment && nextAppointment.appointmentTime) {
      setLoading(true);
      const appointmentDate = new Date(nextAppointment.appointmentDate);
      appointmentDate.setHours(
        parseInt(nextAppointment.appointmentTime.split(":")[0], 10)
      );
      appointmentDate.setMinutes(
        parseInt(nextAppointment.appointmentTime.split(":")[1], 10)
      );
      setTimeLeft(appointmentDate.getTime() - new Date().getTime());
      setLoading(false);
      // Refresh time left every second
      intervalId = setInterval(() => {
        setTimeLeft(appointmentDate.getTime() - new Date().getTime());
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [nextAppointment]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

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
          <h1 className="text-lg text-gray-400">
            {phrase},
            <span className="text-cyan-300 font-bold mx-1">
              {appointmentsCount}
            </span>
            appointments today
          </h1>
          {nextAppointment && (
            <h1 className="text-lg text-gray-400">
              Your next appointment is on{" "}
              <span className="text-cyan-300 font-bold mx-1">
                {new Date(nextAppointment.appointmentDate).toLocaleDateString()}
              </span>{" "}
              at{" "}
              <span className="text-cyan-300 font-bold mx-1">
                {nextAppointment.appointmentTime}
              </span>
            </h1>
          )}
        </div>

        <div className="grid grid-cols-1  ">
          <div className="grid lg:grid-cols-3 md:gap-10 rounded-2xl mx-auto">
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
            {nextAppointment ? (
              <div className="grid grid-rows-3 gap-4  w-[21rem]   ">
                <div
                  className="grid grid-cols-3
                items-center  ml-3"
                >
                  <img
                    src={nextAppointment.patient.avatar}
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
                      patient Name :
                      {nextAppointment.patient
                        ? nextAppointment.patient.name.firstName
                        : "No patient"}
                      {"  "}
                      {nextAppointment.patient
                        ? nextAppointment.patient.name.LastName
                        : "No patient"}
                    </h1>
                    <p className="text-sm italic mr-12 text-gray-400">
                      {/* {appointmentData.currentAppointment.doctor.specialty} */}
                    </p>
                  </div>

                  <button
                    // onClick={handleViewClick}
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
                  {/* {showModal && (
                    <AppointmentModal
                      appointmentData={appointmentData.currentAppointment}
                      onClose={handleCloseModal}
                    />
                  )} */}
                </div>

                <div
                  style={{
                    backgroundColor: dark ? "#000" : "#ddd",
                    color: dark ? "white" : "black",
                    boxShadow: dark
                      ? "0px 0px 5px 0px #ccc"
                      : "0px 0px 10px 0px #ccc",
                  }}
                  className=" mt-2
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
                        {nextAppointment.appointmentTime}
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
                        {moment(nextAppointment.appointmentDate).format("dddd")}
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
                  <h1 className="text-md italic  mt-4 ">
                    please add an appointment If you have any
                  </h1>
                  <h1>problem or If you feel any diseases</h1>
                </div>

                <Link
                  to="/patient/appointment"
                  className="bg-cyan-300 rounded-full w-full
                h-8
            

            
             
                
                text-center
                
                text-white
                font-bold
                text-sm
                hover:bg-cyan-400
                shadow-md
                focus:outline-none
                focus:shadow-outline
                transition duration-150 ease-in-out
                transform
                hover:-translate-y-1
                hover:scale-110
                active:scale-95
                active:translate-y-0
                "
                >
                  <h1 className="flex justify-center items-center mt-1">
                    Add Appointment
                  </h1>
                </Link>
              </div>
            )}
          </div>

          <div
            style={{
              backgroundColor: dark ? "#000" : "#fff",
              color: dark ? "white" : "black",
              boxShadow: dark
                ? "0px 0px 5px 0px #ccc"
                : "0px 0px 10px 4px #ccc",
            }}
            className=" absolute
            shadow-md
            border-solid             top-24 border-2 border-cyan-300  right-24 h-64    rotate-6 transform space-y-6 rounded-2xl  duration-300 hover:rotate-0"
          >
            <div
              style={{
                backgroundColor: dark ? "#fff" : "#000",
              }}
              className=" rounded-full p-2 flex float-left h-4 w-4 "
            ></div>
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-center ">
                Next Appointment
              </h1>
              <div className="border-b-2 border-cyan-300 my-2  mx-10  text-center  px-4 "></div>
              {nextAppointment ? (
                <div className="flex flex-col mx-2 space-y-3">
                  <div className="space-x-2 flex">
                    <h1 className="text-lg font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
                      Date:
                    </h1>
                    <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
                      {moment(nextAppointment.appointmentDate).format(
                        "MMMM Do YYYY"
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
                      {nextAppointment.appointmentTime}
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
                      {nextAppointment.patient
                        ? nextAppointment.patient.name.firstName
                        : "No patient"}{" "}
                      {nextAppointment.patient
                        ? nextAppointment.patient.name.LastName
                        : "No patient"}
                    </h1>
                  </div>

                  {
                    //loding
                  }
                  {timeLeft > 0 ? (
                    <div className=" flex space-x-2">
                      <h1 className="text-lg font-semibold ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
                        Time left :
                      </h1>
                      {timeLeft < 0 ? (
                        <p className="text-lg  ml-1 bg-amber-400 rounded-full w-auto shadow-xl text-center px-1">
                          {nextAppointment.patient
                            ? nextAppointment.patient.name.firstName
                            : "No patient"}
                        </p>
                      ) : null}
                      <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
                        {timeLeft < 0
                          ? null
                          : `${hours}h ${minutes}m ${seconds}s`}
                      </h1>
                    </div>
                  ) : (
                    <p
                      className="
                      font-semibold 
                      ml-1
                      
                      "
                    >
                      Appointment has started
                    </p>
                  )}
                </div>
              ) : (
                <div
                  className="
                  flex
                  flex-col
                  justify-center
                  items-center
                  "
                >
                  <h1
                    className="
                  font-semibold 
                  ml-1
                  text-center
                  "
                  >
                    You don't have
                  </h1>
                  <h2>an appointment today</h2>
                </div>
              )}
            </div>
          </div>
        </div>

        <Chart />
        <Patient />
      </div>
    </div>
  );
};

export default Dashboard;
