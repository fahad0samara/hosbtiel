import axios from "axios";

import { useEffect, useRef, useState } from "react";
import moment from "moment-timezone";
import MyCalendar from "./MyCalendar";
import { useLogIN } from "../../ContextLog";
import Loder from "../tools/Loder";
const Dashboard = () => {
  const { Doctor, dark } = useLogIN();

  const [nextAppointment, setNextAppointment] = useState({});
  const [appointments, setAppointments] = useState([]);

  const [appointmentsCount, setAppointmentsCount] = useState(0);

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
  const [loading, setLoading] = useState(false);
  const intervalIdRef = useRef(null);
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

  const [date, setDate] = useState(moment().toDate());
  const dateString = moment(date).format("YYYY-MM-DD");

  useEffect(() => {
    if (Doctor) {
      const getNextAppointment = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `http://localhost:3000/doctor/appointments/${Doctor._id}/${dateString}`
          );
          console.log(
            "🚀 ~ file: Dashboard.tsx ~ line 6 ~ Dashboard ~ response",
            response.data
          );
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


          const nextAppointment = response.data.appointments.find(appointment => {
            const appointmentDate = new Date(appointment.appointmentDate);
            appointmentDate.setHours(appointment.appointmentTime.split(":")[0]);
            appointmentDate.setMinutes(appointment.appointmentTime.split(":")[1]);
            return appointmentDate > currentDate;
          });
          setNextAppointment(nextAppointment);

          setNextAppointment(sortedAppointments[0]);
          setLoading(false);

          // If there is no next appointment for today, find the first appointment for tomorrow
          if (!sortedAppointments[0]) {
            const response = await axios.get(
              `http://localhost:3000/doctor/appointments/${Doctor._id}/${moment(
                date
              )
                .add(1, "day")
                .format("YYYY-MM-DD")}`
            );
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
            const sortedAppointments = filteredAppointments.sort((a, b) => {
              const aDate = new Date(a.appointmentDate);
              aDate.setHours(a.appointmentTime.split(":")[0]);
              aDate.setMinutes(a.appointmentTime.split(":")[1]);
              const bDate = new Date(b.appointmentDate);
              bDate.setHours(b.appointmentTime.split(":")[0]);
              bDate.setMinutes(b.appointmentTime.split(":")[1]);
              return aDate.getTime() - bDate.getTime();
            });
            setNextAppointment(sortedAppointments[0]);
          }

          // Set next appointment
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(
            "🚀 ~ file: Dashboard.tsx ~ line 6 ~ Dashboard ~ error",
            error
          );
        }
      };
      getNextAppointment();
      // Refresh next appointment every 60 seconds
      const intervalId = setInterval(getNextAppointment, 60000);
      return () => clearInterval(intervalId);
    }
  }, [Doctor, date]);


  const intervalFunction = () => {
    if (nextAppointment && nextAppointment.appointmentTime) {
      const appointmentDate = new Date(nextAppointment.appointmentDate);
      appointmentDate.setHours(nextAppointment.appointmentTime.split(":")[0]);
      appointmentDate.setMinutes(nextAppointment.appointmentTime.split(":")[1]);
      setTimeLeft(appointmentDate.getTime() - new Date().getTime());
    }
  }

  useEffect(() => {
    let intervalId: number | undefined;
    if (nextAppointment && nextAppointment.appointmentTime) {
      setLoading(true);
      const appointmentDate = new Date(nextAppointment.appointmentDate);
      appointmentDate.setHours(nextAppointment.appointmentTime.split(":")[0]);
      appointmentDate.setMinutes(nextAppointment.appointmentTime.split(":")[1]);
      setTimeLeft(appointmentDate.getTime() - new Date().getTime());
      setLoading(false);
      // Refresh time left every second
      intervalId = setInterval(intervalFunction, 1000);
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
        <div
          className="p-5 mx-20"
      >
        <div
            className="flex flex-col my-3"
        >
          <h1 className="text-2xl font-bold">
            {message} ,
            <span
                className="text-cyan-300 font-bold ml-1"
            >
              Dr.{Doctor && Doctor.name.firstName}
            </span>
          </h1>
            <h1 className="text-lg text-gray-400">
              {phrase},
            <span
                className="text-cyan-300 font-bold mx-1">
                {appointmentsCount}
            </span>
            appointments today
          </h1>
        </div>
          <div
            className="grid grid-cols-3 gap-12">
            <div className="col-span-2
            shadow-2xl
            h-96 w-80 bg-cyan-300 rotate-1 transform space-y-6 rounded-2xl duration-300 hover:rotate-0
            "
            >
              <MyCalendar />
            </div>


            <div

              className="
              shadow-2xl
              mt-4
              col-span-1  ml-14 h-96 w-80  bg-cyan-300 rotate-6 transform space-y-6 rounded-2xl  duration-300 hover:rotate-0"
            >
              <div className="flex justify-end">
                <div className="h-6 w-6 rounded-full bg-gray-900">
                  {
                    // icon
                  }







                </div>
              </div>

              <div



              >
                <h1
                  className="text-2xl
              font-bold
              text-center
              my-2
              "

                >Next Appointment</h1>
                {nextAppointment ? (
                  <div
                    className="flex

                flex-col
                space-y-2
                ml-7
                "
                  >
                    <h1
                      className="font-medium
                    text-lg

              
                
                  "
                    >
                      Date:
                      <span
                        className="
                    font-bold
                    ml-1
                    "
                      >
                        {moment(nextAppointment.appointmentDate).format(
                          "MMMM Do YYYY"
                        )}
                      </span>


                    </h1>
                    <h1
                      className="
                   font-medium
                    ml-1
                    "
                    >Time:
                      <span
                        className="font-bold ml-1"

                      >
                        {nextAppointment.appointmentTime}
                      </span>



                    </h1>
                    <h1
                      className="
              font-medium
                    ml-1
                    "
                    >
                      Patient Name:
                      <span
                        className="
                    font-bold
                          
                    ml-1
                    "
                      >
                        {
                          // first name and lastname
                        }
                        {nextAppointment.patient
                          ? nextAppointment.patient.name.firstName
                          : "No patient"}
                        {" "}
                        {nextAppointment.patient
                          ? nextAppointment.patient.name.LastName
                          : "No patient"}


                      </span>

                    </h1>
                    {
                      //symptoms
                    }
                    <h1
                      className="font-medium ml-1"


                    >Symptoms:

                      <span
                        className="font-bold ml-1"
                      >
                        {nextAppointment.symptoms}
                      </span>
                    </h1>




                    {
                      //loding
                    }
                    {timeLeft > 0 ? (
                      <div
                        className="flex
                   
                    "
                      >
                        <h1 className="font-medium ml-1">Time left:</h1>
                        {
                          timeLeft < 0 ? <p>Appointment has started with
                            {nextAppointment.patient
                              ? nextAppointment.patient.name.firstName
                              : "No patient"}

                          </p> : null
                        }
                        <h1
                          className="font-bold ml-1"

                        >
                          {
                            timeLeft < 0 ? null : `${hours}h ${minutes}m ${seconds}s`

                          }

                        </h1>


                      </div>
                    ) : (
                      <p>Appointment has started</p>

                    )}
                  </div>
                ) : (
                  <p>No appointments today</p>
                )}
              </div>

            </div>



          </div>
        </div>




      </div>

  );
};

export default Dashboard;
