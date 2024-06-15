import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useTable, usePagination } from 'react-table'
import saveAs from 'file-saver'
import { useLocation, useNavigate } from 'react-router-dom'
import { useLogIN } from '../../../ContextLog'
import { patient } from '../../types'
import Loder from '../../tools/Loder'
import Alert from '../../tools/Alert'

const ViewPatient = () => {
 const {
  logPatient,

  Profile,
  setProfile,

  dark,
  setdark,
 } = useLogIN()
 let { id } = useParams()
 console.log('🚀 ~ file: ViewPatient.tsx ~ line 48 ~ ViewPatient ~ id', id)

 const [patient, setpatient] = React.useState({
  _id: '',
  healthIDNumber: '',
  name: {
   firstName: '',
   middleName: '',
   LastName: '',
  },
  user: {
   email: '',
   password: '',
   createdAt: '',
  },
  mobile: 0,
  address: {
   building: '',
   city: '',
   street: '',
   district: '',
   state: '',
   zipCode: 0,
  },
  date: '',
  bloodGroup: '',
  weight: 0,
  height: 0,
  diseaseList: [
   {
    disease: '',
    YearRound: 0,
   },
  ],
  allergyList: [
   {
    allergy: '',
    yearRound: 0,
   },
  ],
  medicationList: [
   {
    medication: '',
    yearRound: 0,
   },
  ],
  contactPerson: {
   name: {
    firstName: '',
    middleName: '',
    LastName: '',
   },
   mobile: 0,
   email: '',
   relation: '',
   age: '',
   address: {
    building: '',
    city: '',
    zipCode: 0,
    street: '',
    district: '',
    state: '',
   },
  },
 })

 const [error, setError] = React.useState<boolean>(false)
 const [Loading, setLoading] = React.useState<boolean>(true)
 const [prescriptions, setPrescriptions] = React.useState<any>([])

 useEffect(() => {
  setLoading(true)
  axios
   .get(`http://localhost:3000/doctor/patient/${id}`)
   .then((res) => {
    setpatient(res.data)

    setLoading(false)
   })

   .catch((err) => {
    console.log(err)
    setError(true)
    setLoading(false)
   })
 }, [id])

 return (
  <>
   {Loading ? (
    <Loder />
   ) : (
    <div
     className=""
     style={{
      backgroundColor: dark ? '#000' : 'white',
      color: dark ? 'white' : 'black',
      boxShadow: dark ? '0px 0px 10px 0px rgb(103 232 249)' : '0px 0px 10px 0px #ccc',
     }}
    >
     <div className="md:hidden ">{/* <Alert /> */}</div>
     <div className="md:p-16 p-9 md:mx-6 ml-12 ">
      <div
       style={{
        backgroundColor: dark ? '#000' : 'white',
        color: dark ? 'white' : 'black',
        boxShadow: dark ? '0px 0px 10px 0px rgb(103 232 249)' : '0px 0px 10px 0px rgb(103 232 249)',
       }}
       className="md:p-8 shadow mt-14 p-2 "
      >
       <div className={'grid grid-cols-1 md:grid-cols-2 my-6  '}>
        <div className="">
         <h1
          className="
                  text-xl font-bold  tracking-tight  -mt-5
                  "
         >
          patient Status :
         </h1>
        </div>

        <div className="relative">
         {' '}
         {/* <div className="   absolute inset-x-0 bottom-80    md:bottom-9  md:top-0  sm:-mt-32 flex items-center justify-center text-indigo-500">
          <img
           src={patient.avatar}
           alt="avatar"
           className="object-cover md:h-44 md:w-44 w-24 h-24  shadow-2xl rounded-full border-2 border-dotted border-cyan-300"
          />
         </div> */}
        </div>
       </div>
       <div
        className=" border-t-4 border-cyan-400   grid  grid-cols-1
                 
              xl:grid-cols-3 mt-7 "
       >
        <div
         style={{
          boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
         }}
         className=" mx-4  my-3  rounded-2xl  
                 p-4"
        >
         <h1 className="font-bold text-xl leading-8 my-1 text-cyan-400">
          {patient.name.firstName} {patient.name.middleName}{' '}
         </h1>

         <ul className="   py-2 px-3 mt-3 divide-y rounded shadow-sm">
          <li className="flex items-center py-3">
           <span>Status</span>
           <span className="ml-auto">
            <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
           </span>
          </li>
          <li className="flex items-center py-3">
           <span>Member since</span>
           <span className="ml-auto">{patient.user.createdAt.split('T')[0].split('-').reverse().join('-')}</span>
          </li>
         </ul>
        </div>
        <div
         style={{
          boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
         }}
         className=" p-8 my-3 col-span-2 rounded-2xl  
                  shadow-lg  "
        >
         <div className="flex items-center space-x-2 font-bold  leading-8">
          <span className=" text-2xl mb-5 text-cyan-400 ">About</span>
         </div>
         <div className="">
          <div className="grid md:grid-cols-2 text-sm">
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">First Name</div>
            <div className="px-4 py-2">{patient.name.firstName}</div>
           </div>
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">Last Name</div>
            <div className="px-4 py-2">{patient.name.LastName}</div>
           </div>
           <div className="grid grid-cols-2 ">
            <div className="px-4 py-2 font-bold">Health ID Number:</div>
            <div className="px-4 py-2">{patient.healthIDNumber}</div>
           </div>
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">Gender</div>
            <div className="px-4 py-2">Female</div>
           </div>
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">Contact No.</div>
            <div className="px-4 py-2">{patient.mobile}</div>
           </div>
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">Current Address</div>
            <div className="px-4 py-2">{patient.address.city}</div>
           </div>
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">{patient.address.district}</div>
            <div className="px-4 py-2">{patient.address.state}</div>
           </div>
           <div className="flex items-center justify-between">
            <div className="px-4 py-2 font-bold">Email.</div>
            <div
             className="py-2 px-4 md:mr-11
                          mr-2
                      
                        "
            >
             {patient.user.email}
            </div>
           </div>
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">Birthday</div>
            <div className="px-4 py-2">{patient.date.split('T')[0].split('-').reverse().join('-')}</div>
           </div>
          </div>
         </div>
        </div>
       </div>
       <div
        className="  grid
                  grid-cols-1
                  md:gap-5
               xl:grid-cols-3 mt-2 "
       >
        <div
         style={{
          boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
         }}
         className=" 
                  shadow-lg 
                  mx-2
                  md:mx-0
                    my-3  rounded-2xl  
                  "
        >
         <h1
          className="text-2xl
                      text-center 

                    font-bold text-cyan-400 my-6"
         >
          Emergency Contact
         </h1>
         <div className=" grid grid-cols-2 ">
          <div className="px-4 py-2 font-bold">Name</div>
          <div className="px-4 py-2">
           {patient.contactPerson.name.firstName}
           <span className="font-semibold ml-1">{patient.contactPerson.name.LastName}</span>
          </div>

          <div className="px-4 py-2 font-bold">Contact No.</div>
          <div className="px-4 py-2">{patient.contactPerson.mobile}</div>
          <div className="px-4 py-2 font-bold">Email</div>
          <h4 className=" py-2  xl:text-base text-sm">{patient.contactPerson.email}</h4>

          <div className="px-4 py-2 font-bold">relation</div>
          <div className="px-4 py-2">{patient.contactPerson.relation}</div>

          <div className="px-4 py-2 font-bold">age</div>
          <div className="px-4 py-2">{patient.contactPerson.age.split('T')[0].split('-').reverse().join('-')}</div>

          <div className="px-2 py-2 font-bold">Address</div>
          <div className=" py-2 font-semibold ">{patient.contactPerson.address.city}</div>
         </div>
        </div>
        <div
         style={{
          boxShadow: dark ? '0px 0px 01px 0px #cccc ' : '0px 0px 10px 0px  #ccc',
         }}
         className=" md:p-8 my-3 col-span-2 rounded-2xl
                  mx-2
                  shadow-lg  "
        >
         <h1
          className=" text-2xl mb-5
                      text-center
                      md:text-left

                      font-bold
                  md:my-6
                     text-cyan-400 "
         >
          Medical History
         </h1>
         <div className="grid grid-rows-2">
          <div className="col-span-3 ">
           <div className="grid grid-cols-2">
            <div className="px-4 py-2 font-bold">Blood Group</div>
            <div className="px-4 py-2">{patient.bloodGroup}</div>
            <div className="px-4 py-2 font-bold">Height</div>
            <div className="px-4 py-2">
             {patient.height}
             <span className="font-semibold">cm</span>
            </div>
            <div className="px-4 py-2 font-bold">Weight</div>
            <div className="px-4 py-2">
             {patient.weight}
             <span className="font-semibold">kg</span>
            </div>
           </div>
          </div>
          <div className="col-span-3 ">
           <div
            className=" grid 
                          lg:grid-cols-3
                        grid-cols-2
                      shadow-md
                        rounded-lg
                        md:my-2
                        md:gap-11
                        gap-0
                        
                      "
           >
            <div>
             <h1 className="text-center text-xl text-cyan-400 font-bold">Allergies:</h1>
             {patient.allergyList.length > 0 ? (
              <div className="mx-auto p-4  ">
               {patient.allergyList.filter((allergy) => allergy.allergy !== '' && allergy.allergy !== null).length >
               0 ? (
                patient.allergyList
                 .filter((allergy) => allergy.allergy !== '' && allergy.allergy !== null)
                 .map((allergy) => {
                  return (
                   <div
                    key={allergy.allergy}
                    className="px-4 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none"
                   >
                    {allergy.allergy}
                   </div>
                  )
                 })
               ) : (
                <p className="text-center font-medium">No Allergies Recorded</p>
               )}
              </div>
             ) : (
              <p className="text-center font-medium">No Allergies Recorded</p>
             )}
            </div>
            <div>
             {' '}
             <h1 className="text-center text-xl text-cyan-400 font-bold">Medications:</h1>
             {patient.medicationList.length > 0 ? (
              <div className="mx-auto p-4  ">
               {patient.medicationList.filter(
                (medication) => medication.medication !== '' && medication.medication !== null,
               ).length > 0 ? (
                patient.medicationList
                 .filter((medication) => medication.medication !== '' && medication.medication !== null)
                 .map((medication) => {
                  return (
                   <div
                    key={medication.medication}
                    className="px-4 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none"
                   >
                    {medication.medication}
                   </div>
                  )
                 })
               ) : (
                <p className="text-center font-medium">No medication Recorded</p>
               )}
              </div>
             ) : (
              <p className="text-center font-medium">No medication Recorded</p>
             )}
            </div>
            <div>
             <h1 className="text-center text-xl text-cyan-400 font-bold">Diseases:</h1>
             {patient.diseaseList.length > 0 ? (
              <div className="mx-auto p-4  ">
               {patient.diseaseList.filter((disease) => disease.disease !== '' && disease.disease !== null).length >
               0 ? (
                patient.diseaseList
                 .filter((disease) => disease.disease !== '' && disease.disease !== null)
                 .map((disease) => {
                  return (
                   <div
                    key={disease.disease}
                    className="px-4 py-1 m-1 text-center text-xs font-semibold text-white uppercase transition-all duration-150 ease-linear bg-red-500 rounded-full shadow outline-none focus:outline-none"
                   >
                    {disease.disease}
                   </div>
                  )
                 })
               ) : (
                <p className="text-center font-medium">No disease Recorded</p>
               )}
              </div>
             ) : (
              <p className="text-center font-medium">No disease Recorded</p>
             )}
            </div>
           </div>
          </div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   )}
  </>
 )
}

export default ViewPatient
