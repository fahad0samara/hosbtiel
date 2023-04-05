import { Routes, Route } from 'react-router-dom'
import SideNavigate from './SideNavigate'
import Dashboard from '../Dashbord/Dashbord'

import Appointment from '../AppointmentForm'
import Profile from '../profile/Profile'
import ListAppointments from '../ListAppointments'
import MyCalendar from '../Calendar/MyCalendar'

const RouterPatient = () => {
 return (
  <div>
   <SideNavigate />

   <Routes>
    <Route path="dashboard" element={<Dashboard />} />
    <Route path="MyCalendar" element={<MyCalendar />} />

    <Route path="appointment" element={<Appointment />} />
    <Route path="ListAppointments" element={<ListAppointments />} />
    <Route path="Profile" element={<Profile />} />
   </Routes>
  </div>
 )
}

export default RouterPatient
