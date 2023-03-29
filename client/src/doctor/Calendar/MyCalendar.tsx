import React, {useState, useEffect, useCallback} from "react";
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";

import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment-timezone";
import {useLogIN} from "../../../ContextLog";

import Loder from "../../tools/Loder";
import EventForm from "./EventForm";
import WorkingHours from "./WorkingHours";

const MyCalendar = () => {
  const {Doctor, dark, Events} = useLogIN();

  if (!Doctor || !Doctor._id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="progress"></div>
      </div>
    );
  }

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<
    Array<{start: Date; end: Date; title: any}>
  >([]);

  const [interval, setIntervalId] = useState(null);
  useEffect(() => {
    const getAppointments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/doctor/appointments/${Doctor._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const appointments = response.data.allAppointments;
        if (!appointments || appointments.length === 0) {
          setLoading(false);
          return;
        }
        const appointmentEvents = appointments.map(appointment => {
          const appointmentDateTime = moment.utc(
            `${appointment.appointmentDate} ${appointment.appointmentTime}`,
            "YYYY-MM-DD h:mm A"
          );
          return {
            start: appointmentDateTime.toDate(),
            end: appointmentDateTime.clone().add(1, "hours").toDate(),
            title: `Appointment with dr ${appointment.doctor.name.firstName} ${appointment.doctor.name.lastName}`,
            symptoms: appointment.symptoms,
          };
        });
        const sortedAppointments = appointmentEvents.sort((a, b) =>
          a.start > b.start ? 1 : -1
        );

        setLoading(false);
        setEvents(sortedAppointments);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getAppointments();
  }, [Doctor._id]);

  <div className="ml-12">
    {loading && (
      <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-white bg-opacity-75 z-50">
        Loading...
      </div>
    )}
  </div>;

  const eventPropGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";
    const colors = [
      "red",
      "green",
      "purple",
      "bronze",
      "black",
      "blue",
      "orange",
      "pink",
      "yellow",
      "gray",
    ];
    const eventIndex = events.indexOf(event);

    if (eventIndex >= 0 && eventIndex < colors.length) {
      backgroundColor = colors[eventIndex];
    }

    return {style: {backgroundColor}};
  };

  const localizer = momentLocalizer(moment);
  return (
    <div
      className={`${dark ? "bg-black" : "bg-gray-100"}
      ${dark ? "text-white" : "text-black"}
      ${dark ? "border-gray-700" : "border-gray-200"}

   
    
   
   

      
       flex flex-col h-screen`}
    >
      <div className="ml-28 p-6">
        <h1 className={`${dark ? "text-white" : "text-black"} text-xl`}>
          Welcome{" "}
          <span className="font-bold text-cyan-300">
            {Doctor.name.firstName}
          </span>{" "}
          to your calendar
        </h1>
        <p
          className="
            italic
           
       
          
            
            
            "
        >
          View or add event for you calender your appointments
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p
            className="
           
            text-sm
            font-bold
            "
          >
            You have{" "}
            <span className="font-bold text-cyan-300">{events.length}</span>{" "}
            appointments
          </p>
        )}
      </div>

      <div className="ml-16 py-4 px-6 rounded-md shadow-md">
        <p className=" font-medium text-lg mb-2">Your events for this month</p>

        <h1>
          {moment().format("MMMM")} {moment().format("YYYY")}
        </h1>

        {Events.length > 0 ? (
          <ul className="list-disc pl-4 ">
            {Events.map((event, index) => (
              <li className="" key={index}>
                {event.title} - {moment(event.start).format("MMM DD, YYYY")} to{" "}
                {moment(event.end).format("MMM DD, YYYY")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No events found.</p>
        )}
      </div>
      <div
        className={`${
          dark ? "bg-black" : "bg-gray-100"
        } flex justify-between items-center ml-28`}
      ></div>

      <div
        className={`${dark ? "bg-black" : "bg-gray-100"}
   ${dark ? "text-white" : "text-black"}
   

      
       flex flex-col h-screen`}
      >
        <div className="flex justify-between items-center md:ml-28 ml-12">
          <div className="flex items-center justify-center my-7 mx-7">
            <h1 className="text-2xl font-bold">Calendar</h1>
            <div className="flex items-center ml-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <p>Appointments</p>
              </div>
              <div className="flex items-center ml-4">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <p>Holidays</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex ml-20">
          {
            // loding
            loading ? (
              <>
                <div>
                  <Loder />
                </div>
              </>
            ) : (
              //@ts-ignore
              <Calendar
                className="my-calendar-2"
                style={{
                  height: "80vh",
                  width: "75%",
                  margin: "auto",
                }}
                showMultiDayTimes
                defaultDate={new Date()}
                events={[...Events, ...events]}
                localizer={localizer}
                titleAccessor="title"
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventPropGetter}
                timeslots={6}
                popup
                messages={{
                  date: "Date",
                  time: "Time",
                  event: "Event",
                }}
              />
            )
          }
        </div>
      </div>
      <div
        className={`${dark ? "bg-black" : "bg-gray-100"}
      ${dark ? "text-white" : "text-black"}
   
      p-12
      `}
      >
        <div className="flex flex-col ml-14 p-4 my-4">
          <h1
            className={`${
              dark ? "text-white" : "text-black "
            } md:text-xl font-bold

           
          
            `}
          >
            Add your holiday or any event you want
          </h1>
          <h4
            className="
            mt-1
 

    
        text-gray-500

    
        "
          >
            Please select your title and the start time and the end
          </h4>
        </div>

        <EventForm />
        <WorkingHours />
      </div>
    </div>
  );
};

export default MyCalendar;
