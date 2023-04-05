import React, { useContext, useState, createContext } from 'react'

import axios from 'axios'
import Loder from './src/tools/Loder'

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
 }
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
   }}
  >
   {Loading ? <Loder /> : children}
  </ContextLog.Provider>
 )
}

export const useLogIN = () => useContext(ContextLog)

export default LogCheck
