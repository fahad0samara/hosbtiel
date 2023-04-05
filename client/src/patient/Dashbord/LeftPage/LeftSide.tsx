import img from '../../../assets/LeftSide.png'

import { useLogIN } from '../../../../ContextLog'
import avatar from '../../../assets/avatar.png'
import { useNavigate } from 'react-router-dom'

const LeftSide = () => {
 const { Patient } = useLogIN()
 const navigate = useNavigate()
 return (
  <div className="ml-16 ">
   <div className="mt-12 flex flex-col justify-center  items-center">
    {Patient && Patient.avatar ? (
     <img
      className="
        w-20 h-20
        rounded-full
        shadow-2xl
        overflow-hidden
      
      "
      src={Patient.avatar}
     />
    ) : (
     <img
      className="
        w-20 h-20
        rounded-full
        shadow-2xl
        overflow-hidden
        ml-16
        object-cover
      "
      src={avatar}
      alt="avatar"
     />
    )}

    <h1 className="lg:text-lg font-semibold ">Check your condition</h1>
    <p className="text-sm font-normal text-gray-500 mt-2 ">Check your every situation </p>
    <p className="text-sm font-normal text-gray-500 ">and your actives</p>
    <div className="flex flex-row justify-center items-center ">
     <button
      onClick={() => navigate('/patient/appointment')}
      className="bg-cyan-300 text-white font-semibold rounded-2xl shadow-md px-4 py-2 mt-4 ml-2"
     >
      cheek it Now
     </button>
    </div>
   </div>

   <img
    src={img}
    alt="leftsid"
    className="mt-10
                w-96 h-96
                
                
                
                
                
                

              "
   />
  </div>
 )
}

export default LeftSide
