import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

import { Link, useParams } from 'react-router-dom'
import { FiEdit2, FiEye } from 'react-icons/fi'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import { useLogIN } from '../../../../../ContextLog'
import { Appointment } from '../../../../types'
import Loder from '../../../../tools/Loder'

const ListAppointments = () => {
 const [error, setError] = useState(null)
 let { id } = useParams()
 const { Patient, dark } = useLogIN()
 const [appointmentData, setAppointments] = useState<Appointment[]>([])
 const [loading, setLoading] = useState(false)
 const [pagination, setPagination] = useState({
  page: 1,
  limit: 5,
  totalPages: 0,
 })

 useEffect(() => {
  setLoading(true)
  axios
   .get(`http://localhost:3000/admin/patient/all-appointments/${id}`, {
    params: {
     page: pagination.page,
     limit: pagination.limit,
    },
   })

   .then((res) => {
    setAppointments(res.data.allAppointments)
    console.info('🚀 ~ file: ListTable.tsx ~ line 38 ~ .then ~ res.data.patients', res.data)

    setPagination({
     ...pagination,
     totalPages: res.data.pagination.totalPages,
     page: pagination.page,
    })

    setLoading(false)
   })
   .catch((err) => {
    setError(err)

    setLoading(false)
   })
 }, [pagination.page])

 // handle prev and next

 const handlePrevClick = () => {
  setLoading(true)

  if (pagination.page === 1) {
   // Display a message to the user indicating that they are on the first page
   alert('You are on the first page')
   setLoading(false)
  } else {
   setLoading(false)
   setPagination({
    ...pagination,
    page: pagination.page - 1,
   })
  }
 }

 const handleNextClick = () => {
  setLoading(true)
  if (pagination.page === pagination.totalPages) {
   // Display a message to the user indicating that there are no more pages to be displayed
   alert('No more pages to be displayed')
   setLoading(false)
  } else {
   setLoading(false)
   setPagination({
    ...pagination,
    page: pagination.page + 1,
   })
  }
 }

 // currentPage
 const currentPage = pagination.page

 // total pages
 const totalPages = pagination.totalPages

 if (error) {
  return (
   <p className={dark ? 'text-red-500 text-center text-2xl' : 'text-red-500 text-center text-2xl'}>
    {
     // @ts-ignore
     error
    }
   </p>
  )
 }
 if (loading) {
  return (
   <div className="flex justify-center items-center">
    <Loder />
   </div>
  )
 }

 /* Creating an array of objects. for the symptoms  */
 const symptomStyles = [
  {
   background: 'bg-pink-500',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-pink-600',
   color: ' text-white',
  },
  {
   background: 'bg-amber-400',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-amber-600',
   color: ' text-white',
  },
  {
   background: 'bg-green-400',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-green-600',
   color: ' text-white',
  },
  {
   background: 'bg-blue-400',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-blue-600',
   color: ' text-white',
  },
  {
   background: 'bg-purple-400',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-purple-600',
   color: ' text-white',
  },
  {
   background: 'bg-gray-300',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-gray-600',
   color: ' text-white',
  },
  {
   background: 'bg-red-300',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-red-600',
   color: ' text-white',
  },
  {
   background: 'bg-orange-300',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-orange-600',
   color: ' text-white',
  },
  {
   background: 'bg-red-300',
   borderRadius: 'rounded-xl',
   padding: 'px-2 py-1',
   border: 'border-2 border-red-600',
   color: ' text-white',
  },
 ]
 return (
  <div
   style={{
    boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
   }}
   className="overflow-x-auto
                  p-8 my-3 col-span-2 rounded-2xl 
                  shadow-lg
                "
  >
   {
    //prescription
   }

   <h1
    className="
                  text-center
                  md:text-left
                  font-bold
                   text-2xl mb-5 text-cyan-400 "
   >
    appointment History
   </h1>
   <div
    className="
            hidden md:block"
   >
    {
     /* Checking if the data is loaded and if it is loaded it will display the table. */
     appointmentData && appointmentData.length > 0 ? (
      <div
       style={{
        backgroundColor: dark ? '#000' : '#fff',
        color: dark ? '#fff' : '#000',
       }}
       className="
            hidden sm:block"
      >
       {loading ? (
        <div
         className=" 
              flex
              justify-center
              items-center
              h-screen
              w-full"
        >
         <div className="line"></div>
        </div>
       ) : (
        <table
         className="
                
           
                
    max-w-5xl
            w-full
             

            mx-auto

    "
        >
         <thead className={dark ? 'bg-cyan-400 text-gray-200' : 'bg-cyan-400 text-gray-800'}>
          <tr className="uppercase text-sm italic font-medium leading-normal">
           <th className="text-center ">Doctor Name</th>
           <th className="text-center ">specialty</th>
           <th className="text-center ">Date</th>
           <th className="text-center ">Time</th>
           <th className="text-center ">Symptoms</th>
          </tr>
         </thead>
         {
          //if there no pation
          appointmentData && appointmentData.length === 0 ? (
           <tbody className="text-sm font-light">
            <tr className="text-center">
             <td colSpan={9}>
              <p className="text-red-500 text-center text-2xl">No Patients</p>
             </td>
            </tr>
           </tbody>
          ) : (
           appointmentData &&
           appointmentData.map((appointment) => {
            return (
             <tbody key={appointment._id} className={' text-sm font-light'}>
              <tr className={'border-b border-gray-200 hover:bg-gray-100 hover:text-black'}>
               <td className=" text-left whitespace-nowrap">
                <div className="mr-2 flex flex-col">
                 <span className="font-medium">
                  Dr.
                  {appointment.doctor.name.firstName}
                 </span>

                 <span className="font-medium">{appointment.doctor.name.lastName}</span>
                </div>
               </td>
               <td className="text-center ">
                <div className="mr-6 text-center font-medium">{appointment.doctor.specialty}</div>
               </td>
               <td className="text-center sm:text-left">
                <div className="mr-6 text-center font-medium">
                 {appointment.appointmentDate.slice(0, 10).split('-').reverse().join('-')}
                </div>
               </td>
               <td className="text-center sm:text-left">
                <div className="mr-6 text-center font-medium">{appointment.appointmentTime}</div>
               </td>
               <td className="">
                <div className="flex flex-wrap mt-2 items-center text-center">
                 <div className="hidden sm:block">
                  {appointment.symptoms.map((symptom, index) => (
                   <div
                    key={index + 1}
                    className={`${symptomStyles[index]?.background} ${symptomStyles[index]?.color} ${symptomStyles[index]?.border} ${symptomStyles[index]?.borderRadius} ${symptomStyles[index]?.padding} mr-2 text-center font-medium mt-2 inline-block`}
                   >
                    {symptom}
                   </div>
                  ))}
                 </div>
                </div>
               </td>
              </tr>
             </tbody>
            )
           })
          )
         }
        </table>
       )}

       <div className="flex justify-center items-center mt-14 space-x-4">
        <div className="   rounded-full text-center py-2">
         <BsArrowLeftCircleFill
          className={
           currentPage === 1 ? 'text-gray-300 text-3xl cursor-not-allowed' : 'text-cyan-300 text-3xl cursor-pointer '
          }
          onClick={handlePrevClick}
         />
        </div>

        <div>
         <span className="text-gray-500 text-xl">
          Page {currentPage} of {totalPages}
         </span>
        </div>

        <div className="   rounded-full text-center py-2">
         <BsArrowRightCircleFill
          className={
           currentPage === totalPages
            ? 'text-gray-300 text-3xl cursor-not-allowed'
            : 'text-cyan-300 text-3xl cursor-pointer '
          }
          onClick={handleNextClick}
         />
        </div>
       </div>
      </div>
     ) : (
      <p className="text-gray-500 text-center ml-11">The patient does not have any appointment yet</p>
     )
    }
   </div>

   <ul className="space-y-4 md:hidden block">
    {appointmentData && appointmentData.length === 0 ? (
     <li>
      <p className="text-gray-500 text-center ml-11">The patient does not have any appointment yet</p>
     </li>
    ) : (
     <div>
      {appointmentData.map((appointment) => {
       return (
        <div key={appointment._id} className="border-b max-w-md ml-20 mt-4">
         <div className="flex justify-between">
          <h3 className=" ">
           Dr. {appointment.doctor.name.firstName} {appointment.doctor.name.lastName}
          </h3>
          <div className="">
           <span className="font-medium ">Time:</span>
           <span className="text-sm">{appointment.appointmentTime}</span>
          </div>
         </div>
         <div className="mt-2">
          <span className="font-medium">specialty:</span>
          <span> {appointment.doctor.specialty}</span>

          <div className="mt-2">
           <span className="font-medium">Date: </span>
           <span> {new Date(appointment.appointmentDate).toLocaleDateString()}</span>
          </div>
          <div className="flex flex-wrap mt-2">
           {appointment.symptoms.map((symptom, index) => (
            <div key={index} className={`${symptomStyles[index]?.background}   } text-center mr-1  mt-1 `}>
             {symptom}
            </div>
           ))}
          </div>
         </div>
        </div>
       )
      })}
      <div className="flex justify-center items-center mt-14 space-x-4 ml-16">
       <div className="   rounded-full text-center py-2">
        <BsArrowLeftCircleFill
         className={
          currentPage === 1 ? 'text-gray-300 text-3xl cursor-not-allowed' : 'text-cyan-300 text-3xl cursor-pointer '
         }
         onClick={handlePrevClick}
        />
       </div>

       <div>
        <span className="text-gray-500 text-xl">
         Page {currentPage} of {totalPages}
        </span>
       </div>

       <div className="   rounded-full text-center py-2">
        <BsArrowRightCircleFill
         className={
          currentPage === totalPages
           ? 'text-gray-300 text-3xl cursor-not-allowed'
           : 'text-cyan-300 text-3xl cursor-pointer '
         }
         onClick={handleNextClick}
        />
       </div>
      </div>
     </div>
    )}
   </ul>
  </div>
 )
}

export default ListAppointments
