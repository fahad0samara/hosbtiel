import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLogIN } from '../../../ContextLog'
import jwtDecode from 'jwt-decode'
//@ts-ignore
import img from '../../assets/miracle00.png'

const Login = () => {
 const { setProfile, setlogDr, setlogAdmin, setlogPatient, dark, setDoctor, setPatient } = useLogIN()

 const navigate = useNavigate()

 const [error, setError] = useState('')

 const [email, setemail] = useState('')
 const [password, setpassword] = useState('')
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

     setisLoading(false)
     setError(
      //@ts-ignore
      error.response.data === 'Invalid email or password' ? 'Invalid email or password' : 'Something went wrong',
     )
    }
   }
  } catch (error) {
   setisLoading(false)
   //@ts-ignore
   setError(error.response.data)
  }
 }

 return (
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
       <h2 className="text-2xl font-bold  sm:text-3xl text-white">miracle</h2>

       <p className="max-w-xl mt-3 text-gray-300 font-semibold">
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
        <img
         className=" h-42 w-32 rounded-full shadow-2xl
                                 shadow-cyan-200

                                 "
         src={img}
         alt=""
        />
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
          className={
           error && error.includes('email')
            ? 'block w-full px-4 py-2 mt-2  placeholder-gray-400 text-black border border-red-500 rounded-lg :border-cyan-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
            : 'block w-full px-4 py-2 mt-2  placeholder-gray-400  text-black border border-gray-200 rounded-lg :border-cyan-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
          }
         />
         {error && error.includes('email') && (
          <span className="text-center text-red-500 text-sm flex italic font-bold">{error}</span>
         )}
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
          className={
           error && error.includes('password')
            ? 'block w-full px-4 py-2 mt-2 text-black  border border-red-500 rounded-lg :border-cyan-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
            : 'block w-full px-4 py-2 mt-2 text-black  placeholder-gray-400 border border-gray-200 rounded-lg :border-cyan-300 focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40'
          }
         />
         {error && error.includes('password') && (
          <span className="text-center text-red-500 text-sm flex italic font-bold">{error}</span>
         )}
        </div>

        <div className="mt-4 mb-2 sm:mb-4">
         {
          // loading
          isLoading ? (
           <button
            type="submit"
            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline
                            focus:outline-none
hover:bg-cyan-600
                        hover:text-black
                        "
           >
            <svg
             className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
             xmlns="http://www.w3.org/2000/svg"
             fill="none"
             viewBox="0 0 24 24"
            >
             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            Loading
           </button>
          ) : (
           <button
            //HandelLogin
            onClick={HandelLogin}
            type="submit"
            className="inline-flex bg-cyan-300 items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline
                            focus:outline-none
                            hover:bg-cyan-600
                        
                        hover:text-black
                        italic
                        "
           >
            Log in
           </button>
          )
         }
        </div>
       </form>

       <p className="mt-6 text-sm text-center text-gray-400">
        Don&#x27;t have an account yet?{' '}
        <Link to="/Register" className="text-cyan-300 font-bold focus:outline-none focus:underline hover:underline">
         Sign up
        </Link>
        .
       </p>
      </div>
      <p className="text-xs   sm:text-sm text-center mt-5">We respect your privacy. Unsubscribe at any time.</p>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Login
