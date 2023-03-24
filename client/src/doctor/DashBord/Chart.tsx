import {useEffect, useState} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useLogIN} from "../../../ContextLog";
import axios from "axios";
import moment from "moment-timezone";
import {RiLoader2Fill} from "react-icons/ri";

import "react-calendar/dist/Calendar.css";
function App() {
  const [data, setData] = useState([]);
  const {Doctor, dark} = useLogIN();
  const [loading, setLoading] = useState(false);
  const [visitTimeData, setVisitTimeData] = useState([]);
  const [dateString, setDateString] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [chartOptions, setChartOptions] = useState({});

useEffect(() => {
  setLoading(true);

  // Fetch data and update chart options
  const getAppointmentsData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/doctor/appointments/${Doctor._id}/${dateString}`
      );
      const appointmentsPerDay = {};
      const nextDayAppointmentsPerDay = {};
      response.data.appointments.forEach(appointment => {
        const appointmentDate = moment(appointment.appointmentDate).format(
          "MM/DD/YYYY"
        );
        if (!appointmentsPerDay[appointmentDate]) {
          appointmentsPerDay[appointmentDate] = 1;
        } else {
          appointmentsPerDay[appointmentDate]++;
        }
      });
      response.data.nextDayAppointments.forEach(appointment => {
        const appointmentDate = moment(appointment.appointmentDate).format(
          "MM/DD/YYYY"
        );
        if (!nextDayAppointmentsPerDay[appointmentDate]) {
          nextDayAppointmentsPerDay[appointmentDate] = 1;
        } else {
          nextDayAppointmentsPerDay[appointmentDate]++;
        }
      });

      const categories = Object.keys(appointmentsPerDay);
      const appointmentsData = Object.values(appointmentsPerDay);
      const nextDayAppointmentsData = Object.values(nextDayAppointmentsPerDay);
      setChartOptions({
        chart: {
          type: "column",
          backgroundColor: "transparent",
          borderWidth: 0,
          height: 300,
        },

        title: {
          text: "Appointments per day",
        },
        xAxis: {
          categories,
        },
        yAxis: {
          title: {
            text: "Number of Appointments",
          },
        },
        series: [
          {
            name: "Appointments",
            data: appointmentsData,
            dataLabels: {
              enabled: true,
              format: "{point.y}",
            },
          },
          {
            name: "Next Day Appointments",
            data: nextDayAppointmentsData,
            dataLabels: {
              enabled: true,
              format: "{point.y}",
            },
          },
        ],
        colors: ["#00C49F", "#FFBB28", "#FF8042"],
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  // Check if Doctor is defined before calling getAppointmentsData
  if (Doctor && Doctor._id) {
    getAppointmentsData();
  }
}, [Doctor, dateString]);

  useEffect(() => {
    setLoading(true);
    if (Doctor && Doctor._id) {
      axios
        .get(`http://localhost:3000/doctor/appointments/${Doctor._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(res => {
          setData(res.data.appointments);
          setLoading(false);
        })
        .catch(err => console.log(err, "error from chat"));
    } else {
      setLoading(false);
    }
  }, [Doctor]);



  // group appointments by date
  const appointmentsByDate = data.reduce((acc, appointment) => {
    const date = new Date(appointment.appointmentDate).toLocaleDateString();

    if (!acc[date]) {
      acc[date] = {
        appointments: 0,
        appointmentTimes: [],
      };
    }
    acc[date].appointments++;
    acc[date].appointmentTimes.push(appointment.appointmentTime);
    return acc;
  }, {});

  // calculate the average appointment time for each date
  Object.keys(appointmentsByDate).forEach(date => {
    const totalAppointmentTime = appointmentsByDate[
      date
    ].appointmentTimes.reduce((acc, time) => {
      const [hours, minutes] = time.split(":").map(Number);
      acc += hours + minutes / 60;
      return acc;
    }, 0);
    appointmentsByDate[date].averageAppointmentTime =
      totalAppointmentTime / appointmentsByDate[date].appointments;
  });

  // format data for the chart
  const chartData = Object.entries(appointmentsByDate).map(
    ([date, {appointments, averageAppointmentTime}]) => {
      return {
        date,
        appointments,
        averageAppointmentTime,
      };
    }
  );

  const options = {
    chart: {
      type: "column",
      backgroundColor: "transparent",
      borderWidth: 0,
      height: 300,

   
    },
    title: {
      text: "Appointments and Average Appointment Time by Date",
    },
    xAxis: {
      categories: chartData.map(({date}) => date),
    },
    yAxis: [
      {
        title: {
          text: "Appointments",
        },
      },
      {
        title: {
          text: "Average Appointment Time (hours)",
        },
        opposite: true,
      },
    ],
    plotOptions: {
      series: {
        marker: {
          enabled: true,

          radius: 4,
        },
      },
    },
    series: [
      {
        name: "Appointments",
        data: chartData.map(({appointments}) => appointments),
        yAxis: 0,
      },
      {
        name: "Average Appointment Time",
        data: chartData.map(
          ({averageAppointmentTime}) => averageAppointmentTime
        ),

        yAxis: 1,
      },
    ],
    colors: ["#ff0000", "#00ff00"],
  };

  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "white",
        color: dark ? "white" : "black",
      }}
      className="grid grid-cols-2 mt-10 w-full mx-5"
    >
      <div className="col-span-1 ">
        {
          // if there no appointments
          data.length === 0 && !loading ? (
            <div>
              <h1 className="text-center text-2xl font-bold">
                No Appointments
              </h1>
            </div>
          ) : data.length === 0 && loading ? (
            <div>
              <h1 className="text-center text-2xl font-bold">Loading...</h1>
            </div>
          ) : (
            <div>
              <div className="flex justify-center">
                <HighchartsReact
                  highcharts={Highcharts}
                  options={chartOptions}
                />
              </div>
            </div>
          )
        }
      </div>
      <div className="">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}

export default App;

    //     <div
    //       style={{
    //         backgroundColor: dark ? "#000" : "#fff",
    //         color: dark ? "#fff" : "#000",
    //       }}
    //     >
    //       <div className="p-5 mx-20">
    //         <div className="flex flex-col my-3">
    //           <h1 className="text-2xl font-bold">
    //             {message} ,
    //             <span className="text-cyan-300 font-bold ml-1">
    //               Dr.{Doctor && Doctor.name.firstName}
    //             </span>
    //           </h1>
    //           <h1 className="text-lg text-gray-400">
    //             {phrase},
    //             <span className="text-cyan-300 font-bold mx-1">
    //               {appointmentsCount}
    //             </span>
    //             appointments today
    //           </h1>
    //           {nextAppointment && (
    //             <h1 className="text-lg text-gray-400">
    //               Your next appointment is on{" "}
    //               <span className="text-cyan-300 font-bold mx-1">
    //                 {new Date(nextAppointment.appointmentDate).toLocaleDateString()}
    //               </span>{" "}
    //               at{" "}
    //               <span className="text-cyan-300 font-bold mx-1">
    //                 {nextAppointment.appointmentTime}
    //               </span>
    //             </h1>
    //           )}
    //         </div>

    //         <div className="grid grid-cols-1  ">
    //           <div className="grid lg:grid-cols-3 md:gap-10 rounded-2xl mx-auto">
    //             <div className="rounded-2xl h-32 md:w-40 hidden md:block mx-auto mb-10">
    //               <img
    //                 src={img}
    //                 alt="Appointment"
    //                 className="
    //           rounded-2xl
    //           shadow-60
    // lg:w-60

    //           object-cover"
    //               />
    //               <div className="flex flex-col justify-center items-center">
    //                 <h1 className="text-lg font-bold">Miracle hospital</h1>
    //                 <p className="text-sm font-bold text-cyan-300  mb-4">
    //                   cypress
    //                   <br />
    //                 </p>
    //               </div>
    //             </div>
    //             {nextAppointment ? (
    //               <div className="grid grid-rows-3 gap-4  w-[21rem]   ">
    //                 <div
    //                   className="grid grid-cols-3
    //                 items-center  ml-3"
    //                 >
    //                   <img
    //                     src={nextAppointment.patient.avatar}
    //                     alt="avatar"
    //                     //avatar
    //                     className=" rounded-full shadow-cyan-300 h-12 w-12 object-cover shadow-sm"
    //                   />
    //                   <div
    //                     className="

    //              -ml-12
    //              text-center

    //             "
    //                   >
    //                     <h1 className=" italic text-sm">
    //                       patient Name :
    //                       {nextAppointment.patient
    //                         ? nextAppointment.patient.name.firstName
    //                         : "No patient"}
    //                       {"  "}
    //                       {nextAppointment.patient
    //                         ? nextAppointment.patient.name.LastName
    //                         : "No patient"}
    //                     </h1>
    //                     <p className="text-sm italic mr-12 text-gray-400">
    //                       {/* {appointmentData.currentAppointment.doctor.specialty} */}
    //                     </p>
    //                   </div>

    //                   <button
    //                     // onClick={handleViewClick}
    //                     className=" bg-cyan-300 rounded-full h-8 w-20    hover:bg-cyan-400
    //                 shadow-md
    //                 focus:outline-none
    //                 focus:shadow-outline
    //                 transition duration-150 ease-in-out
    //                 transform
    //                 hover:-translate-y-1
    //                 hover:scale-110
    //                 active:scale-95
    //                 active:translate-y-0"
    //                   >
    //                     <h1 className="text-sm font-bold text-white">View</h1>
    //                   </button>
    //                   {/* {showModal && (
    //                     <AppointmentModal
    //                       appointmentData={appointmentData.currentAppointment}
    //                       onClose={handleCloseModal}
    //                     />
    //                   )} */}
    //                 </div>

    //                 <div
    //                   style={{
    //                     backgroundColor: dark ? "#000" : "#ddd",
    //                     color: dark ? "white" : "black",
    //                     boxShadow: dark
    //                       ? "0px 0px 5px 0px #ccc"
    //                       : "0px 0px 10px 0px #ccc",
    //                   }}
    //                   className=" mt-2
    //               rounded-2xl
    //               shadow-60
    //               p-1
    //               mx-8
    //               sm:mx-3

    //       "
    //                 >
    //                   <div className="grid grid-cols-2 gap-5  p-4">
    //                     <div className="flex flex-row justify-center items-center space-x-1">
    //                       <div
    //                         className="
    //                   bg-white
    //                   rounded-full
    //                   h-10

    //                   w-10
    //                   flex
    //                   flex-row
    //                   justify-center
    //                   items-center
    //                   "
    //                       >
    //                         <BsAlarm className="text-xl text-red-500" />
    //                       </div>

    //                       <h1 className="text-sm font-bold ml-2">
    //                         {nextAppointment.appointmentTime}
    //                       </h1>
    //                     </div>

    //                     <div className="flex flex-row justify-center items-center space-x-2 ">
    //                       <div
    //                         className="
    //                   bg-white
    //                   rounded-full
    //                   h-10

    //                   w-10
    //                   flex
    //                   flex-row
    //                   justify-center
    //                   items-center
    //                   "
    //                       >
    //                         {" "}
    //                         <FcOvertime className="text-xl text-sky-400" />
    //                       </div>

    //                       <h1 className="text-sm font-bold ">
    //                         {moment(nextAppointment.appointmentDate).format("dddd")}
    //                       </h1>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             ) : (
    //               <div
    //                 className="flex  w-80
    //           flex-col
    //           -mt-11
    //           sm:-mt-0

    //             justify-center items-center"
    //               >
    //                 <div className="flex flex-col justify-center items-center ">
    //                   <h1 className="text-lg font-bold text-cyan-300 mt-4">
    //                     You have no upcoming appointment,
    //                   </h1>
    //                   <h1 className="text-md italic  mt-4 ">
    //                     please add an appointment If you have any
    //                   </h1>
    //                   <h1>problem or If you feel any diseases</h1>
    //                 </div>

    //                 <Link
    //                   to="/patient/appointment"
    //                   className="bg-cyan-300 rounded-full w-full
    //                 h-8

    //                 text-center

    //                 text-white
    //                 font-bold
    //                 text-sm
    //                 hover:bg-cyan-400
    //                 shadow-md
    //                 focus:outline-none
    //                 focus:shadow-outline
    //                 transition duration-150 ease-in-out
    //                 transform
    //                 hover:-translate-y-1
    //                 hover:scale-110
    //                 active:scale-95
    //                 active:translate-y-0
    //                 "
    //                 >
    //                   <h1 className="flex justify-center items-center mt-1">
    //                     Add Appointment
    //                   </h1>
    //                 </Link>
    //               </div>
    //             )}
    //           </div>

    //           <div
    //             style={{
    //               backgroundColor: dark ? "#000" : "#fff",
    //               color: dark ? "white" : "black",
    //               boxShadow: dark
    //                 ? "0px 0px 5px 0px #ccc"
    //                 : "0px 0px 10px 4px #ccc",
    //             }}
    //             className=" absolute
    //             shadow-md
    //             border-solid             top-24 border-2 border-cyan-300  right-24 h-64    rotate-6 transform space-y-6 rounded-2xl  duration-300 hover:rotate-0"
    //           >
    //             <div
    //               style={{
    //                 backgroundColor: dark ? "#fff" : "#000",
    //               }}
    //               className=" rounded-full p-2 flex float-left h-4 w-4 "
    //             ></div>
    //             <div className="space-y-2">
    //               <h1 className="text-xl font-bold text-center ">
    //                 Next Appointment
    //               </h1>
    //               <div className="border-b-2 border-cyan-300 my-2  mx-10  text-center  px-4 "></div>
    //               {nextAppointment ? (
    //                 <div className="flex flex-col mx-2 space-y-3">
    //                   <div className="space-x-2 flex">
    //                     <h1 className="text-lg font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
    //                       Date:
    //                     </h1>
    //                     <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
    //                       {moment(nextAppointment.appointmentDate).format(
    //                         "MMMM Do YYYY"
    //                       )}
    //                     </h1>
    //                   </div>
    //                   <div
    //                     className="
    //                     flex"
    //                   >
    //                     <h1 className="text-lg font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
    //                       {" "}
    //                       Time:
    //                     </h1>
    //                     <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
    //                       {nextAppointment.appointmentTime}
    //                     </h1>
    //                   </div>

    //                   <div
    //                     className="
    //                     flex
    //                     "
    //                   >
    //                     <h1 className="text-lg font-semibold  ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
    //                       Patient Name:
    //                     </h1>
    //                     <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
    //                       {
    //                         // first name and lastname
    //                       }
    //                       {nextAppointment.patient
    //                         ? nextAppointment.patient.name.firstName
    //                         : "No patient"}{" "}
    //                       {nextAppointment.patient
    //                         ? nextAppointment.patient.name.LastName
    //                         : "No patient"}
    //                     </h1>
    //                   </div>

    //                   {
    //                     //loding
    //                   }
    //                   {timeLeft > 0 ? (
    //                     <div className=" flex space-x-2">
    //                       <h1 className="text-lg font-semibold ml-1 shadow-black bg-amber-400 rounded-sm w-auto shadow-md text-center px-1 text white">
    //                         Time left :
    //                       </h1>
    //                       {timeLeft < 0 ? (
    //                         <p className="text-lg  ml-1 bg-amber-400 rounded-full w-auto shadow-xl text-center px-1">
    //                           {nextAppointment.patient
    //                             ? nextAppointment.patient.name.firstName
    //                             : "No patient"}
    //                         </p>
    //                       ) : null}
    //                       <h1 className="text-lg font-semibold  ml-1 bg-white shadow-black text-black shadow-md rounded-sm  w-auto  text-center px-1">
    //                         {timeLeft < 0
    //                           ? null
    //                           : `${hours}h ${minutes}m ${seconds}s`}
    //                       </h1>
    //                     </div>
    //                   ) : (
    //                     <p
    //                       className="
    //                       font-semibold
    //                       ml-1

    //                       "
    //                     >
    //                       Appointment has started
    //                     </p>
    //                   )}
    //                 </div>
    //               ) : (
    //                 <div
    //                   className="
    //                   flex
    //                   flex-col
    //                   justify-center
    //                   items-center
    //                   "
    //                 >
    //                   <h1
    //                     className="
    //                   font-semibold
    //                   ml-1
    //                   text-center
    //                   "
    //                   >
    //                     You don't have
    //                   </h1>
    //                   <h2>an appointment today</h2>
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //         </div>

    //         <Chart />
    //         <Patient />
    //       </div>
    //     </div>
