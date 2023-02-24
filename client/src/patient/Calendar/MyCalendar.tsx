import React, {useState, useEffect, useCallback} from "react";
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";

import moment from "moment-timezone";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {useLogIN} from "../../../ContextLog";

import Loder from "../../tools/Loder";
import EventForm from "./EventForm";

const MyCalendar = () => {
  const {Patient, dark, Events} = useLogIN();
  const [timeUntilNextAppointment, setTimeUntilNextAppointment] = useState(
    "No upcoming appointments"
  );

  if (!Patient || !Patient._id) {
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
          `http://localhost:3000/user/all-appointments/${Patient._id}`
        );
        const appointments = response.data.allAppointments;
        if (!appointments || appointments.length === 0) {
          setLoading(false);
          return;
        }
        const appointmentEvents = appointments.map(appointment => {
          return {
            start: moment(
              `${appointment.appointmentDate} ${appointment.appointmentTime}`,
              "YYYY-MM-DD h:mm A"
            ).toDate(),
            end: moment(
              `${appointment.appointmentDate} ${appointment.appointmentTime}`,
              "YYYY-MM-DD HH:mm"
            )
              .add(1, "hours")
              .toDate(),
            title: `Appointment with  dr ${appointment.doctor.name.firstName} ${appointment.doctor.name.LastName}`,
            symptoms: appointment.symptoms,
          };
        });
        const sortedAppointments = appointmentEvents.sort((a, b) =>
          a.start > b.start ? 1 : -1
        );
        const now = moment();
        const upcomingAppointment = sortedAppointments.find(
          appointment => appointment.start > now
        );
        if (upcomingAppointment) {
          const timeUntilAppointment = moment.duration(
            moment(upcomingAppointment.start).diff(now)
          );
          let timeString = "";
          if (timeUntilAppointment.days() > 0) {
            timeString += `${timeUntilAppointment.days()} days, `;
          }
          if (timeUntilAppointment.hours() > 0) {
            timeString += `${timeUntilAppointment.hours()} hours, `;
          }
          timeString += `${timeUntilAppointment.minutes()} minutes, ${timeUntilAppointment.seconds()} seconds`;
          setTimeUntilNextAppointment(timeString);
          const intervalId = setInterval(() => {
            const currentTime = moment();
            const timeUntilAppointment = moment.duration(
              moment(upcomingAppointment.start).diff(currentTime)
            );
            let timeString = "";
            if (timeUntilAppointment.days() > 0) {
              timeString += `${timeUntilAppointment.days()} days, `;
            }
            if (timeUntilAppointment.hours() > 0) {
              timeString += `${timeUntilAppointment.hours()} hours, `;
            }
            timeString += `${timeUntilAppointment.minutes()} minutes, ${timeUntilAppointment.seconds()} seconds`;
            setTimeUntilNextAppointment(timeString);
            // show message to patient 5 minutes before appointment time
            if (timeUntilAppointment.asMinutes() < 5) {
              alert("Your appointment is in 5 minutes!");
            }
          }, 1000);
          setIntervalId(intervalId);
        } else {
          setTimeUntilNextAppointment("No upcoming appointments");
        }
        setEvents([...appointmentEvents]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getAppointments();
    return () => interval && clearInterval(interval);
  }, []);

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
      <div className="grid grid-cols-2 p-10">
        <div className="ml-28">
          <h1 className={`${dark ? "text-white" : "text-black"} text-xl`}>
            Welcome{" "}
            <span className="font-bold text-cyan-300">
              {Patient.name.firstName}
            </span>{" "}
            to your calendar
          </h1>
          <p
            className="
            italic
            text-gray-500
       
          
            
            
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
        <div className="flex items-center justify-center my-7 mx-7">
          <h3
            className="
            text-sm
            font-bold
           italic

            "
          >
            {}
            Next appointment : {timeUntilNextAppointment}
          </h3>
        </div>
      </div>
      <div className="ml-16 py-4 px-6 rounded-md shadow-md">
        <p className="text-gray-700 font-medium text-lg mb-2">
          Your events for this month
        </p>

        <h1>
          {moment().format("MMMM")} {moment().format("YYYY")}
        </h1>

        {Events.length > 0 ? (
          <ul className="list-disc pl-4">
            {Events.map((event, index) => (
              <li className="text-gray-700" key={index}>
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
        <div className="flex justify-between items-center ml-28">
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
              <div className="flex items-center ml-4">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <p>Breaks</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex ">
          {
            // loding
            loading ? (
              <div className="flex justify-center items-center h-screen">
                <div className="progress"></div>
              </div>
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
      </div>
    </div>
  );
};

export default MyCalendar;
