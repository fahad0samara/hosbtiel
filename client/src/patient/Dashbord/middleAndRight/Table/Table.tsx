import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'
import { useLogIN } from '../../../../../ContextLog'
import './Table.css'
import FileSaver from 'file-saver'
const Table = () => {
 const [prescriptions, setPrescriptions] = React.useState<any>([])
 const [error, setError] = useState(null)
 const { Patient, dark } = useLogIN()

 const [loading, setLoading] = useState(false)
 const [pagination, setPagination] = useState({
  page: 1,
  limit: 5,
  totalPages: 0,
 })

 useEffect(() => {
  setLoading(true)
  if (Patient) {
   axios
    .get(`http://localhost:3000/user/Prescription/${Patient._id}`, {
     params: {
      page: pagination.page,
      limit: pagination.limit,
     },
    })
    .then((res) => {
     setPrescriptions(res.data.prescription)
     setLoading(false)

     setPagination({
      ...pagination,
      totalPages: res.data.pagination.totalPages,
      page: pagination.page,
     })
     setLoading(false)
    })

    .catch((err) => {
     console.log(err)
     setError(err.response)
     setLoading(false)
    })
  }
 }, [Patient])

 const downloadPrescription = async (prescriptionId) => {
  setLoading(true)
  console.log(prescriptionId)
  try {
   const res = await axios.get(`http://localhost:3000/user/${Patient._id}/prescriptions/${prescriptionId}/download`, {
    responseType: 'arraybuffer',
   })
   FileSaver.saveAs(new Blob([res.data], { type: 'application/pdf' }), `Prescription ${prescriptionId}.pdf`)
   setLoading(false)
  } catch (error) {
   setLoading(false)
   console.log(error)
  }
 }
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

 //downloadPrescription

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

 return (
  <div>
   {loading ? (
    <div className="flex justify-center items-center">
     <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
    </div>
   ) : prescriptions && prescriptions.length > 0 ? (
    <>
     <table className="mx-auto ml-20 md:ml-10 lg:ml-4 table">
      <caption className="text-cyan-300 font-bold tablecaption "> Prescription History</caption>
      <thead>
       <tr>
        <th scope="col">Dr Name</th>
        <th scope="col">Refills</th>
        <th scope="col">Dosage</th>
        <th scope="col">Duration</th>
        <th scope="col">Frequency</th>
        <th scope="col">Medication</th>
        <th scope="col">Notes</th>
        <th scope="col">Actions</th>
       </tr>
      </thead>
      <tbody>
       {prescriptions.map((prescription) => (
        <tr key={prescription._id}>
         <td data-label="Dr Name">{prescription.doctor.name.firstName}</td>
         <td data-label="Refills">{prescription.refills}</td>
         <td data-label="Dosage">{prescription.dosage}</td>
         <td data-label="Duration">{prescription.duration}</td>
         <td data-label="Frequency">{prescription.frequency}</td>
         <td data-label="Medication">{prescription.medication}</td>
         <td data-label="Notes">{prescription.notes}</td>
         <td data-label="downloadPrescription">
          {loading ? (
           <div className="flex justify-center items-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mb-4"></div>
           </div>
          ) : (
           <button
            className="bg-cyan-300 text-white rounded-md px-2 py-1"
            onClick={() => downloadPrescription(prescription._id)}
           >
            Download
           </button>
          )}
         </td>
        </tr>
       ))}
      </tbody>
     </table>
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
         currentPage === totalPages
          ? 'text-gray-300 text-xl cursor-not-allowed'
          : 'text-cyan-300 text-xl cursor-pointer '
        }
        onClick={handleNextClick}
       />
      </div>
     </div>
    </>
   ) : (
    <div>
     <h1 className="text-center text-cyan-300 font-bold">No Prescription History</h1>
    </div>
   )}
  </div>
 )
}

export default Table
