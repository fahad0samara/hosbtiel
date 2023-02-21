import React, {useState, useEffect, useCallback} from "react";
import {Calendar, momentLocalizer, Views} from "react-big-calendar";
import {GrLinkNext, GrLinkPrevious} from "react-icons/gr";

import moment from "moment-timezone";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

import {useLogIN} from "../../../ContextLog";
import {BsHourglassTop} from "react-icons/bs";
import WorkingHours from "./WorkingHours";

const MyCalendar = () => {
  const {Patient, dark} = useLogIN();
  if (!Patient || !Patient._id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="progress"></div>
      </div>
    );
  }
  //map the Doctor.availableTime

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<
    Array<{start: Date; end: Date; title: any}>
  >([]);
  const [holidays, setHolidays] = useState([
    {
      start: new Date("2023-1-21"),
      end: new Date("2023-1-22"),
      title: "Halloween",
      notes: "This is a holiday",
    },
  ]);

  const [breaks, setBreaks] = useState([
    {
      start: new Date("2023-01-21T12:00:00"),
      end: new Date("2023-01-21T13:00:00"),
      title: "Lunch Break",
    },
    {
      start: new Date("2023-01-22T15:00:00"),
      end: new Date("2023-01-22T15:30:00"),
      title: "Coffee Break",
    },
    {
      start: new Date("2023-03-22T15:00:00"),
      end: new Date("2023-04-22T15:30:00"),
      title: " Break",
    },
  ]);

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
              "YYYY-MM-DD HH:mm"
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
          console.log(
            `Your next appointment is in ${timeUntilAppointment.humanize()}`
          );
        }
        setEvents([...appointmentEvents]);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getAppointments();
  }, []);
  const localizer = momentLocalizer(moment);
  return (
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
              <p>Working Hours</p>
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
            <Calendar
              className="my-calendar-2"
              style={{
                height: "80vh",
                width: "80%",
                margin: "auto",
              }}
              showMultiDayTimes
              defaultDate={new Date()}
              events={events}
              localizer={localizer}
              titleAccessor="title"
              startAccessor="start"
              endAccessor="end"
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
  );
};

export default MyCalendar;