// import React, { useState, useEffect } from 'react';
// import { LineChart, XAxis, BarChart, YAxis, Line, Tooltip, Bar, PieChart, Pie, Cell, Legend, ComposedChart, Area, Scatter, CartesianGrid, PolarGrid, PolarAngleAxis, Radar, PolarRadiusAxis, RadarChart } from 'recharts';
// import { useLogIN } from '../../ContextLog';
// import { ResponsiveContainer } from 'recharts';
// import { PieChartWithCustomizedLabel } from 'recharts'

// const Chart = () => {
//     const { Doctor, dark } = useLogIN();
//     if (!Doctor || !Doctor.availableDays) return null;
//     const [data, setData] = useState([]);
//     console.log('====================================');
//     console.log(
//         '🚀 ~ file: Chart.tsx ~ line 48 ~ Chart ~ Doctor.availableDays',
//         Doctor
//     );
//     console.log('====================================');

//     useEffect(() => {
//         fetch(`http://localhost:3000/doctor/appointments/${Doctor._id}`,
//             {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             }

//         )


//             .then(res => res.json())
//             .then(data => {
//                 setData(data.appointments);
//             })
//             .catch(err => console.log(err));
//     }, []);

//     const appointmentsByDate = data.reduce((acc, appointment) => {
//         const date = new Date(appointment.appointmentDate).toLocaleDateString();



//         if (!acc[date]) {
//             acc[date] = 0;
//         }
//         acc[date]++;
//         return acc;
//     }, {});

//     const chartData = Object.entries(appointmentsByDate).map(([date, count]) => ({ date, count }));


//     const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

//     const RADIAN = Math.PI / 180;
//     const renderCustomizedLabel = ({
//         cx,
//         cy,
//         midAngle,
//         innerRadius,
//         outerRadius,
//         percent,
//         index
//     }: any) => {
//         const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//         const x = cx + radius * Math.cos(-midAngle * RADIAN);
//         const y = cy + radius * Math.sin(-midAngle * RADIAN);

//         return (
//             <text
//                 x={x}
//                 y={y}
//                 fill="white"
//                 textAnchor={x > cx ? "start" : "end"}
//                 dominantBaseline="central"
//             >
//                 {`${(percent * 100).toFixed(0)}%`}
//             </text>
//         );
//     };






//     return (
//         <div
//             className='flex flex-col items-center justify-center w-full h-full bg-gray-100'
//         >
//             <h1>Chart</h1>
//             <LineChart width={500} height={300} data={chartData}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="count" stroke="#f88" />
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />

//             </LineChart>
//             <LineChart width={600} height={300}
//                 data={chartData}
//             >
//                 <XAxis dataKey="date" />
//                 <YAxis
//                     type="number"
//                     domain={['dataMin', 'dataMax']}
//                     allowDataOverflow

//                 />
//                 <Tooltip
//                     labelFormatter={(label) => `Date: ${label}`}
//                     formatter={(value) => `Count: ${value}`}

//                 />
//                 <Line
//                     type="monotone"
//                     dataKey="count"
//                     stroke="#f33"
//                     strokeWidth={2}
//                     dot={false}
//                     activeDot={{ r: 8 }}
//                 />

//             </LineChart>








//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart width={300} height={100}
//                     data={chartData}

//                 >
//                     <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2}
//                     />


//                 </LineChart>


//             </ResponsiveContainer>




//             <BarChart width={600} height={300} data={chartData}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="count" fill="#8884d8" />
//             </BarChart>

//             <div>
//                 <PieChart width={400} height={400}>
//                     <Pie
//                         data={chartData}
//                         dataKey="count"
//                         nameKey="date"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={80}
//                         fill="#8d8"
//                         label
//                     />
//                     <Tooltip />
//                 </PieChart>

//             </div>




//             <div>
//                 fghfgh
//             </div>
//             <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                     width={500}
//                     height={300}
//                     data={chartData}
//                     margin={{
//                         top: 5,
//                         right: 30,
//                         left: 20,
//                         bottom: 5,
//                     }}
//                 >
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis
//                         dataKey="date"
//                     />
//                     <YAxis />
//                     <Tooltip />
//                     <Legend />
//                     <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
//                     <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
//                 </LineChart>
//             </ResponsiveContainer>


//             <ResponsiveContainer width="100%" height="100%">
//                 <RadarChart cx="50%" cy="50%" outerRadius="80%"
//                     data={chartData}
//                 >
//                     <PolarGrid />
//                     <PolarAngleAxis
//                         dataKey="date"
//                     />
//                     <PolarRadiusAxis angle={30} domain={[0, 150]} />
//                     <Radar name="Mike" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
//                     <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
//                     <Legend />
//                 </RadarChart>
//             </ResponsiveContainer>

//             <h1>ffffffffgdf</h1>

//             <PieChart width={400} height={400}>
//                 <Pie
//                     data={chartData}
//                     cx={200}
//                     cy={200}
//                     labelLine={false}
//                     label={renderCustomizedLabel}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="count"
//                 >
//                     {chartData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                 </Pie>
//             </PieChart>


//         </div>

//     );
// }

// export default Chart;


import { useEffect, useState } from "react";
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useLogIN } from "../../ContextLog";
import axios from "axios";
import moment from "moment-timezone";
function App() {
    const [data, setData] = useState([]);
    const { Doctor, dark } = useLogIN();
    const [dateString, setDateString] = useState(new Date().toISOString().slice(0, 10));
    if (!Doctor || !Doctor.availableDays) return null;
    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Appointments and next day appointments'
        },
        xAxis: {
            categories: []
        },
        yAxis: [{
            title: {
                text: 'Number of appointments'
            }
        }, {
            title: {
                text: 'Number of next day appointments'
            },
            opposite: true
        }],
        series: [{
            name: 'Appointments',
            data: [],
            type: 'column',
            yAxis: 0
        }, {
            name: 'Next day appointments',
            data: [],
            type: 'line',
            yAxis: 1
        }]
    });




    useEffect(() => {
        // Fetch data and update chart options
        const getAppointmentsData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/doctor/appointments/${Doctor._id}/${dateString}`);
                const appointmentsPerDay = {};
                response.data.appointments.forEach(appointment => {
                    const appointmentDate = moment(appointment.appointmentDate).format('MM/DD/YYYY');
                    if (!appointmentsPerDay[appointmentDate]) {
                        appointmentsPerDay[appointmentDate] = 1;
                    } else {
                        appointmentsPerDay[appointmentDate]++;
                    }
                });
                const nextDayAppointmentsPerDay = {};
                response.data.nextDayAppointments.forEach(appointment => {
                    const appointmentDate = moment(appointment.appointmentDate).format('MM/DD/YYYY');
                    if (!nextDayAppointmentsPerDay[appointmentDate]) {
                        nextDayAppointmentsPerDay[appointmentDate] = 1;
                    } else {
                        nextDayAppointmentsPerDay[appointmentDate]++;
                    }
                });
                const categories = Object.keys(appointmentsPerDay);
                const data = Object.values(appointmentsPerDay);
                const nextDayData = Object.values(nextDayAppointmentsPerDay);
                setChartOptions({
                    ...chartOptions,
                    xAxis: {
                        categories: categories
                    },
                    series: [{
                        data: data
                    }, {
                        data: nextDayData
                    }]
                });
            } catch (error) {
                console.error(error);
            }
        }
        getAppointmentsData();
    }, [Doctor, dateString]);

    useEffect(() => {
        fetch(`http://localhost:3000/doctor/appointments/${Doctor._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })

            .then((res) => res.json())
            .then((data) => {
                setData(data.appointments);
                console.log(data.appointments);

            })
            .catch((err) => console.log(err));
    }, []);

    // group appointments by date
    const appointmentsByDate = data.reduce((acc, appointment) => {
        const date = new Date(appointment.appointmentDate).toLocaleDateString();

        if (!acc[date]) {
            acc[date] = {
                appointments: 0,
                appointmentTimes: []
            };
        }
        acc[date].appointments++;
        acc[date].appointmentTimes.push(appointment.appointmentTime);
        return acc;
    }, {});

    // calculate the average appointment time for each date
    Object.keys(appointmentsByDate).forEach((date) => {
        const totalAppointmentTime = appointmentsByDate[date].appointmentTimes.reduce((acc, time) => {
            const [hours, minutes] = time.split(':').map(Number);
            acc += hours + minutes / 60;
            return acc;
        }, 0);
        appointmentsByDate[date].averageAppointmentTime = totalAppointmentTime / appointmentsByDate[date].appointments;
    });

    // format data for the chart
    const chartData = Object.entries(appointmentsByDate).map(([date, { appointments, averageAppointmentTime }]) => {
        return {
            date,
            appointments,
            averageAppointmentTime
        };
    });

    const options = {
        chart: {
            type: 'line',
            height: 400,
            width: 800
        },
        title: {
            text: 'Appointments and Average Appointment Time by Date'
        },
        xAxis: {
            categories: chartData.map(({ date }) => date)
        },
        yAxis: [{
            title: {
                text: 'Appointments'
            },
        }, {
            title: {
                text: 'Average Appointment Time (hours)'
            },
            opposite: true,
        }],
        plotOptions: {
            series: {
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 3
                }
            }
        },
        series: [{
            name: 'Appointments',
            data: chartData.map(({ appointments }) => appointments),
            yAxis: 0
        }, {
            name: 'Average Appointment Time',
            data: chartData.map(({ averageAppointmentTime }) => averageAppointmentTime),

            yAxis: 1
        }],
        colors: ['#ff0000', '#00ff00']


    }


    return (
        <div
            className="
            grid
            grid-cols-2
            gap-4
            p-4
            mx-16
         
            
            "
        >
            <HighchartsReact
                highcharts={Highcharts}
                options={options}




            />




            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>


    );









}

export default App;