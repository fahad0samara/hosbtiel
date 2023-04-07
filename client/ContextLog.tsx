import React, { useContext, useState, createContext, useEffect } from 'react'

import axios from 'axios'
import Loder from './src/tools/Loder'
import jwtDecode from 'jwt-decode'
import { Navigate } from 'react-router-dom'

const ContextLog = createContext(
 {} as {
  logPatient: boolean
  setlogPatient: React.Dispatch<React.SetStateAction<boolean>>
  logAdmin: boolean
  setlogAdmin: React.Dispatch<React.SetStateAction<boolean>>
  Profile: any
  setProfile: React.Dispatch<React.SetStateAction<any>>
  Loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  dark: boolean
  setdark: React.Dispatch<React.SetStateAction<boolean>>
  logDr: boolean
  setlogDr: React.Dispatch<React.SetStateAction<boolean>>
  Patient: any
  setPatient: React.Dispatch<React.SetStateAction<any>>
  Doctor: any
  setDoctor: React.Dispatch<React.SetStateAction<any>>
  Events: any
  setEvents: React.Dispatch<React.SetStateAction<any>>
  authenticated: boolean
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
 },
)
const LogCheck = ({ children }: any) => {
 const [logPatient, setlogPatient] = useState(false)
 const [logAdmin, setlogAdmin] = useState(false)
 const [logDr, setlogDr] = useState(false)
 const [Patient, setPatient] = useState()
 const [Doctor, setDoctor] = useState()
 const [Events, setEvents] = useState([])

 const [Profile, setProfile] = useState()
 const [Loading, setLoading] = useState(false)
 const [dark, setdark] = useState(localStorage.getItem('dark') === 'true' ? true : false)
 const [authenticated, setAuthenticated] = useState(false)

 //  // Check if the user is authenticated when the component mounts
 //  useEffect(() => {
 //   const token = localStorage.getItem('token')

 //   if (token) {
 //    try {
 //     const decoded = jwtDecode(token)
 //     if (decoded.exp * 1000 < Date.now()) {
 //      // Token has expired
 //      localStorage.removeItem('token')
 //     } else {
 //      // Token is valid
 //      if (decoded.role === 'admin') {
 //       setlogAdmin(true)
 //      } else if (decoded.role === 'patient') {
 //       axios
 //        .get(`http://localhost:3000/user/getPatient/${decoded.patientId}`, {
 //         headers: {
 //          Authorization: `Bearer ${token}`,
 //         },
 //        })
 //        .then((response) => {
 //         setPatient(response.data)
 //         setProfile(response.data)
 //        })
 //        .catch((error) => {
 //         console.log('Error while fetching patient:', error)
 //        })
 //       setlogPatient(true)
 //      } else if (decoded.role === 'doctor') {
 //       axios
 //        .get(`http://localhost:3000/doctor/doctors/${decoded.doctorId}`, {
 //         headers: {
 //          Authorization: `Bearer ${token}`,
 //         },
 //        })
 //        .then((response) => {
 //         setDoctor(response.data)
 //         setProfile(response.data)
 //        })
 //        .catch((error) => {
 //         console.log('Error while fetching doctor:', error)
 //        })
 //       setlogDr(true)
 //      }
 //      setAuthenticated(true)
 //     }
 //    } catch (error) {
 //     console.log('Error while decoding token:', error)
 //     localStorage.removeItem('token')
 //    }
 //   } else {
 //    setAuthenticated(false)
 //   }
 //  }, [])
 useEffect(() => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('role')
  const authenticated = localStorage.getItem('authenticated') === 'true'

  if (token && authenticated) {
   try {
    const decoded = jwtDecode(token)
    if (decoded.exp * 1000 < Date.now()) {
     // Token has expired
     localStorage.removeItem('token')
     localStorage.removeItem('role')
     localStorage.removeItem('authenticated')
    } else {
     // Token is valid
     if (role === 'admin') {
      setlogAdmin(true)
     } else if (role === 'patient') {
      axios
       .get(`http://localhost:3000/user/getPatient/${decoded.patientId}`, {
        headers: {
         Authorization: `Bearer ${token}`,
        },
       })
       .then((response) => {
        setPatient(response.data)
        setProfile(response.data)
       })
       .catch((error) => {
        console.log('Error while fetching patient:', error)
       })
      setlogPatient(true)
     } else if (role === 'doctor') {
      axios
       .get(`http://localhost:3000/doctor/doctors/${decoded.doctorId}`, {
        headers: {
         Authorization: `Bearer ${token}`,
        },
       })
       .then((response) => {
        setDoctor(response.data)
        setProfile(response.data)
       })
       .catch((error) => {
        console.log('Error while fetching doctor:', error)
       })
      setlogDr(true)
     }
     setAuthenticated(true)
    }
   } catch (error) {
    console.log('Error while decoding token:', error)
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('authenticated')
   }
  } else {
   setAuthenticated(false)
  }
 }, [])

 return (
  <ContextLog.Provider
   value={{
    logDr,
    setlogDr,
    logPatient,
    setlogPatient,
    logAdmin,
    setlogAdmin,
    Profile,
    setProfile,
    Loading,
    setLoading,
    dark,
    setdark,
    Patient,
    setPatient,
    Doctor,
    setDoctor,
    Events,
    setEvents,
    authenticated,
    setAuthenticated,
   }}
  >
   {Loading ? <Loder /> : children}
  </ContextLog.Provider>
 )
}

export const useLogIN = () => useContext(ContextLog)

export default LogCheck
