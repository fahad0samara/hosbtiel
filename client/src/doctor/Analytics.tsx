// import React, { useState, useEffect } from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// const Analytics = () => {
//     const [patientData, setPatientData] = useState([]);
//     const [diagnosisData, setDiagnosisData] = useState([]);
//     const [revenueData, setRevenueData] = useState([]);

//     useEffect(() => {
//         const fetchPatientData = async () => {
//             try {
//                 const response = await axios.get('/api/patient_data');
//                 setPatientData(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         const fetchDiagnosisData = async () => {
//             try {
//                 const response = await axios.get('/api/diagnosis_data');
//                 setDiagnosisData(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         const fetchRevenueData = async () => {
//             try {
//                 const response = await axios.get('/api/revenue_data');
//                 setRevenueData(response.data);
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchPatientData();
//         fetchDiagnosisData();
//         fetchRevenueData();
//     }, []);

//     return (
//         <div>
//             <h2>Patients seen per day</h2>
//             <LineChart width={600} height={300} data={patientData}>
//                 <XAxis dataKey="date" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="patients" stroke="#8884d8" />
//             </LineChart>

//             <h2>Most common diagnoses</h2>
//             <BarChart width={600} height={300} data={diagnosisData}>
//                 <XAxis dataKey="diagnosis" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="count" fill="#8884d8" />
//             </BarChart>

//             <h2>Revenue generated</h2>
//             <LineChart width={600} height={300} data={revenueData}>
//                 <XAxis dataKey="month" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="mon
