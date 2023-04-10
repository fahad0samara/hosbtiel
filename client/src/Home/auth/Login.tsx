import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogIN } from '../../../ContextLog'
import jwtDecode from 'jwt-decode'

const Login = () => {
 const { setProfile, setlogDr, setlogAdmin, setlogPatient, dark, setdark, setDoctor, setPatient } = useLogIN()

 const navigate = useNavigate()

 const [error, setError] = useState('')

 const [email, setemail] = useState('')
 const [password, setpassword] = useState('')
 const [erors, seterors] = useState({
  email: '',
  password: '',
 })

 const [isSubmitting, setisSubmitting] = useState(false)
 const [isLoading, setisLoading] = useState(false)

 const HandelLogin = async (e: { preventDefault: () => void }) => {
  e.preventDefault()
  if (email === '' || password === '' || email === null || password === null) {
   setError(
    email ? (password ? 'Please fill all the fields' : 'Please enter your password') : 'Please enter your email',
   )
   return
  }

  setisLoading(true)

  try {
   const response = await axios.post('http://localhost:3000/user/loginUser', {
    email,
    password,
   })
   localStorage.setItem('token', response.data.token)
   sessionStorage.setItem('token', response.data.token)
   localStorage.setItem('role', response.data.user.role)
   localStorage.setItem('authenticated', 'true')
   const decoded = jwtDecode(response.data.token)

   setisLoading(false)
   if (response.data.user.role === 'admin') {
    setisLoading(false)
    setlogAdmin(true)
    setlogPatient(false)
    setisLoading(false)
    setProfile(response.data.user)
    navigate('/admin/dashboard')

    setisLoading(false)
   } else if (response.data.user.role === 'patient') {
    try {
     setlogPatient(true)
     setlogDr(false)
     setlogAdmin(false)
     setisLoading(false)
     setProfile(response.data.user)
     navigate('/patient/dashboard')

     // Use the user ID to query the patient collection
     const patientResponse = await axios.get(
      //@ts-ignore
      `http://localhost:3000/user/getPatient/${decoded.patientId}`,
     )

     setPatient(patientResponse.data)
     setisLoading(false)
    } catch (error) {
     console.log('Error while fetching patient: ', error)
     setisLoading(false)
    }
   } else if (response.data.user.role === 'doctor') {
    try {
     setlogDr(true)
     setlogPatient(false)
     setlogAdmin(false)
     setisLoading(false)
     setProfile(response.data.user)
     navigate('/doctor/dashboard')

     // Use the user ID to query the doctor collection
     const doctorResponse = await axios.get(
      //@ts-ignore
      `http://localhost:3000/doctor/doctors/${decoded.doctorId}`,
      {
       headers: {
        Authorization: `Bearer ${response.data.token}`,
       },
      },
     )

     setDoctor(doctorResponse.data)
     setisLoading(false)
    } catch (error) {
     setisLoading(false)
     console.log('Error while fetching doctor: ', error)
     setisLoading(false)
     setError(
      error.response.data === 'Invalid email or password' ? 'Invalid email or password' : 'Something went wrong',
     )
    }
   }
  } catch (error) {
   setisLoading(false)
   setError(error.response.data)

   console.log('Error while logging in: ', error.response.data)
  }
 }

 return (
  //   <div className="relative">
  //    <img
  //     src="https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
  //     className="absolute inset-0 object-cover w-full h-full"
  //     alt=""
  //    />
  //    <div className="relative bg-gray-900 bg-opacity-75">
  //     <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
  //      <div className="flex flex-col items-center justify-between xl:flex-row">
  //       <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
  //        <h2
  //         // dark mode

  //         className="max-w-lg mb-6 font-sans
  //                   text-white
  //                    text-3xl font-bold tracking-tight  sm:text-4xl sm:leading-none"
  //        >
  //         Emergency Department <br className="hidden md:block" />
  //         Ambulance Service{' '}
  //        </h2>
  //        <p
  //         className="max-w-xl mb-4 text-base
  //              text-sky-50
  //                  md:text-lg"
  //        >
  //         The Emergency Department of the Hippocrates Private Hospital is currently not in operation due to its
  //         restructuring. From 8:00 until 20:00
  //        </p>
  //        <a
  //         href="/"
  //         aria-label=""
  //         className="inline-flex items-center
  //                   bg-cyan-400
  //                   rounded-full
  //                   h-9 px-4
  //                   tracking-wide
  //                   text-white
  //                   transition
  //                   duration-200
  //                   transform
  //                   hover:bg-cyan-500
  //                   focus:shadow-outline
  //                   focus:outline-none
  //                   "
  //        >
  //         Learn more
  //         <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
  //          <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
  //         </svg>
  //        </a>
  //       </div>
  //       <div className="w-full max-w-xl xl:px-10 xl:w-5/12">
  //        <div className=" rounded-2xl shadow-2xl drop-shadow-2xl shadow-sky-300 p-7 sm:p-12">
  //         <h3 className="mb-4 text-xl text-white font-semibold sm:text-center sm:mb-6 sm:text-2xl">Log in</h3>
  //         <form>
  //          <div className="mb-1 sm:mb-2">
  //           <label htmlFor="Email" className="inline-block text-sky-300 mb-1 font-black">
  //            Email
  //           </label>
  //           <input
  //            value={email}
  //            onChange={(e) => {
  //             setemail(e.target.value)
  //            }}
  //            placeholder="

  //                         Enter your Email
  //                         "
  //            required
  //            type="email"
  //            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
  //            id="Email"
  //            name="
  //                       Email
  //                         "
  //           />
  //          </div>
  //          <div className="mb-1 sm:mb-2">
  //           <label htmlFor="Password" className="inline-block text-sky-300 mb-1 font-black">
  //            Password
  //           </label>
  //           <input
  //            value={password}
  //            onChange={(e) => {
  //             setpassword(e.target.value)
  //            }}
  //            placeholder="
  //                         Enter your Password
  //                         "
  //            required
  //            type="Password"
  //            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
  //            id="Password"
  //            name="Password"
  //           />
  //          </div>
  //          <div className="mt-4 mb-2 sm:mb-4">
  //           <button
  //            //HandelLogin
  //            onClick={HandelLogin}
  //            type="submit"
  //            className="inline-flex bg-cyan-400 items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline
  //                         hover:bg-orange-400
  //                         hover:text-black
  //                         "
  //           >
  //            Log in
  //           </button>
  //          </div>
  //          {
  //           // error
  //          }
  //          {error && (
  //           <div className="text-red-500 text-center">
  //            <p>{error}</p>
  //           </div>
  //          )}

  //          <p className="text-xs  text-white sm:text-sm">We respect your privacy. Unsubscribe at any time.</p>
  //         </form>
  //        </div>
  //       </div>
  //      </div>
  //     </div>
  //    </div>
  //   </div>

  <div
   style={{
    backgroundColor: dark ? '#000' : 'white',
    color: dark ? 'white' : 'black',
   }}
   className=""
  >
   <div className="flex justify-center h-screen">
    <div
     className="hidden bg-cover lg:block lg:w-2/3"
     style={{
      backgroundImage: `url("https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")`,
     }}
    >
     <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
      <div>
       <h2 className="text-2xl font-bold  sm:text-3xl">Meraki UI</h2>

       <p className="max-w-xl mt-3 text-gray-300">
        The Emergency Department of the Hippocrates Private Hospital is currently not in operation due to its
        restructuring. From 8:00 until 20:00
       </p>
      </div>
     </div>
    </div>

    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
     <div className="flex-1">
      <div className="text-center">
       <div className="flex justify-center mx-auto">
        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
       </div>

       <p className="mt-3 ">Sign in to access your account</p>
      </div>

      <div className="mt-8">
       <form>
        <div>
         <label htmlFor="email" className="block mb-2 text-sm ">
          Email Address
         </label>
         <input
          required
          type="email"
          value={email}
          onChange={(e) => {
           setemail(e.target.value)
          }}
          name="email"
          id="email"
          placeholder="Enter your email address"
          className="block w-full px-4 py-2 mt-2  placeholder-gray-400 border border-gray-200 rounded-lg :border-cyan-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
         />
         {error && error.includes('email') && <span className="error">{error}</span>}
        </div>

        <div className="mt-6">
         <div className="flex justify-between mb-2">
          <label htmlFor="password" className="text-sm ">
           Password
          </label>
         </div>

         <input
          required
          value={password}
          onChange={(e) => {
           setpassword(e.target.value)
          }}
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
          className="block w-full px-4 py-2 mt-2  placeholder-gray-400 border border-gray-200 rounded-lg :border-cyan-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
         />
         {error && error.includes('password') && <span className="error">{error}</span>}
        </div>

        <div className="mt-4 mb-2 sm:mb-4">
         <button
          //HandelLogin
          onClick={HandelLogin}
          type="submit"
          className="inline-flex bg-cyan-400 items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline
                        hover:bg-orange-400
                        hover:text-black
                        "
         >
          Log in
         </button>
        </div>
       </form>

       <p className="mt-6 text-sm text-center text-gray-400">
        Don&#x27;t have an account yet?{' '}
        <a href="#" className="text-blue-500 focus:outline-none focus:underline hover:underline">
         Sign up
        </a>
        .
       </p>
      </div>
      <p className="text-xs   sm:text-sm">We respect your privacy. Unsubscribe at any time.</p>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Login
