import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { useLogIN } from '../../../ContextLog'
import { useNavigate } from 'react-router-dom'

import Loder from '../../tools/Loder'

const Edit = () => {
 const { id } = useParams()
 const {
  logPatient,

  Profile,
  setProfile,

  dark,
  setdark,
 } = useLogIN()

 const [formData, setFormData] = useState({
  name: {
   firstName: '',
   middleName: '',
   lastName: '',
  },
  email: '',
  password: '',
  role: '',

  user: '',
  phoneNumber: '',
  Hospital: '',
  HospitalAddress: {
   city: '',
   building: '',
   state: '',
   ZipCode: '',
   Country: '',
  },

  specialty: '',
  degree: '',
  experience: '',
  date: '',
  bloodGroup: '',
  Gender: '',
  weight: '',
  height: '',
 })
 const [success, setSuccess] = useState(false)
 const [error, setError] = React.useState(false)
 const [loading, setLoading] = React.useState(true)

 const Navigate = useNavigate()

 useEffect(() => {
  setLoading(true)
  axios
   .get(`http://localhost:3000/admin/doctor/${id}`, {
    headers: {
     'Content-Type': 'application/json',
     Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
   })
   .then((res) => {
    setFormData(res.data)
    setLoading(false)
   })
   .catch((err) => {
    console.log(err)
    setError(true)
    setLoading(false)
   })
 }, [id])

 const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  setLoading(true)
  axios
   .put(
    `http://localhost:3000/admin/doctor/${id}`,
    {
     ...formData,
    },
    {
     headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
     },
    }
   )
   .then((res) => {
    setSuccess(true)
    setLoading(false)
    setTimeout(() => Navigate(`/admin/ViewDr/${res.data._id}`), 2000)
   })
   .catch((err) => {
    console.log(err)
    setError(true)
    setLoading(false)
   })
 }

 return (
  <>
   {/* show success message after update */}
   {success && (
    <div className="bg-green-500 text-white py-2 px-4 rounded-md my-2 flex flex-col items-center justify-center">
     Your information has been updated
    </div>
   )}
   {loading ? (
    <Loder />
   ) : (
    <div
     style={{
      backgroundColor: dark ? '#000' : 'white',
      color: dark ? 'white' : 'black',
     }}
     className="
    
      "
    >
     <div
      style={{
       backgroundColor: dark ? '#000' : 'white',
       color: dark ? 'white' : 'black',
      }}
      className="flex flex-col items-center justify-center min-h-screen py-2"
     >
      {
       //error
       error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
         <strong
          className="
                  font-bold
                  
                  "
         >
          Error!
         </strong>
         <span className="block sm:inline">{error}</span>
        </div>
       ) : (
        <form
         className="
                      w-full  lg:max-w-4xl
                    
                      md:max-w-2xl
                     
                     sm:ml-28
                     ml-14
                    
                      
                      sm:max-w-xl

                      shadow-cyan-300 
           shadow-md rounded px-8 pt-6 pb-8 mb-4 
                "
        >
         <h1 className="text-3xl font-bold text-center pt-4 mb-5"></h1>
         <div
          className=" grid lg:grid-cols-4
                        md:grid-cols-3
                        grid-cols-1
                         mx-16
                     sm:gap-6 "
         >
          <label className="block font-bold text-lg sm:mb-2" htmlFor="name">
           Name
          </label>
          <input
           className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 md:py-1 px-2 leading-tight focus:outline-none"
           type="name"
           name="name"
           id="name"
           value={formData.name.firstName}
           onChange={(e) =>
            setFormData({
             ...formData,
             name: { ...formData.name, firstName: e.target.value },
            })
           }
          />
          <input
           className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
           type="text"
           name="name"
           id="name"
           value={formData.name.middleName}
           onChange={(e) =>
            setFormData({
             ...formData,
             name: {
              ...formData.name,
              middleName: e.target.value,
             },
            })
           }
          />

          <input
           className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
           type="text"
           required
           name="name"
           id="name"
           value={formData.name.lastName}
           onChange={(e) =>
            setFormData({
             ...formData,
             name: { ...formData.name, lastName: e.target.value },
            })
           }
          />
         </div>
         <div className="grid md:grid-cols-2 md:gap-28 grid-cols-1 mx-16">
          <div className="flex items-center  my-5 ">
           <label className="font-bold text-lg " htmlFor="phone">
            Phone
           </label>
           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="phone"
            required
            id="phone"
            value={formData.phoneNumber}
            onChange={(e) =>
             setFormData({
              ...formData,
              phoneNumber: e.target.value,
             })
            }
           />
          </div>
          <div className="flex items-center  my-5 gap-4">
           <label className="font-bold text-lg " htmlFor="gender">
            Gender
           </label>
           <select
            style={{
             backgroundColor: dark ? '#000' : 'white',
             color: dark ? 'white' : 'black',
            }}
            required
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="gender"
            id="gender"
            value={formData.Gender}
            onChange={(e) =>
             setFormData({
              ...formData,
              Gender: e.target.value,
             })
            }
           >
            <option
             className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
             value=""
            >
             Select
            </option>
            <option
             className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
             value="male"
            >
             male
            </option>
            <option
             className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
             value="female"
            >
             female
            </option>
           </select>
          </div>
         </div>

         <div className="grid md:grid-cols-2 grid-cols-1 md:gap-28  mx-16">
          <div className="flex items-center  my-5 gap-4">
           <label className="font-bold text-lg " htmlFor="weight">
            Weight
           </label>
           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="weight"
            id="weight"
            value={formData.weight}
            onChange={(e) =>
             setFormData({
              ...formData,
              weight: e.target.value,
             })
            }
           />
           kg
          </div>
          <div className="flex items-center  my-5 gap-4">
           <label className="font-bold text-lg " htmlFor="height">
            Height
           </label>
           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="height"
            id="height"
            value={formData.height}
            onChange={(e) =>
             setFormData({
              ...formData,
              height: e.target.value,
             })
            }
           />
           cm
          </div>
         </div>

         <div className="grid md:grid-cols-2 md:gap-28  mx-16 ">
          <div className="mb-4">
           <label className="block font-bold text-lg mb-2" htmlFor="bloodGroup">
            bloodGroup
           </label>
           <select
            style={{
             backgroundColor: dark ? '#000' : 'white',
             color: dark ? 'white' : 'black',
            }}
            required
            name="bloodGroup"
            id="bloodGroup"
            value={formData.bloodGroup}
            onChange={(e) =>
             setFormData({
              ...formData,
              bloodGroup: e.target.value,
             })
            }
            className="block appearance-none w-full  border-b border-cyan-400 hover:border-cyan-400
            px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
           >
            <option value="">Select bloodGroup</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
           </select>
          </div>{' '}
          <div className="mb-4">
           <label className="block font-bold text-lg mb-2" htmlFor=" age">
            age
           </label>

           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            required
            type="date"
            name="age"
            id="age"
            value={formData.date.split('T')[0]}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
           />
          </div>
         </div>
         <div className="grid md:grid-cols-2 md:gap-8  mb-4  mx-16 mt-9">
          <div className="mb-4">
           <label
            htmlFor="speciality"
            className="
  mt-2
  text-lg
  font-bold

  "
           >
            Speciality
           </label>
           <select
            required
            style={{
             backgroundColor: dark ? '#000' : 'white',
             color: dark ? 'white' : 'black',
            }}
            name="speciality"
            id="speciality"
            value={formData.specialty}
            onChange={(e) =>
             setFormData({
              ...formData,
              specialty: e.target.value,
             })
            }
            className="block appearance-none w-full bg-inherit   border-b border-cyan-400 hover:border-cyan-400 
            px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
           >
            <option value="">Select Speciality</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Endocrinologist">Endocrinologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Oncologist">Oncologist</option>
            <option value="Ophthalmologist">Ophthalmologist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Psychiatrist">Psychiatrist</option>
            <option value="Pulmonologist">Pulmonologist</option>
            <option value="Rheumatologist">Rheumatologist</option>
            <option value="Urologist">Urologist</option>
           </select>
          </div>

          <div className="mb-4">
           <label className="block font-bold text-lg mb-2" htmlFor="experience">
            experience
           </label>
           <input
            required
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="experience"
            id="experience"
            value={formData.experience}
            onChange={(e) =>
             setFormData({
              ...formData,
              experience: e.target.value,
             })
            }
           />
          </div>
         </div>
         <div className="grid md:grid-cols-2 grid-cols-1 gap-8  mx-16  mb-4  mt-9">
          <div className="mb-5">
           <label className="block font-bold text-lg mb-2" htmlFor="address">
            Hospital
           </label>
           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            required
            name="address"
            id="address"
            value={formData.Hospital}
            onChange={(e) => setFormData({ ...formData, Hospital: e.target.value })}
           />
          </div>
          <div className="mb-5">
           <label className="block font-bold text-lg  mb-2" htmlFor="degree">
            Degree
           </label>
           <select
            required
            style={{
             backgroundColor: dark ? '#000' : 'white',
             color: dark ? 'white' : 'black',
            }}
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            name="degree"
            id="degree"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
           >
            <option value="MBBS">MBBS</option>
            <option value="MD">MD</option>
            <option value="MS">MS</option>
            <option value="MDS">MDS</option>
            <option value="MCh">MCh</option>
            <option value="DM">DM</option>
            <option value="DNB">DNB</option>
            <option value="BDS">BDS</option>
            <option value="BHMS">BHMS</option>
            <option value="BAMS">BAMS</option>
            <option value="BSc">BSc</option>
            <option value="BPT">BPT</option>
            <option value="BPharm">BPharm</option>
           </select>
          </div>
         </div>
         <div>
          <label className="block font-bold text-lg ml-14 sm:ml-6" htmlFor="address">
           HospitalAddress
          </label>
         </div>
         <div className="grid md:grid-cols-5 gap-8  mb-4   mx-16 mt-9">
          <div>
           <label className="block font-bold text-lg mb-2" htmlFor="address">
            Street
           </label>
           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="address"
            id="address"
            required
            value={formData.HospitalAddress.city}
            onChange={(e) =>
             setFormData({
              ...formData,
              HospitalAddress: {
               ...formData.HospitalAddress,
               city: e.target.value,
              },
             })
            }
           />
          </div>
          <div>
           <label className="block font-bold text-lg mb-2" htmlFor="address">
            City
           </label>

           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="address"
            id="address"
            required
            value={formData.HospitalAddress.building}
            onChange={(e) =>
             setFormData({
              ...formData,
              HospitalAddress: {
               ...formData.HospitalAddress,
               building: e.target.value,
              },
             })
            }
           />
          </div>
          <div>
           <label className="block font-bold text-lg mb-2" htmlFor="address">
            Building
           </label>
           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="address"
            required
            id="address"
            value={formData.HospitalAddress.state}
            onChange={(e) =>
             setFormData({
              ...formData,
              HospitalAddress: {
               ...formData.HospitalAddress,
               state: e.target.value,
              },
             })
            }
           />
          </div>
          <div>
           <label className="block font-bold text-lg mb-2" htmlFor="address">
            Country
           </label>

           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            name="address"
            id="address"
            required
            value={formData.HospitalAddress.Country}
            onChange={(e) =>
             setFormData({
              ...formData,
              HospitalAddress: {
               ...formData.HospitalAddress,
               Country: e.target.value,
              },
             })
            }
           />
          </div>
          <div>
           <label className="block font-bold text-lg mb-2" htmlFor="address">
            ZipCode
           </label>

           <input
            className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            name="ZipCode"
            required
            id="ZipCode"
            value={formData.HospitalAddress.ZipCode}
            onChange={(e) =>
             setFormData({
              ...formData,
              HospitalAddress: {
               ...formData.HospitalAddress,
               ZipCode: e.target.value,
              },
             })
            }
           />
          </div>
         </div>
        </form>
       )
      }
     </div>
     <div
      className="flex
        justify-center
        items-center
        mt-10"
     >
      <button
       className="bg-cyan-400 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
       type="button"
       onClick={handleSubmit}
      >
       Update
      </button>
      <div className="my-11"></div>
      {loading ? <Loder /> : null}
     </div>
    </div>
   )}
  </>
 )
}

export default Edit
