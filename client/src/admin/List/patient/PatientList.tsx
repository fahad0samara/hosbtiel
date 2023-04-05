import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLogIN } from '../../../../ContextLog'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { FiEdit2, FiEye } from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { patient } from '../../../types'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import Alert from '../../../tools/Alert'
import Loder from '../../../tools/Loder'

const PatientList = () => {
 const {
  logPatient,

  Profile,
  setProfile,

  dark,
  setdark,
 } = useLogIN()
 const [patients, setpatients] = useState<patient[]>([])

 const [error, setError] = useState('')
 const [success, setSuccess] = useState('')
 const [pagination, setPagination] = useState({
  page: 1,
  limit: 5,
  totalPages: 0,
 })
 const [loading, setLoading] = useState(false)

 useEffect(() => {
  setLoading(true)

  axios
   .get('http://localhost:3000/admin/patient', {
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    params: {
     page: pagination.page,
     limit: pagination.limit,
    },
   })
   .then((res) => {
    setPagination({
     ...pagination,
     totalPages: res.data.pagination.totalPages,
     page: pagination.page,
     limit: pagination.limit,
    })
    setLoading(false)
    setpatients(res.data.patients)

    setLoading(false)
   })
 }, [pagination.page])
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

 // delet the patients
 const deletepatients = (id: any) => {
  setLoading(true)
  if (window.confirm('Are you sure you want to delete this patients?')) {
   axios
    .delete(`http://localhost:3000/admin/patient/${id}`, {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    })
    .then((res) => {
     console.log(res.data)
     setpatients(patients.filter((patients: any) => patients._id !== id))
     setLoading(false)
    })
    .then((res) => {
     setLoading(false)
     setSuccess('patients deleted successfully')
     setTimeout(() => {
      setSuccess('')
     }, 2000)
    })
    .catch((err) => {
     setError('Error deleting patients')
     setTimeout(() => {
      setError('')
     }, 2000)
    })
  }
 }

 return (
  <div
   style={{
    backgroundColor: dark ? '#000' : '#fff',
    color: dark ? '#fff' : '#000',
   }}
   className="p-6 h-screen ml-11 mx-auto"
  >
   <div className="md:hidden ">
    <Alert />
   </div>
   <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
    <div
     className="text-xl  font-medium  flex 
      items-center
      ml-20
      
        "
    >
     <h1 className=" text-2xl font-bold "> Patients List</h1>
     {
      /* Checking if the data is loaded and if it is loaded it will display the table. */
      patients && patients.length > 0 ? (
       <h1
        className="text-2xl text-cyan-300
              font-medium ml-3"
       >
        {' '}
        {patients.length}{' '}
       </h1>
      ) : (
       <h1 className="text-2xl text-cyan-300 font-medium  ml-2"> 0 </h1>
      )
     }
    </div>
   </div>
   <div className="overflow-x-auto  mx-auto ml-10">
    <div className={'w-full '}>
     {loading ? (
      <Loder />
     ) : (
      <table className="max-w-5xl w-full mx-auto text-left rounded-lg overflow-hidden table-auto">
       <thead>
        <tr className=" uppercase text-sm leading-normal">
         <th className="py-3 px-6 text-left">healthIDNumber</th>
         <th className="py-3 px-6 ">name</th>
         <th className="py-3 px-6 text-center">email</th>
         <th className="py-3 px-6 text-center">joinDate</th>
         <th className="py-3 px-6 text-center">phoneNumber</th>
         <th className="py-3 px-6 text-center">Age</th>

         <th className="py-3 px-6 text-center">Actions</th>
        </tr>
       </thead>
       {patients.map((patients) => {
        return (
         <tbody key={patients._id} className={' text-sm font-light'}>
          <tr className={'border-b border-gray-200 hover:bg-gray-100 hover:text-black'}>
           <td className="py-3 px-8 text-left whitespace-nowrap">
            <span className="font-medium text-center ml-8">{patients.healthIDNumber}</span>
           </td>
           <td className="py-3 px-6 text-left whitespace-nowrap">
            <div className="flex items-center">
             <div className="mr-2">
              {
               //loading the image
               patients.avatar ? (
                <img className="w-8 h-8 rounded-full" src={patients.avatar} alt="" />
               ) : (
                <div>
                 <h1>loading...</h1>
                </div>
               )
              }
             </div>
             <span className="font-medium">
              {patients.name.firstName}
              {patients.name.LastName}
             </span>
            </div>
           </td>
           <td className="py-3 px-6 ">
            <div className="flex items-center text-center">
             <div className="mr-2"></div>
             <span>{patients.user.email}</span>
            </div>
           </td>
           <td className="py-3 px-6 text-center">
            <div className="flex items-center justify-center">
             <span>
              {
               //createdAt
               patients.user.createdAt.toString().substring(0, 10).split('-').reverse().join('-')
              }
             </span>
            </div>
           </td>
           <td className="py-3 px-6 text-center">
            <div className="flex items-center justify-center">
             <span>{patients.mobile}</span>
            </div>
           </td>
           <td className="py-3 px-6 text-center">
            <div className="flex items-center justify-center">
             <span>{patients.date.toString().substring(0, 10).split('-').reverse().join('-')}</span>
            </div>
           </td>

           <td className="py-3 px-6 text-center">
            <div className="flex item-center justify-center mt-3 ">
             <div className={'w-4 mr-2  transform hover:text-purple-500 hover:scale-110'}>
              <Link
               //
               to={`/admin/ViewPatient/${patients._id}`}
               className="w-4 mr-2 transform text-cyan-400 hover:text-cyan-400 hover:scale-150"
              >
               <FiEye />
              </Link>
             </div>

             <div className={'w-4 mr-2 transform hover:text-purple-500 hover:scale-110'}>
              <RiDeleteBin5Line
               onClick={() => {
                deletepatients(patients._id)
               }}
              />
             </div>
            </div>
           </td>
          </tr>
         </tbody>
        )
       })}
      </table>
     )}
    </div>
   </div>
   <div className="flex justify-center items-center mt-4  space-x-4">
    <div className="   rounded-full text-center py-2">
     <BsArrowLeftCircleFill
      className={
       currentPage === 1 ? 'text-gray-300 text-xl cursor-not-allowed' : 'text-cyan-300 text-xl cursor-pointer '
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
       currentPage === totalPages ? 'text-gray-300 text-xl cursor-not-allowed' : 'text-cyan-300 text-xl cursor-pointer '
      }
      onClick={handleNextClick}
     />
    </div>
   </div>
  </div>
 )
}

export default PatientList
