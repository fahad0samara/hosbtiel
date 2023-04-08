import { Routes, Route, Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import Hero from './Home/Hero'
import RouterPatient from './patient/router/RouterPatient'
import { useLogIN } from '../ContextLog'
import RouterAdmin from './admin/Router/RouterAdmin'
import Register from './Home/auth/Register'
import Login from './Home/auth/Login'
import RegisterPatient from './patient/auth/RegisterPatient'
import Routerdoctor from './doctor/router/Routerdoctor'
const NotFound = () => {
 return (
  <div>
   <h1>Page Not Found</h1>
   <p>The requested page could not be found.</p>
  </div>
 )
}
const Router = () => {
 const { logPatient, logAdmin, logDr, authenticated } = useLogIN()
 const navigator = useNavigate()

 if (authenticated) {
  if (logAdmin) {
   navigator('/admin/dashboard')
  } else if (logPatient) {
   navigator('/patient/dashboard')
  } else if (logDr) {
   navigator('/doctor/dashboard')
  }
 }
 return (
  <Routes>
   {logPatient && <Route path="/patient/*" element={<RouterPatient />} />}
   {logAdmin && <Route path="/admin/*" element={<RouterAdmin />} />}
   {logDr && <Route path="/doctor/*" element={<Routerdoctor />} />}

   <Route path="/" element={<Hero />} />

   <Route path="/RegisterPatient" element={<RegisterPatient />} />

   <Route path="/Register" element={<Register />} />
   <Route path="/login" element={<Login />} />
   {/* Catch-all route */}
   <Route
    path="/*"
    element={
     <Navigate
      to={logPatient ? '/patient/dashboard' : logAdmin ? '/admin/dashboard' : logDr ? '/doctor/dashboard' : '/'}
     />
    }
   />

   {/* Catch-all route for 404 page */}
   <Route path="*" element={<NotFound />} />
  </Routes>
 )
}

export default Router
