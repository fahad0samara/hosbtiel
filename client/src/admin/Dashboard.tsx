import React from 'react'
import { useLogIN } from '../../ContextLog'

function Dashboard() {
    const {
      logPatient,

      Profile,
      setProfile,

      setLoading,
      dark,
      setdark,
    } = useLogIN()


  return (
    <div
      className="
      flex flex-col items-center justify-center"
      style={{
        backgroundColor: dark ? "#1e1e1e" : "#fff",
        color: dark ? "#fff" : "#000",
      }}

    >
      <h1>Dashboard</h1>
      <h1>{Profile?.name}</h1>
      <h1>{Profile?.email}</h1>
      <h1>{Profile?.role}</h1>

    </div>
  )
}

export default Dashboard