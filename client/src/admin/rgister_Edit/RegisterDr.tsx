import { useLogIN } from '../../../ContextLog'

import Loder from '../../tools/Loder'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './SideNavigate.css'
import { useNavigate } from 'react-router-dom'
import img from '../../assets/Login.png'

const RegisterDr = () => {
 const Navigate = useNavigate()
 const [step, setStep] = useState(1)

 const [success, setsuccess] = useState(false)

 const { dark } = useLogIN()
 const [loading, setLoading] = useState(false)
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
 const [error, setError] = useState('')

 const totalSteps = 2
 const currentStep = 1
 const progress = (currentStep / totalSteps) * 100

 // Proceed to next step
 const nextStep = () => {
  //
  setStep(step + 1)
 }
 // Create a mutable ref object to store the form data
 const formDataRef = useRef(formData)

 // Use the useEffect hook to update the value of the ref object
 // whenever the form data changes
 useEffect(() => {
  formDataRef.current = formData
 }, [formData])

 // Update the form data when the user goes back a step
 const prevStep = () => {
  setFormData(formDataRef.current)
  setStep(step - 1)
 }

 // Handle fields change
 const handleChange = (input) => (e) => {
  setFormData({ ...formData, [input]: e.target.value })
 }

 // Handle form submission
 const handleSubmit = async (e: { preventDefault: () => void }) => {
  setLoading(true)
  e.preventDefault()

  const {
   name,
   email,
   password,
   role,

   user,
   Hospital,
   HospitalAddress,
   date,
   phoneNumber,
   bloodGroup,
   degree,
   specialty,
   experience,
   Gender,
   weight,
   height,
  } = formData

  if (step === 1) {
   setLoading(true)

   // Check if email and password are not empty
   if (!name || !email || !password || !role) {
    setError('Please fill in all fields')
    setTimeout(() => setError(''), 2000)
    setLoading(false)
    return
   }
   // Check if the user has already been registered
   if (formData.user) {
    // If the user has already been registered, don't register them again
    setStep(2)
    setLoading(false)
    return
   }

   try {
    const res = await axios.post('http://localhost:3000/admin/register-user', {
     name,
     email,
     password,
     role,
    })

    setStep(2)
    setFormData({ ...formData, user: res.data.user._id })

    if (role === 'admin') {
     // reducreat to the step 3
     setStep(3)
    }

    setLoading(false)
   } catch (error) {
    //@ts-ignore
    console.log('Error: ', error.response.data)
    //@ts-ignore
    setError(error.response.data)
    setTimeout(() => setError(''), 2000)
    setLoading(false)
   }
  } else if (step === 2) {
   setTimeout(() => {
    setsuccess(true)
   }, 2000)

   try {
    if (
     !formData.name.firstName ||
     !formData.name.lastName ||
     !formData.Hospital ||
     !formData.HospitalAddress.city ||
     !formData.phoneNumber ||
     !formData.bloodGroup ||
     !formData.degree ||
     !formData.specialty ||
     !formData.experience
    ) {
     setError('Please fill in all fields')
     setTimeout(() => setError(''), 2000)
     setLoading(false)
    }

    await axios.post('http://localhost:3000/admin/register-dr', {
     user,
     name: name,
     Hospital: Hospital,
     HospitalAddress: HospitalAddress,
     date: date,
     phoneNumber: phoneNumber,
     bloodGroup: bloodGroup,
     degree: degree,
     specialty: specialty,
     experience: experience,
     Gender: Gender,
     weight: weight,
     height: height,
    })
    setStep(3)
    setLoading(false)
    console.log('====================================')
    console.log('user', user)
    console.log('====================================')

    // Navigate to the appropriate route based on the user's role
   } catch (error) {
    //@ts-ignore
    console.log('Error: ', error.response.data)
    //@ts-ignore
    setError(error.response.data)
    setTimeout(() => setError(''), 2000)
    setLoading(false)
   }
  }
 }

 // Render the form based on the current step
 const renderForm = () => {
  if (step === 1) {
   return (
    <div
     className={`${
      dark ? 'bg-black' : 'bg-white'
      //color
     } ${dark ? 'text-white' : 'text-black'}
        ${
         //font
         dark ? 'font-bold' : 'font-normal'
        }
          grid grid-cols-1 card  h-screen ml-10
          `}
    >
     <div
      className={`
        ${
         //font
         dark ? 'font-bold' : 'font-normal'
        }
        flex flex-col justify-center items-center mx-12    `}
     >
      <div className="w-full glass-object    ">
       <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-black">Register</h1>
        <p className="text-md font-bold  text-black">Please fill in this form to create an account!</p>
       </div>

       {
        //error
        error ? (
         <div className="bg-red-400 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong
           className="
                  font-bold
                  
                  "
          >
           Error!
          </strong>
          <span className="block sm:inline">{error}</span>
         </div>
        ) : null
       }
      </div>

      <form
       className="
            w-full max-w-sm
            
            mx-auto
            mt-10
            rounded-lg
            shadow-xl
            overflow-hidden
            p-8
            border-cyan-300
            border-2
          
            "
       onSubmit={handleSubmit}
      >
       <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
         Email
        </label>
        <input
         className={`appearance-none bg-transparent placeholder:font-semibold  border-b-2 border-cyan-300  w-full  mr-3 py-1 px-2 leading-tight focus:outline-none
                ${error ? 'border-red-500 ' : ''}
                `}
         type="email"
         name="email"
         value={formData.email}
         onChange={handleChange('email')}
         placeholder="
                  Enter your Email 
                  "
         required
        />
       </div>
       <div className="mb-4">
        <label className="block  text-sm font-bold mb-2" htmlFor="password">
         Password
        </label>
        <input
         className={`appearance-none bg-transparent placeholder:font-semibold  border-b-2 border-cyan-300 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none
                ${error ? 'border-red-500  ' : ''}
                `}
         type="password"
         name="password"
         value={formData.password}
         onChange={handleChange('password')}
         placeholder="
                  Enter your Password
                  "
         required
        />
       </div>
       <div className="mb-4 flex  font-bold">
        <label className="block    mr-4" htmlFor="role">
         Role:
        </label>
        <label className="inline-flex items-center">
         <input
          type="checkbox"
          name="role"
          value="admin"
          checked={formData.role === 'admin'}
          onChange={handleChange('role')}
         />
         <span className="ml-2">Admin</span>
        </label>

        <label className="inline-flex items-center ml-4">
         <input
          type="checkbox"
          name="role"
          value="doctor"
          checked={formData.role === 'doctor'}
          onChange={handleChange('role')}
         />
         <span className="ml-2">Dr</span>
        </label>
       </div>
       <div className="flex items-center justify-between mx-24">
        {formData.email && formData.password ? (
         <button
          onClick={handleSubmit}
          className="bg-cyan-400 hover:bg-green-400  text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
          type="submit"
         >
          Next
         </button>
        ) : (
         <button
          className="bg-gray-400 text-white font-bold py-2 px-9 rounded focus:outline-none focus:shadow-outline"
          type="submit"
         >
          Next
         </button>
        )}
        {success && <p>{success}</p>}
       </div>
      </form>
     </div>
    </div>
   )
  } else if (step === 2) {
   return (
    <>
     {loading ? (
      <Loder />
     ) : (
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
          <h1 className="text-3xl font-bold text-center pt-4 mb-5">Register</h1>
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
              name: {
               ...formData.name,
               firstName: e.target.value,
              },
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
              name: {
               ...formData.name,
               lastName: e.target.value,
              },
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
             required
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
             required
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
             onChange={(e) =>
              setFormData({
               ...formData,
               Hospital: e.target.value,
              })
             }
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

       <div
        className="flex
        justify-center
        items-center
        space-x-4
        "
       >
        <button
         className="bg-cyan-400 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
         type="button"
         onClick={prevStep}
        >
         Previous
        </button>

        <button
         className="bg-cyan-400 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
         type="button"
         onClick={handleSubmit}
        >
         Submit
        </button>
        <div className="my-11"></div>
        {loading ? <Loder /> : null}
       </div>
      </div>
     )}
    </>
   )
  } else if (step === 3) {
   return (
    <div
     style={{
      backgroundColor: dark ? '#000' : '#f3f4f6',
      color: dark ? '#f3f4f6' : '#000',
     }}
     className="flex
        justify-center
        h-screen
        items-center
       "
    >
     <div className="flex flex-col justify-center items-center ml-7">
      <img src={img} className="md:w-80 w-56" alt="success" />
      <div className="flex flex-col justify-center items-center ">
       <h1 className="md:text-3xl font-bold text-gray-700">Registration Successful</h1>
       <h1 className="md:text-3xl text-lg mx-auto  font-bold text-cyan-300">Please send the Email and</h1>
       <h1 className="md:text-3xl    md:font-bold text-cyan-300">
        the password to the
        {
         // show the dr or the admin
         formData.role === 'admin' ? (
          <span className="text-cyan-400"> Admin </span>
         ) : (
          <span className="text-cyan-400"> Doctor </span>
         )
        }
        to login
       </h1>

       <div className="my-3 md:text-2xl ">
        {
         <>
          <span className="">
           Email:
           {formData.email}
          </span>
          <br />
          Password:
          <span className=""> {formData.password} </span>
         </>
        }
       </div>
       <div
        className="flex
        justify-center
        items-center
        space-x-4
        "
       >
        <button
         className="bg-cyan-300 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
         type="button"
         onClick={
          // show the dr or the admin
          formData.role === 'admin' ? () => Navigate('/admin') : () => Navigate('/admin/doctorList')
         }
        >
         list
        </button>

        <button
         className="bg-cyan-300 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
         type="button"
         onClick={() => Navigate('/admin/dashboard')}
        >
         Home
        </button>
       </div>
      </div>
     </div>
    </div>
   )
  }
 }

 return <div>{renderForm()}</div>
}

export default RegisterDr
