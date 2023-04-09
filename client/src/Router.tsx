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
import NotFound from './NotFound'

const Router = () => {
 const { logPatient, logAdmin, logDr, authenticated } = useLogIN()

 return (
  <Routes>
   {logPatient && <Route path="/patient/*" element={<RouterPatient />} />}
   {logAdmin && <Route path="/admin/*" element={<RouterAdmin />} />}
   {logDr && <Route path="/doctor/*" element={<Routerdoctor />} />}

   <Route path="/" element={<Hero />} />

   <Route path="/RegisterPatient" element={<RegisterPatient />} />

   <Route path="/Register" element={<Register />} />

   {/* Check if the user is authenticated */}
   {authenticated ? (
    <>
     {/* Redirect to dashboard */}
     <Route
      path="/*"
      element={
       <Navigate
        to={logPatient ? '/patient/dashboard' : logAdmin ? '/admin/dashboard' : logDr ? '/doctor/dashboard' : '/'}
       />
      }
     />

     {/* Redirect to dashboard if user visits the login page */}
     <Route
      path="/login"
      element={
       <Navigate
        to={logPatient ? '/patient/dashboard' : logAdmin ? '/admin/dashboard' : logDr ? '/doctor/dashboard' : '/'}
       />
      }
     />
    </>
   ) : (
    /* If the user is not authenticated, render the Login component */
    <Route path="/login" element={<Login />} />
   )}

   {/* Catch-all route for 404 page */}
   <Route path="*" element={<NotFound />} />
  </Routes>
 )
}

export default Router
