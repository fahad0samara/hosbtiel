import {useState, useEffect} from "react";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
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
        console.log(response.data);
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
    },
    title: {
      text: "Count of Patients, Doctors, Prescriptions, and Appointments",
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
          chartData.patients,
          chartData.doctors,
          chartData.prescriptions,
          chartData.appointments,
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
      console.log(res.data);
    }
    fetchData();
  }, []);

  const options = {
    chart: {
      type: "pie",
      height: 250,
    },
    title: {
      text: "Counts of Patients, Doctors, Prescriptions, and Appointments",
    },
    xAxis: {
      type: "category",
    },
    yAxis: {
      title: {
        text: "Count",
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      headerFormat: "<span style='font-size:11px'>{series.name}</span><br>",
      pointFormat: "<b>{point.y}</b> Count",
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
  };
  return (
    <div>
      <div className="grid grid-cols-2  gap-8 mx-24">
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-red-500 p-4 rounded-lg">
            <h1 className="text-2xl text-white">Number of Patients</h1>
            <h1 className="text-2xl text-white">{numPatients}</h1>
          </div>

          <div className="bg-green-500 p-4 rounded-lg">
            <h1 className="text-2xl text-white">Number of Doctors</h1>
            <h1 className="text-2xl text-white">{numDoctors}</h1>
          </div>
          <div className="bg-blue-500 p-4 rounded-lg">
            <h1 className="text-2xl text-white">Number of Prescriptions</h1>
            <h1 className="text-2xl text-white">{prescriptions}</h1>
          </div>
          <div className="bg-yellow-500 p-4 rounded-lg">
            <h1 className="text-2xl text-white">Number of Appointments</h1>
            <h1 className="text-2xl text-white">{appointments}</h1>
          </div>
        </div>
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
            "Loading..."
          )}
        </div>
      </div>
      {data ? (
        <HighchartsReact highcharts={Highcharts} options={options0} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default Stats;
