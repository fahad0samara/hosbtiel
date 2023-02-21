import img from "../../../assets/Appointment.png";

import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLogIN} from "../../../../ContextLog";
import {BsAlarm, BsFillArrowRightCircleFill} from "react-icons/bs";
import {FcOvertime} from "react-icons/fc";
import {Link} from "react-router-dom";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = {month: "short", day: "numeric", year: "numeric"};
  return date.toLocaleDateString("en-US", options);
}
const PatientAppointments = () => {
  const {Profile, Patient, dark, setdark} = useLogIN();

  const [appointmentData, setAppointments] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [allAppointments, setAllAppointments] = useState([]);

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

  const formatDate = dateString => {
    const options = {year: "numeric", month: "short", day: "numeric"};
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  // Usage:

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div>
        {" "}
        <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
          upcoming Appointment{" "}
        </h1>
        <div className="grid grid-cols-3 gap-10 rounded-2xl  ">
          <div className="rounded-2xl h-32 w-40">
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
          {appointmentData.currentAppointment ? (
            <div className="grid grid-rows-3 gap-4  w-[21rem] mt-7 ">
              <div className="grid grid-cols-3  items-center  ml-3">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU"
                  alt="avatar"
                  //avatar
                  className=" rounded-full shadow-cyan-300 h-12 w-12 object-cover shadow-sm"
                />
                <div
                  className="
                  mt-1
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
              </div>
              <div
                style={{
                  backgroundColor: dark ? "#000" : "#dbe6e7",
                  color: dark ? "white" : "black",
                  boxShadow: dark
                    ? "0px 0px 5px 0px #ccc"
                    : "0px 0px 10px 0px #ccc",
                }}
                className=" rounded-t-3xl
       bg-red-600
            rounded-b-3xl"
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

              <button
                className="bg-cyan-300 rounded-full w-full
                h-10
                mt-4
                mb-4
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
                onClick={() => {
                  history.push("/addAppointment");
                }}
              >
                <h1 className="text-sm font-bold text-white">
                  Add Appointment
                </h1>
              </button>
            </div>
          )}
        </div>
        {appointmentData.nextAppointment ? (
          <>
            <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-9">
              Your Next Appointment
            </h1>
            <div
              style={{
                backgroundColor: dark ? "#000" : "white",
                color: dark ? "white" : "black",
                boxShadow: dark
                  ? "0px 0px 10px 0px rgb(103 232 249)"
                  : "0px 0px 10px 0px #ccc",
              }}
              className="p-4
        rounded-2xl

       "
            >
              <div className=" shadow-md rounded-md overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-300"></div>
                <div className="px-4 py-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <img
                        src="https://i.pravatar.cc/150?img=3"
                        alt="Doctor Avatar"
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="text-cyan-300 font-semibold text-lg">
                          Dr.
                          {
                            appointmentData.nextAppointment.doctor.name
                              .firstName
                          }
                        </h3>
                        <p className=" text-sm">
                          {appointmentData.nextAppointment.doctor.specialty}
                        </p>
                      </div>
                    </div>
                    <button
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
                      View
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-cyan-300 font-bold text-xl mr-2">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.293 3.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L12 6.414V16a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 01-1.414-1.414l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <p className=" font-semibold text-sm"></p>
                        <p className=" text-xs">Appointment Date</p>
                        <p className=" text-sm">
                          {formatDate(
                            appointmentData.nextAppointment.appointmentDate
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold text-xl mr-2">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 2a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 11-2 0V3H5v14h8v-1a1 1 0 112 0v2a1 1 0 01-1 1H4a1 1 0 01-1-1V2z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <div>
                        <p className=" font-semibold text-sm"></p>
                        <p className="text-xs ">Appointment Time</p>
                        <p className=" text-sm">
                          {appointmentData.nextAppointment.appointmentTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-col items-center justify-center my-8 mx-6 text-center">
        <Link
          to="/patient/ListAppointments"
          className="inline-flex items-center justify-center p-3 text-base font-medium   
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

      <ul>
        {appointmentData.allAppointments?.map(appointment => (
          <li key={appointment._id}>
            <p>Date: {formatDate(appointment.appointmentDate)}</p>
            <p>Time: {appointment.appointmentTime}</p>
            <p>Symptoms: {appointment.symptoms.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientAppointments;
