import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player'
import animationData from '../.././src/assets/Heart.json' // Import the data for your Lottie animation
import { useLogIN } from '../../ContextLog'

const Loder = () => {
 const {
  logPatient,

  Profile,
  setProfile,

  dark,
  setdark,
 } = useLogIN()
 return (
  <div
   className="w-full overflow-hidden
        rounded-lg shadow-xs p-4
        h-screen
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
     height: '100px',
     width: '100px',
     position: 'absolute',
     top: '50%',
     left: '50%',
     transform: 'translate(-50%, -50%)',
    }}
   />
  </div>
 )
}

export default Loder
