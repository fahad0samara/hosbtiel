import React, {useEffect, useState} from "react";
import axios from "axios";
import {Bar} from "react-chartjs-2";

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
};

function Example() {
  const [data, setData] = useState<ChartData | null>(null);

  useEffect(() => {
    axios.get("http://localhost:3000/admin/count").then(response => {
      const {patients, doctors, prescriptions, appointments} = response.data;

      setData({
        labels: ["Patients", "Doctors", "Prescriptions", "Appointments"],
        datasets: [
          {
            label: "Count",
            data: [patients, doctors, prescriptions, appointments],
            backgroundColor: "rgba(75,192,192,1)",
            borderColor: "rgba(0,0,0,1)",
            borderWidth: 2,
          },
        ],
      });
    });
  }, []);
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return data ? (
    <Bar
      data={data}
      options={{
        title: {
          display: true,
          text: "Average Rainfall per month",
          fontSize: 20,
        },
        legend: {
          display: true,
          position: "right",
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      }}
    />
  ) : (
    <div>Loading...</div>
  );
}

export default Example;
