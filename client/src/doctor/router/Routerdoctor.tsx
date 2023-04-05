import { Routes, Route, useParams, useNavigate } from 'react-router-dom'

import Dashboard from '../DashBord/Dashboard'
import SideNav from './SideNavigate'
import DoctorProfile from '../Profile/DoctorProfile'
import MyCalendar from '../Calendar/MyCalendar'
import ViewPatient from '../../admin/List/patient/Profiel/ViewPatient'
import Prescription from '../Prescription/Prescription'
import PrescriptionTable from '../Prescription/PrescriptionTable'
import ListTable from '../PatientsList/ListTable'
import { useState, useEffect } from 'react'
import WorkingHours from '../Calendar/WorkingHours'
import { useLogIN } from '../../../ContextLog'
import axios from 'axios'
import FirstTimeLogin from '../FirstTimeLogin'

// function FirstTimeLogin({ onContinue }) {
//   const [hoursSubmitted, setHoursSubmitted] = useState(false);

//   const handleContinue = () => {
//     if (hoursSubmitted) {
//       onContinue();
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center w-full h-full fixed top-0 left-0 bg-white bg-opacity-75 z-50">
//       <h1>Welcome, Doctor!</h1>
//       <p>
//         This is your first time logging in. Here are some tips on how to use the
//         system:
//       </p>
//       <ul>
//         <li>...</li>
//         <li>...</li>
//         <li>...</li>

//       </ul>
//       <button onClick={handleContinue} disabled={!hoursSubmitted}>
//         Continue
//       </button>
//     </div>
//   );
// }

const Routerdoctor = () => {
 const { Doctor, dark, Profile } = useLogIN()

 const [showDashboard, setShowDashboard] = useState(true) // Initially show the dashboard
 const [showFirstTimeLogin, setShowFirstTimeLogin] = useState(false)

 useEffect(() => {
  if (!Doctor) return

  const checkFirstTimeLogin = async () => {
   try {
    const response = await axios.get(`http://localhost:3000/doctor/checkFirstTimeLogin/${Doctor._id}`)
    const data = response.data
    setShowFirstTimeLogin(!data.hasCompletedFirstTimeLogin)
   } catch (error) {
    console.error(error)
   }
  }

  checkFirstTimeLogin()

  const timerId = setTimeout(() => {
   setShowDashboard(false) // Hide the dashboard after 2 seconds
  }, 1000)

  return () => clearTimeout(timerId) // Clear the timeout on unmount
 }, [Doctor])

 const handleContinue = async () => {
  try {
   await axios.post(`http://localhost:3000/doctor/completeFirstTimeLogin/${Doctor._id}`, {
    doctorId: Doctor._id,
   })
   setShowFirstTimeLogin(false)
   setShowDashboard(false) // Hide the dashboard after completing first-time login
  } catch (error) {
   console.error(error)
  }
 }

 return (
  <>
   {showDashboard && (
    <div className="flex items-center justify-center h-screen">
     <h1>Loading dashboard...</h1>
    </div>
   )}
   {!showDashboard && (
    <>
     {showFirstTimeLogin ? (
      <FirstTimeLogin onContinue={handleContinue} />
     ) : (
      <div>
       <SideNav />
       <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="MyCalendar" element={<MyCalendar />} />
        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="Prescription" element={<Prescription />} />
        <Route path="ListTable" element={<ListTable />} />
        <Route path="PrescriptionTable" element={<PrescriptionTable />} />
        <Route path="/ViewPatient/:id" element={<ViewPatient />} />
       </Routes>
      </div>
     )}
    </>
   )}
  </>
 )
}

export default Routerdoctor
