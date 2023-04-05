import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import animationData from '../assets/Appotmint.json' // Import the data for your Lottie animation
import { useLogIN } from '../../ContextLog'

const Appointment = () => {
 const {
  logPatient,

  Profile,
  setProfile,

  dark,
  setdark,
 } = useLogIN()
 return (
  <div
   className="w-full flex-col flex overflow-hidden
        rounded-lg shadow-xs p-4
        h-screen
        items-center
        "
   style={{
    backgroundColor: dark ? '#000' : '#fff',
    color: dark ? '#fff' : '#000',
   }}
  >
   <Player
    autoplay
    loop
    src={animationData}
    style={{
     height: '500px',
     width: '500x',
    }}
   />
   <div className="rounded-lg p-6">
    <p className="text-lg font-medium mb-4 text-green-500">Your appointment has been created successfully!</p>

    <p className="text-lg font-medium mb-4 text-green-500">You will be redirected to the dashboard</p>
   </div>
  </div>
 )
}

export default Appointment
