import img from "../../../assets/Appointment.png";

import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLogIN} from "../../../../ContextLog";
import {BsAlarm, BsFillArrowRightCircleFill} from "react-icons/bs";
import {FcOvertime} from "react-icons/fc";
import {Link} from "react-router-dom";
import moment from "moment-timezone";
import AppointmentModal from "./AppointmentModal";
import Loder from "../../../tools/Loder";
import Table from "./Table";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {month: "short", day: "numeric", year: "numeric"};
  return date.toLocaleDateString("en-US", options);
}
const PatientAppointments = () => {
  const {Profile, Patient, dark, setdark} = useLogIN();
  const [timeUntilNextAppointment, setTimeUntilNextAppointment] =
    useState(null);
  const [appointmentData, setAppointments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const handleViewClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setLoading(true);

    if (!Patient || !Patient._id) {
      return;
    }

    axios
      .get(`http://localhost:3000/user/appointments/${Patient._id}`)
      .then(response => {
        setAppointments(response.data);
        setLoading(false);
        console.log("====================================");
        console.log(response.data);
        console.log("====================================");
      })

      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, [Patient]);
  useEffect(() => {
    if (!appointmentData || !appointmentData.currentAppointment) {
      return;
    }

    const intervalId = setInterval(() => {
      const now = moment();
      const appointmentDateTime = moment(
        `${appointmentData.currentAppointment.appointmentDate} ${appointmentData.currentAppointment.appointmentTime}`,
        "YYYY-MM-DD h:mm A"
      );
      const timeDiff = appointmentDateTime.diff(now);

      if (timeDiff < 0) {
        setTimeUntilNextAppointment("Appointment time has passed");
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
        setLoading(true);
        setTimeUntilNextAppointment(
          `Appointment at ${localAppointmentTime} (${timeString} remaining)`
        );
      }
      setLoading(false);
    }, 1000);
    setLoading(false);
    return () => clearInterval(intervalId);
  }, [appointmentData]);

  const formatDate = dateString => {
    const options = {year: "numeric", month: "short", day: "numeric"};
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  // Usage:

  if (loading) {
    return (
      <div>
        <Loder />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="">
      <div>
        <div>
          <>
            {appointmentData && appointmentData ? (
              <div className="    italic sm:w-96  border-cyan-300 ">
                <div className="flex flex-row justify-between items-center md:ml-7 ml-4">
                  {timeUntilNextAppointment && timeUntilNextAppointment ? (
                    <div className="flex flex-row ">
                      <BsAlarm className=" sm:text-xl text-lg hidden sm:block" />
                      <p className=" text-sm ml-2">
                        {timeUntilNextAppointment}
                      </p>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </>
        </div>

        <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-9 text-center lg:text-start lg:ml-5">
          upcoming Appointment{" "}
        </h1>

        <div
          className="grid lg:grid-cols-3 md:gap-10 rounded-2xl mx-auto  md:mx-15  
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU"
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
                    {" "}
                    Dr.
                    {appointmentData.currentAppointment.doctor.name.firstName}
                    {"  "}
                    {appointmentData.currentAppointment.doctor.name.lastName}
                  </h1>
                  <p className="text-sm italic mr-12 text-gray-400">
                    {appointmentData.currentAppointment.doctor.specialty}
                  </p>
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
        {appointmentData.nextAppointment ? (
          <>
            <h1 className="text-2xl -mt-11  font-bold text-cyan-300 mt-4 mb-9 text-center lg:text-start lg:ml-5">
              Your Next Appointment
            </h1>
            <div className="grid -my-12  lg:grid-cols-3 md:gap-10 rounded-2xl mx-auto  md:mx-15    md:-mt-11  p-3">
              <div className="rounded-2xl h-32 md:w-40 hidden md:block mx-auto mb-10">
                <img
                  src={img}
                  alt="Appointment"
                  className="
          rounded-2xl
          shadow-60
w-60
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
              <div className="grid grid-rows-3 gap-4  w-[21rem]   ">
                <div
                  className="grid grid-cols-3
                items-center  ml-3"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU"
                    alt="avatar"
                    //avatar
                    className=" rounded-full shadow-cyan-300 h-12 w-12 object-cover shadow-sm"
                  />
                  <div
                    className="
                  
             -ml-14
             text-center
          

            "
                  >
                    <h1 className=" italic text-md">
                      Dr.
                      {appointmentData.nextAppointment.doctor.name.firstName}
                      {"  "}
                      {appointmentData.nextAppointment.doctor.name.lastName}
                    </h1>
                    <p className="text-sm italic mr-12 text-gray-400">
                      {appointmentData.nextAppointment.doctor.specialty}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: dark ? "#000" : "#ddd ",
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
              sm:mx-3"
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
                        {appointmentData.nextAppointment.appointmentTime}
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
                        <FcOvertime className="text-xl text-sky-400" />
                      </div>

                      <h1 className="text-sm font-bold ">
                        {formatDate(
                          appointmentData.nextAppointment.appointmentDate
                        )}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col items-center justify-center  mx-6 text-center">
        <Link
          to="/patient/ListAppointments"
          className="inline-flex items-center justify-center p-2 text-base font-medium   
        rounded-full
       
        hover:bg-cyan-400
        shadow-md
        focus:outline-none
        focus:shadow-outline
        transition duration-150 ease-in-out
        transform
        hover:-translate-y-1

        hover:scale-110
        active:scale-95
      
        "
          style={{
            boxShadow: dark
              ? "0px 0px 10px 0px rgb(103 232 249)"
              : "0px 0px 10px 0px #ccc",
          }}
        >
          <span className="text-sm font-bold">view all appointments</span>

          <BsFillArrowRightCircleFill
            className="w-6 h-6 text-cyan-300  
        ml-2
        animate-pulse hover:text-black
    

      

          "
          />
        </Link>
      </div>

      {/* <ul>
        {appointmentData.allAppointments?.map(appointment => (
          <li key={appointment._id}>
            <p>Date: {formatDate(appointment.appointmentDate)}</p>
            <p>Time: {appointment.appointmentTime}</p>
            <p>Symptoms: {appointment.symptoms.join(", ")}</p>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default PatientAppointments;
