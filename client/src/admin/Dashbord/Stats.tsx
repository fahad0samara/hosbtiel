import {useState, useEffect} from "react";
import axios from "axios";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import variablePie from "highcharts/modules/variable-pie.js";
variablePie(Highcharts);
import {useLogIN} from "../../../ContextLog";

const Stats = () => {
  const {
    logPatient,

    Profile,
    setProfile,

    setLoading,
    dark,
    setdark,
  } = useLogIN();
  const [numPatients, setNumPatients] = useState(0);
  const [numDoctors, setNumDoctors] = useState(0);
  const [prescriptions, setprescriptions] = useState(0);
  const [appointments, setappointments] = useState(0);
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState({
    patients: [],
    doctors: [],
    prescriptions: [],
    appointments: [],
    patientAvg: 0,
    doctorAvg: 0,
    prescriptionAvg: 0,
    appointmentAvg: 0,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/count")
      .then(response => {
        const data = response.data;
        const patientAvg = Math.round(data.patients / 30); // Assuming 30 days in a month
        const doctorAvg = Math.round(data.doctors / 30);
        const prescriptionAvg = Math.round(data.prescriptions / 30);
        const appointmentAvg = Math.round(data.appointments / 30);
        setChartData({
          patients: data.patients,
          doctors: data.doctors,
          prescriptions: data.prescriptions,
          appointments: data.appointments,
          patientAvg,
          doctorAvg,
          prescriptionAvg,
          appointmentAvg,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const options0 = {
    chart: {
      type: "column",
      width: 500,
      height: 400,
      backgroundColor: "transparent",
      borderWidth: 0,
    },
    title: {
      text: "Count of Patients, Doctors, Prescriptions, and Appointments",
      style: {
        color: dark ? "#fff" : "#000",
      },
    },
    xAxis: {
      categories: ["Patients", "Doctors", "Prescriptions", "Appointments"],
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },

    series: [
      {
        name: "Total",
        data: [
          {y: chartData.patients, color: "#ff0000"}, // Set color for each data point
          {y: chartData.doctors, color: "#00ff00"},
          {y: chartData.prescriptions, color: "#0000ff"},
          {y: chartData.appointments, color: "#ffa500"},
        ],
      },
      {
        name: "Average per day",
        data: [
          chartData.patientAvg,
          chartData.doctorAvg,
          chartData.prescriptionAvg,
          chartData.appointmentAvg,
        ],
      },
    ],
  };

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:3000/admin/count");
      setNumPatients(res.data.patients);
      setNumDoctors(res.data.doctors);
      setprescriptions(res.data.prescriptions);
      setappointments(res.data.appointments);
      setData(res.data);
    }
    fetchData();
  }, []);

  const options = {
    chart: {
      type: "pie",

      backgroundColor: "transparent",
      borderWidth: 0,

      pie: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          distance: -30,
          style: {
            fontWeight: "bold",
            color: "white",
            fontSize: "14px",
            textShadow: "0px 1px 2px black",
          },
        },
      },
    },
    title: {
      text: "Counts of Patients, Doctors, Prescriptions, and Appointments",
      style: {
        color: dark ? "#fff" : "#000",
      },
    },

    legend: {
      enabled: true, // enable legend
    },
    plotOptions: {
      pie: {
        // set plotOptions for pie chart
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
      },
    },
    series: [
      {
        name: "Counts",
        colorByPoint: true,
        data: [
          {
            name: "Patients",
            y: data?.patients,
            drilldown: "patients",
            color: "#FF0000",
          },
          {
            name: "Doctors",
            y: data?.doctors,
            drilldown: "doctors",
            color: "#00FF00",
          },
          {
            name: "Prescriptions",
            y: data?.prescriptions,
            drilldown: "prescriptions",
            color: "#0000FF",
          },
          {
            name: "Appointments",
            y: data?.appointments,
            drilldown: "appointments",
            color: "#FFA500",
          },
        ],
      },
    ],

    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },

    tooltip: {
      headerFormat: "<span style='font-size:11px'>{series.name}</span><br>",
      pointFormat: "<b>{point.y}</b> Count",
    },

    drilldown: {
      series: [
        {
          name: "Patients",
          id: "patients",
          data: [["Total Patients", data?.patients]],
        },
        {
          name: "Doctors",
          id: "doctors",
          data: [["Total Doctors", data?.doctors]],
        },
        {
          name: "Prescriptions",
          id: "prescriptions",
          data: [["Total Prescriptions", data?.prescriptions]],
        },
        {
          name: "Appointments",
          id: "appointments",
          data: [["Total Appointments", data?.appointments]],
        },
      ],
    },
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: "100%",
          },
          chartOptions: {
            chart: {
              height: "100%",
            },
            xAxis: {
              labels: {
                style: {
                  fontSize: "2.5vw",
                },
              },
            },
          },
        },
      ],
    },
  };
  return (
    <div className="my-7">
      <div className="grid lg:grid-cols-4  gap-8 lg:mx-24 md:grid-cols-2  px-20 mx-12  sm:px-11 ">
        <div
          style={{
            boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
          }}
          className="bg-[#ff0000] p-4 rounded-lg shadow-2xl 
        hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out
        "
        >
          <h1 className="text-2xl text-white">Number of Patients</h1>
          <h1 className="text-2xl text-white">
            {numPatients ? numPatients : "loading..."}
          </h1>
        </div>

        <div
          style={{
            boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
          }}
          className="bg-[#00ff00] p-4 rounded-lg
        hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out
          "
        >
          <h1 className="text-2xl text-white">Number of Doctors</h1>
          <h1 className="text-2xl text-white">
            {numDoctors ? numDoctors : "loading..."}
          </h1>
        </div>
        <div
          style={{
            boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
          }}
          className="bg-[#0000ff] p-4 rounded-lg
        hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out
          "
        >
          <h1 className="text-2xl text-white">Number of Prescriptions</h1>
          <h1 className="text-2xl text-white">
            {
              //loading
              prescriptions ? prescriptions : "Loading..."
            }
          </h1>
        </div>
        <div
          style={{
            boxShadow: dark ? "0px 0px 10px 0px #fff" : "0px 0px 10px 0px #000",
          }}
          className="bg-[#ffa500] p-4 rounded-lg
        hover:shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out
          "
        >
          <h1 className="text-2xl text-white">Number of Appointments</h1>
          <h1 className="text-2xl text-white">
            {appointments ? appointments : "Loading..."}
          </h1>
        </div>
      </div>
      <h1 className="text-2xl text-center my-5 text-cyan-300 italic hidden sm:block">
        Total and Average
      </h1>
      <div className="  lg:grid-cols-2 gap-3 sm:mx-24 mx-7 ml-10 hidden sm:grid">
        <div className="">
          {data ? (
            <HighchartsReact
              style={{
                backgroundColor: dark ? "#000" : "#fff",
                color: dark ? "#fff" : "#000",
              }}
              highcharts={Highcharts}
              options={options}
            />
          ) : (
            <div>
              <h1 className="text-2xl text-center my-5">Loading...</h1>
            </div>
          )}
        </div>

        {chartData ? (
          <HighchartsReact
            className=""
            highcharts={Highcharts}
            options={options0}
          />
        ) : (
          <div>
            <h1 className="text-2xl text-center my-5">Loading...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
