import {useEffect, useState} from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {useLogIN} from "../../../ContextLog";
import axios from "axios";
import moment from "moment-timezone";


import "react-calendar/dist/Calendar.css";
type AppointmentsByDate = {
  [key: string]: {
    appointments: number;
    appointmentTimes: string[];
    averageAppointmentTime?: number;
  };
};

function Chart() {
  const [data, setData] = useState<
    {
      [x: string]: any;
      appointmentDate: string;
    }[]
  >([]);
  const {Doctor, dark} = useLogIN();
  const [loading, setLoading] = useState(false);

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
        const nextDayAppointmentsData = Object.values(
          nextDayAppointmentsPerDay
        );
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
  const appointmentsByDate: AppointmentsByDate = data.reduce(
    (acc, appointment) => {
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
    },
    {}
  );

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

export default Chart;

