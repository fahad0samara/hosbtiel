import { Link, Outlet, useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav'

import '@trendmicro/react-sidenav/dist/react-sidenav.css'
import { RiDashboardFill, RiLogoutBoxRLine } from 'react-icons/ri'
import { useLogIN } from '../../../ContextLog'
import { FaFilePrescription } from 'react-icons/fa'
import { CgProfile, CgUserList } from 'react-icons/cg'
import { BsCalendarDate } from 'react-icons/bs'

import { TbCheckupList } from 'react-icons/tb'
import axios from 'axios'

const SideNavigate = (_props: any) => {
 const { setEvents, setAuthenticated, setProfile, setPatient, dark, setDoctor, setlogPatient, setlogAdmin, setlogDr } =
  useLogIN()
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()
 const { id } = useParams()
 const HandleLogout = async () => {
  setLoading(true)
  try {
   await axios.post(
    'http://localhost:3000/user/logout',
    {},
    {
     headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    },
   )

   localStorage.removeItem('token')
   localStorage.removeItem('authenticated')
   localStorage.removeItem('role')
   setlogPatient(false)
   setlogAdmin(false)
   setlogDr(false)
   setPatient(undefined)
   setDoctor(undefined)
   setEvents([])
   setProfile(undefined)
   setAuthenticated(false)
   navigate('/login')
   console.log(
    '🚀 ~ file: SideNavigate.tsx ~ line 70 ~ HandleLogout ~ localStorage.getItem("token")',
    localStorage.getItem('token'),
   )
  } catch (error) {
   // Handle error
   console.log(error)
  } finally {
   setLoading(false)
  }
 }

 return (
  <>
   {loading && (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
     <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64"></div>
    </div>
   )}
   <SideNav
    /*  . */
    style={{
     backgroundColor: dark ? '#000' : 'rgb(103 232 249)',

     boxShadow: dark ? '0px 0px 10px 0px rgb(103 232 249)  ' : '0px 0px 10px 0px #000',
    }}
    onSelect={(selected: string) => {
     if (selected === 'dashboard') {
      navigate('/doctor/dashboard')
     } else if (selected === 'MyCalendar') {
      navigate('/doctor/MyCalendar')
     } else if (selected === 'doctor') {
      navigate(`/doctor/doctor/${id}`)
     } else if (selected === 'Prescription') {
      navigate(`/doctor/Prescription`)
     } else if (selected === 'PrescriptionTable') {
      navigate(`/doctor/PrescriptionTable`)
     } else if (selected === 'ListTable') {
      navigate(`/doctor/ListTable`)
     } else if (selected === 'logout') {
      // add this code for logout functionality

      HandleLogout()
     }
    }}
    className="
  h-full
      fixed
      top-0
      left-0
  z-50
  "
   >
    <SideNav.Toggle
     style={{
      color: dark ? 'red' : 'black',
      fontSize: '1.5rem',
      fontWeight: 'bold',
     }}
    />
    <SideNav.Nav
     defaultOpenKeys={['dashboard']}
     className="

        "
     style={{
      color: dark ? 'white' : 'black',
      fontSize: '1.5rem',
      fontWeight: 'bold',
     }}
     defaultSelected="dashboard"
    >
     <NavItem eventKey="dashboard">
      <NavIcon>
       <RiDashboardFill
        style={{
         color: dark ? 'rgb(103 232 249)' : 'black',
         fontSize: '1.8rem',
         fontWeight: 'bold',
         marginLeft: '1rem',
         marginTop: '1rem',
        }}
       />
      </NavIcon>
      <NavText
       style={{
        color: dark ? 'rgb(103 232 249)' : 'black',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        marginTop: '1rem',
       }}
      >
       dashboard
      </NavText>
     </NavItem>
     <NavItem eventKey="MyCalendar">
      <NavIcon>
       <BsCalendarDate
        style={{
         color: dark ? 'rgb(103 232 249)' : 'black',
         fontSize: '1.8rem',
         fontWeight: 'bold',
         marginLeft: '1rem',
         marginTop: '1rem',
        }}
       />
      </NavIcon>
      <NavText
       style={{
        color: dark ? 'rgb(103 232 249)' : 'black',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        marginTop: '1rem',
       }}
      >
       MyCalendar
      </NavText>
     </NavItem>

     <NavItem eventKey="Prescription">
      <NavIcon>
       <FaFilePrescription
        style={{
         color: dark ? 'rgb(103 232 249)' : 'black',
         fontSize: '1.8rem',
         fontWeight: 'bold',
         marginLeft: '1rem',
         marginTop: '1rem',
        }}
       />
      </NavIcon>
      <NavText
       style={{
        color: dark ? 'rgb(103 232 249)' : 'black',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        marginTop: '1rem',
       }}
      >
       Prescription
      </NavText>
     </NavItem>
     <NavItem eventKey="PrescriptionTable">
      <NavIcon>
       <TbCheckupList
        style={{
         color: dark ? 'rgb(103 232 249)' : 'black',
         fontSize: '1.8rem',
         fontWeight: 'bold',
         marginLeft: '1rem',
         marginTop: '1rem',
        }}
       />
      </NavIcon>
      <NavText
       style={{
        color: dark ? 'rgb(103 232 249)' : 'black',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        marginTop: '1rem',
       }}
      >
       PrescriptionList
      </NavText>
     </NavItem>
     <NavItem eventKey="ListTable">
      <NavIcon>
       <CgUserList
        style={{
         color: dark ? 'rgb(103 232 249)' : 'black',
         fontSize: '1.8rem',
         fontWeight: 'bold',
         marginLeft: '1rem',
         marginTop: '1rem',
        }}
       />
      </NavIcon>
      <NavText
       style={{
        color: dark ? 'rgb(103 232 249)' : 'black',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        marginTop: '1rem',
       }}
      >
       PatientsList
      </NavText>
     </NavItem>
     <NavItem eventKey="doctor">
      <NavIcon>
       <CgProfile
        style={{
         color: dark ? 'rgb(103 232 249)' : 'black',
         fontSize: '1.8rem',
         fontWeight: 'bold',
         marginLeft: '1rem',
         marginTop: '1rem',
        }}
       />
      </NavIcon>
      <NavText
       style={{
        color: dark ? 'rgb(103 232 249)' : 'black',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        marginTop: '1rem',
       }}
      >
       Profile
      </NavText>
     </NavItem>

     <NavItem eventKey="logout">
      <NavIcon>
       <RiLogoutBoxRLine
        style={{
         color: dark ? 'rgb(103 232 249)' : 'black',
         fontSize: '1.8rem',
         fontWeight: 'bold',
         marginLeft: '1rem',
         marginTop: '1rem',
        }}
       />
      </NavIcon>
      <NavText
       onClick={
        //HandleLogout
        () => {
         localStorage.removeItem('token')
         localStorage.removeItem('user')
         localStorage.removeItem('role')
         localStorage.removeItem('token')
         localStorage.removeItem('authenticated')
         setlogPatient(false)
         setlogAdmin(false)
         setlogDr(false)
         setPatient(undefined)
         setDoctor(undefined)
         setEvents([])
         setProfile(undefined)
         setAuthenticated(false)
         navigate('/login')
         console.log('logout')
        }
       }
       style={{
        color: dark ? 'rgb(103 232 249)' : 'black',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        marginLeft: '1rem',
        marginTop: '1rem',
       }}
      >
       Logout
      </NavText>
     </NavItem>
    </SideNav.Nav>
   </SideNav>
  </>
 )
}

export default SideNavigate

// import {NavLink, useNavigate, useParams} from "react-router-dom";

// const SideNav = () => {
//   const navigate = useNavigate();
//   const {id} = useParams();

//   return (
//     <div>
//       <nav>
//         <ul>
//           <li>
//             <NavLink
//               to="/doctor/dashboard"
//               onClick={() => navigate("/doctor/dashboard")}
//             >
//               Dashboard
//             </NavLink>
//           </li>
//           <li>
//             <NavLink
//               to={`/doctor/about/${id}`}
//               onClick={() => navigate(`/doctor/about/${id}`
//               )}
//             >
//               About
//             </NavLink>
//           </li>
//           <li>
//             {
//               // pass the actual id value here
//               //http://localhost:3000/doctor/doctors/63af46e39b3184d62a652f4e
//             }
//             <NavLink
//               to={`/doctor/doctor/${id}`}
//               onClick={() => navigate(`/doctor/doctor/${id}`)}
//             >
//               DoctorProfile
//             </NavLink>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   );
// };

// export default SideNav;
