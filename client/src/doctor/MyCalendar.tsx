import React, { useState, useEffect, useCallback } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";


import moment from "moment-timezone";
import axios from "axios";
import "react-big-calendar/lib/css/react-big-calendar.css";

import "./Calendar.css";
import { useLogIN } from "../../ContextLog";
import { BsHourglassTop } from 'react-icons/bs';


const MyCalendar = () => {
  const { Doctor, dark } =useLogIN();
  if (!Doctor || !Doctor.availableDays) return null;
  //map the Doctor.availableTime
  const workingHoursEvents =
    Doctor.availableDays.length > 0
      ? Doctor.availableDays.map(day => {
        return {
          start: moment(
            `${day} ${Doctor.availableTime.start}`,
            "dddd HH:mm"
          ).toDate(),
          end: moment(
            `${day} ${Doctor.availableTime.end}`,
            "dddd HH:mm"
          ).toDate(),
          day: Doctor.availableDays.indexOf(day) + 1,
          title: `
            ${Doctor.availableTime.start} - ${Doctor.availableTime.end}`,
        };
      })
      : [];


  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<
    Array<{ start: Date; end: Date; title: any }>
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
  ]);
  const localizer = momentLocalizer(moment);

  useEffect(() => {


    // Fetch appointments
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


        const appointments = response.data.appointments;
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
            title: `Appointment with ${appointment.patient.name.firstName} ${appointment.patient.name.LastName}`,
            notes: appointment.notes,

            symptoms: appointment.symptoms,
          };
        });

        setEvents([
          ...workingHoursEvents,
          ...appointmentEvents,
          ...holidays,
          ...breaks,
        ]);
        setLoading(false);

      } catch (error) {
        console.log("Error while fetching appointments: ", error);
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  return (


    <>
      {
        // loding
        loading ? (

          <div className="flex justify-center items-center h-screen">
            <h1>
              <BsHourglassTop
                className="animate-spin"

                color="#00BFFF"
                size="3rem"

              />

              loding...

            </h1>


          </div>
        )
          : (<div
            className="
            w-1/2
          

            "
          >
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"

              components={{
                toolbar: ({ view, onView, date, onNavigate, label }) => {
                  const viewNames = Object.keys(Views).map(k => Views[k]);

                  return (
                    <div className="rbc-toolbar">
                      <span className="rbc-btn-group">
                        <button
                          type="button"
                          onClick={() => onNavigate("PREV")}
                          className="rbc-btn rbc-btn-primary"
                        >
                          <i className="fas fa-angle-left">
                            <GrLinkPrevious />
                          </i>
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate("TODAY")}
                          className="rbc-btn rbc-btn-primary"
                        >
                          Today
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate("NEXT")}
                          className="rbc-btn rbc-btn-primary"
                        >
                          <GrLinkNext />
                        </button>
                      </span>

                      <span className="rbc-toolbar-label">{label}</span>

                      <span className="rbc-btn-group">
                        {viewNames.map(name => (
                          <button
                            type="button"
                            key={name}
                            className={`rbc-btn rbc-btn-primary ${view === name ? "rbc-active" : ""
                              }`}
                            onClick={() => onView(name)}
                          >
                            {name}
                          </button>
                        ))}
                      </span>
                    </div>
                  );
                },
              }}
              style={{
                height: 550,
                width: 700,

                backgroundColor: dark ? "#000" : "white",
                color: dark ? "white" : "black",
            
              }}
              timeslots={6}
              eventPropGetter={(event: any) => {
                let className = "";

                if (
                  event.title.includes("Appointment") &&
                  event.title.includes("Pending")
                ) {
                  className = `bg-yellow-400`;
                }

                if (
                  event.title.includes("Appointment") &&
                  event.title.includes("Accepted")
                ) {
                  className = `bg-green-400`;
                }

                if (
                  event.title.includes("Appointment") &&
                  event.title.includes("Rejected")
                ) {
                  className = `bg-red-400`;
                }

                if (event.title.includes("Appointment")) {
                  className = `  bg-cyan-400 border-l-4
       border-l-black
        border-r-4
        border-r-black`;
                }

                if (event.symptoms === "fever") {
                  className = `bg-yellow-400`;
                }

                if (event.symptoms === "cough") {
                  className = `bg-red-400`;
                }

                if (event.symptoms === "headache") {
                  className = `bg-blue-400`;
                }

                if (event.symptoms === "stomachache") {
                  className = `bg-green-400`;
                }

                if (event.day) {
                  className = `bg-blue-400`;
                }

                if (event.title.includes("Lunch")) {
                  className = `bg-red-400`;
                }

                if (event.title.includes("Halloween")) {
                  className = `bg-purple-400`;
                }

                if (event.title.includes("Coffee")) {
                  className = `bg-yellow-400`;
                }

                return {
                  className: className,
                };
              }}
              popup













            />
          </div>)

      }

    </>


  );
};

export default MyCalendar;
