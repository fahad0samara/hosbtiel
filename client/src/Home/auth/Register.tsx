// import axios from "axios";
// import React, {useState, useEffect} from "react";
// import {Link, Outlet, useNavigate} from "react-router-dom";
// import {useLogIN} from "../../../ContextLog";
// const Register = () => {
//   const {setProfile, setLoading, setlogPatient, dark, setdark} = useLogIN();

//   const navigate = useNavigate();

//   const [error, setError] = useState(null);

//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");

//   const HandelLogin = async (e: {preventDefault: () => void}) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:3000/user/register-user",
//         {
//           email,
//           password,
//         }
//       );
//       setLoading(false);
//       setProfile(
//         response.data.user.role === "patient"
//           ? response.data.user
//           : response.data.user
//       );

//       navigate("/RegisterPatient");
//       console.log("====================================");
//       console.log(
//         "🚀 ~ file: RegisterAdmin.tsx ~ line 48 ~ HandelLogin ~ response",
//         response
//       );
//      console.log("====================================");
//     } catch (error) {

//       console.log('====================================');
//       console.log(
//         "🚀 ~ file: RegisterAdmin.tsx ~ line 48 ~ HandelLogin ~ error",
//         error
//       );
//       console.log('====================================');

//       setLoading(false);
//       setError(error.response);

//     }

//   };

//   return (
//     <div className="relative">
//       <img
//         src="https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
//         className="absolute inset-0 object-cover w-full h-full"
//         alt=""
//       />
//       <div className="relative bg-gray-900 bg-opacity-75">
//         <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
//           <div className="flex flex-col items-center justify-between xl:flex-row">
//             <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
//               <h2
//                 // dark mode

//                 className="max-w-lg mb-6 font-sans
//                 text-white
//                  text-3xl font-bold tracking-tight  sm:text-4xl sm:leading-none"
//               >
//                 Emergency Department <br className="hidden md:block" />
//                 Ambulance Service{" "}
//               </h2>
//               <p
//                 className="max-w-xl mb-4 text-base
//            text-sky-50
//                md:text-lg"
//               >
//                 The Emergency Department of the Hippocrates Private Hospital is
//                 currently not in operation due to its restructuring. From 8:00
//                 until 20:00
//               </p>
//               <a
//                 href="/"
//                 aria-label=""
//                 className="inline-flex items-center
//                 bg-cyan-400
//                 rounded-full
//                 h-9 px-4
//                 tracking-wide
//                 text-white
//                 transition
//                 duration-200
//                 transform
//                 hover:bg-cyan-500
//                 focus:shadow-outline
//                 focus:outline-none
//                 "
//               >
//                 Learn more
//                 <svg
//                   className="inline-block w-3 ml-2"
//                   fill="currentColor"
//                   viewBox="0 0 12 12"
//                 >
//                   <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
//                 </svg>
//               </a>
//             </div>
//             <div className="w-full max-w-xl xl:px-10 xl:w-5/12">
//               <div className=" rounded-2xl shadow-2xl drop-shadow-2xl shadow-sky-300 p-7 sm:p-12">
//                 <h3 className="mb-4 text-xl text-white font-semibold sm:text-center sm:mb-6 sm:text-2xl">
//                   Log in
//                 </h3>
//                 <form>

//                   <div className="mb-1 sm:mb-2">
//                     <label
//                       htmlFor="Email"
//                       className="inline-block text-sky-300 mb-1 font-black"
//                     >
//                       Email
//                     </label>
//                     <input
//                       value={email}
//                       onChange={e => {
//                         setemail(e.target.value);
//                       }}
//                       placeholder="

//                       Enter your Email
//                       "
//                       required
//                       type="email"
//                       className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
//                       id="Email"
//                       name="
//                     Email
//                       "
//                     />
//                   </div>

//                   <div className="mb-1 sm:mb-2">
//                     <label
//                       htmlFor="Password"
//                       className="inline-block text-sky-300 mb-1 font-black"
//                     >
//                       Password
//                     </label>
//                     <input
//                       value={password}
//                       onChange={e => {
//                         setpassword(e.target.value);
//                       }}
//                       placeholder="
//                       Enter your Password
//                       "
//                       required
//                       type="Password"
//                       className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
//                       id="Password"
//                       name="Password"
//                     />
//                   </div>
//                   <div className="mt-4 mb-2 sm:mb-4">
//                     <button
//                       //HandelLogin
//                       onClick={HandelLogin}
//                       type="submit"
//                       className="inline-flex bg-cyan-400 items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline
//                       hover:bg-orange-400
//                       hover:text-black
//                       "
//                     >
//                       Log in
//                     </button>
//                   </div>

//                   {
//                     // error
//                   }
//                   {error && (
//                     <div className="text-red-500 text-center">
//                       <p>{error}</p>
//                     </div>
//                   )}

//                   <p className="text-xs  text-white sm:text-sm">
//                     We respect your privacy. Unsubscribe at any time.
//                   </p>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Loder from "../../tools/Loder";
import {Link, useNavigate} from "react-router-dom";
import {useLogIN} from "../../../ContextLog";
import jwtDecode from "jwt-decode";
const RegisterDr = () => {
  const Navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [success, setsuccess] = useState(false);

  const {
    logPatient,
    Profile,
    setProfile,
    dark,
    setdark,
    setlogAdmin,
    setlogDr,
    setlogPatient,
    setPatient,
  } = useLogIN();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: {
      firstName: "",
      middleName: "",
      LastName: "",
    },
    email: "",
    password: "",
    role: "",

    user: "",
    mobile: "",

    address: {
      building: "",
      city: "",
      Street: "",
      district: "",
      state: "",
      ZipCode: "",
    },

    date: "",
    bloodGroup: "",
    Gender: "",
    weight: "",
    height: "",
    contactPerson: {
      name: {
        firstName: "",
        LastName: "",
      },
      mobile: "",
      email: "",
      relation: "",
      age: "",

      address: {
        building: "",
        city: "",
        Street: "",
        district: "",
        state: "",
        ZipCode: "",
      },
    },
  });
  const [error, setError] = useState("");

  const totalSteps = 2;
  const currentStep = 1;
  const progress = (currentStep / totalSteps) * 100;

  // Proceed to next step
  const nextStep = () => {
    //
    setStep(step + 1);
  };
  // Create a mutable ref object to store the form data
  const formDataRef = useRef(formData);

  // Use the useEffect hook to update the value of the ref object
  // whenever the form data changes
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // Update the form data when the user goes back a step
  const prevStep = () => {
    setFormData(formDataRef.current);
    setStep(step - 1);
  };

  // Handle fields change
  const handleChange = input => e => {
    setFormData({...formData, [input]: e.target.value});
  };

  // Handle form submission
  const handleSubmit = async (e: {preventDefault: () => void}) => {
    setLoading(true);
    e.preventDefault();

    const {
      name,
      email,
      password,
      user,
      address,
      date,
      mobile,
      bloodGroup,

      weight,
      height,
      contactPerson,
    } = formData;

    if (step === 1) {
      setLoading(true);

      // Check if email and password are not empty
      if (!email || !password) {
        setError("Please fill in all fields");
        setTimeout(() => setError(""), 2000);
        setLoading(false);
        return;
      }
      // Check if the user has already been registered
      if (formData.user) {
        // If the user has already been registered, don't register them again
        setStep(2);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          "http://localhost:3000/user/register-user",
          {
            email,
            password,
          }
        );

        setStep(2);
        setFormData({...formData, user: res.data.user._id});

        console.log("User registered successfully,", res);

        setLoading(false);
      } catch (error) {
        //@ts-ignore
        console.log("Error: ", error.response.data);
        //@ts-ignore
        setError(error.response.data);
        setTimeout(() => setError(""), 2000);
        setLoading(false);
      }
    } else if (step === 2) {
      setTimeout(() => {
        setsuccess(true);
      }, 2000);

      try {
        if (
          !formData.name.firstName ||
          !formData.name.LastName ||
          !formData.address.building ||
          !formData.address.Street ||
          !formData.address.district ||
          !formData.mobile ||
          !formData.bloodGroup
        ) {
          setError("Please fill in all fields");
          setTimeout(() => setError(""), 2000);
          setLoading(false);
        }

        const response0 = await axios.post(
          "http://localhost:3000/user/register-patient",
          {
            user,
            name: name,
            address: address,
            date: date,
            mobile: mobile,
            bloodGroup: bloodGroup,

            weight: weight,
            height: height,
            contactPerson,
          }
        );
        // chachk if the sucess true from the server
        if (response0.data.success) setsuccess(true);

        {
   setsuccess(true);

   console.log("Patient registered successfully,", response0);
   setLoading(false);

   const response = await axios.post("http://localhost:3000/user/loginUser", {
     email,
     password,
   });
   localStorage.setItem("token", response.data.token);
   const decoded = jwtDecode(response.data.token);

   setLoading(false);

   setlogPatient(true);
   setlogDr(false);
   setlogAdmin(false);
   setLoading(false);
   setProfile(response.data.user);
   Navigate("/patient/dashboard");

   // Use the user ID to query the patient collection
   const patientResponse = await axios.get(
     //@ts-ignore
     `http://localhost:3000/user/getPatient/${decoded.patientId}`
   );

   console.log("patientResponse", patientResponse.data._id);

   setPatient(patientResponse.data);
 }
      } catch (error) {
        console.log("Error while fetching patient: ", error);
      }

      setStep(3);

      setLoading(false);
    }
  };

  // Render the form based on the current step
  const renderForm = () => {
    if (step === 1) {
      return (
        <div
          className={`${
            dark ? "bg-black" : "bg-white"
            //color
          } ${dark ? "text-white" : "text-black"}
        ${
          //font
          dark ? "font-bold" : "font-normal"
        }
          grid grid-cols-3 card  h-screen
          `}
        >
          <img
            alt="Image"
            className="object-cover bottom-5 
            h-72 ml-32"
          />

          <div
            className={`
        ${
          //font
          dark ? "font-bold" : "font-normal"
        }
        flex flex-col justify-center items-center   `}
          >
            <div className="w-full glass-object    ">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-black">Register</h1>
                <p className="text-md font-bold  text-black">
                  Please fill in this form to create an account!
                </p>
              </div>

              {
                //error
                error ? (
                  <div
                    className="bg-red-400 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
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
                ${error ? "border-red-500 " : ""}
                `}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="
                  Enter your Email 
                  "
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block  text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className={`appearance-none bg-transparent placeholder:font-semibold  border-b-2 border-cyan-300 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none
                ${error ? "border-red-500  " : ""}
                `}
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange("password")}
                  placeholder="
                  Enter your Password
                  "
                  required
                />
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
          <img
            alt="Image"
            className="object-cover 
            object-center h-72 w-72

              "
          />
        </div>
      );
    } else if (step === 2) {
      return (
        <>
          {loading ? (
            <Loder />
          ) : (
            <div
              style={{
                backgroundColor: dark ? "#000" : "white",
                color: dark ? "white" : "black",
              }}
              className="flex flex-col items-center justify-center min-h-screen py-2"
            >
              {
                //error
                error ? (
                  <div
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                    role="alert"
                  >
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
                      w-full  max-w-3xl
                      shadow-cyan-300
                md:mx-28 shadow-md rounded px-8 pt-6 pb-8 mb-4 
                "
                  >
                    <h1 className="text-3xl font-bold text-center pt-4 mb-5">
                      Register
                    </h1>
                    <div
                      className=" grid lg:grid-cols-4
                        md:grid-cols-3
                     gap-6 "
                    >
                      <label
                        className="block font-bold text-lg mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="name"
                        name="name"
                        id="name"
                        value={formData.name.firstName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            name: {...formData.name, firstName: e.target.value},
                          })
                        }
                      />
                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name.middleName}
                        onChange={e =>
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
                        value={formData.name.LastName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            name: {...formData.name, LastName: e.target.value},
                          })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-28">
                      <div className="flex items-center  my-5 gap-4">
                        <label className="font-bold text-lg " htmlFor="phone">
                          Phone
                        </label>
                        <input
                          className="appearance-none bg-transparent mr-16  border-b-2 border-cyan-400   leading-tight focus:outline-none"
                          type="text"
                          name="phone"
                          required
                          id="phone"
                          value={formData.mobile}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              mobile: e.target.value,
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
                            backgroundColor: dark ? "#000" : "white",
                            color: dark ? "white" : "black",
                          }}
                          required
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          name="gender"
                          id="gender"
                          value={formData.Gender}
                          onChange={e =>
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

                    <div className="grid grid-cols-2 gap-28">
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
                          onChange={e =>
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
                          onChange={e =>
                            setFormData({
                              ...formData,
                              height: e.target.value,
                            })
                          }
                        />
                        cm
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-28">
                      <div className="mb-4">
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="bloodGroup"
                        >
                          bloodGroup
                        </label>
                        <select
                          style={{
                            backgroundColor: dark ? "#000" : "white",
                            color: dark ? "white" : "black",
                          }}
                          required
                          name="bloodGroup"
                          id="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={e =>
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
                      </div>{" "}
                      <div className="mb-4">
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor=" age"
                        >
                          age
                        </label>

                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          required
                          type="date"
                          name="age"
                          id="age"
                          value={formData.date.split("T")[0]}
                          onChange={e =>
                            setFormData({...formData, date: e.target.value})
                          }
                        />
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-8  mb-4  mt-9">
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
                            backgroundColor: dark ? "#000" : "white",
                            color: dark ? "white" : "black",
                          }}
                          name="speciality"
                          id="speciality"
                          value={formData.specialty}
                          onChange={e =>
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
                          <option value="Endocrinologist">
                            Endocrinologist
                          </option>
                          <option value="Gastroenterologist">
                            Gastroenterologist
                          </option>
                          <option value="Gynecologist">Gynecologist</option>
                          <option value="Neurologist">Neurologist</option>
                          <option value="Oncologist">Oncologist</option>
                          <option value="Ophthalmologist">
                            Ophthalmologist
                          </option>
                          <option value="Orthopedic">Orthopedic</option>
                          <option value="Pediatrician">Pediatrician</option>
                          <option value="Psychiatrist">Psychiatrist</option>
                          <option value="Pulmonologist">Pulmonologist</option>
                          <option value="Rheumatologist">Rheumatologist</option>
                          <option value="Urologist">Urologist</option>
                        </select>
                      </div>

                      <div className="mb-4">
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="experience"
                        >
                          experience
                        </label>
                        <input
                          required
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          name="experience"
                          id="experience"
                          value={formData.experience}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              experience: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div> */}
                    {/* <div className="grid grid-cols-2 gap-8  mb-4  mt-9">
                      <div className="mb-5">
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="address"
                        >
                          Hospital
                        </label>
                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          required
                          name="address"
                          id="address"
                          value={formData.Hospital}
                          onChange={e =>
                            setFormData({...formData, Hospital: e.target.value})
                          }
                        />
                      </div>
                      <div className="mb-5">
                        <label
                          className="block font-bold text-lg  mb-2"
                          htmlFor="degree"
                        >
                          Degree
                        </label>
                        <select
                          required
                          style={{
                            backgroundColor: dark ? "#000" : "white",
                            color: dark ? "white" : "black",
                          }}
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          name="degree"
                          id="degree"
                          value={formData.degree}
                          onChange={e =>
                            setFormData({...formData, degree: e.target.value})
                          }
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
                    </div> */}
                    <div>
                      <label
                        className="block font-bold text-lg "
                        htmlFor="address"
                      >
                        HospitalAddress
                      </label>
                    </div>
                    <div className="grid grid-cols-5 gap-8  mb-4  mt-9">
                      <div>
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="address"
                        >
                          Street
                        </label>
                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          name="address"
                          id="address"
                          required
                          value={formData.address.Street}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                Street: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="address"
                        >
                          City
                        </label>

                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          name="address"
                          id="address"
                          required
                          value={formData.address.city}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                city: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="address"
                        >
                          Building
                        </label>
                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          name="address"
                          required
                          id="address"
                          value={formData.address.building}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                building: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="address"
                        >
                          Country
                        </label>

                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          name="address"
                          id="address"
                          required
                          value={formData.address.district}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                district: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="address"
                        >
                          state
                        </label>

                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="text"
                          name="state"
                          id="state"
                          required
                          value={formData.address.state}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                state: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <label
                          className="block font-bold text-lg mb-2"
                          htmlFor="address"
                        >
                          ZipCode
                        </label>

                        <input
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          type="number"
                          name="ZipCode"
                          required
                          id="ZipCode"
                          value={formData.address.ZipCode}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              address: {
                                ...formData.address,
                                ZipCode: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div>
                        <div className="grid ">
                          <h1 className=" p-4 rounded font-bold lg:text-3xl text-xl mt-2">
                            Emergency Contact Details
                          </h1>
                        </div>

                        <div className=" flex md:flex-row flex-col items-center">
                          <label className="font-bold lg:text-xl ">Name</label>
                          <div
                            className="
        

                   "
                          >
                            <input
                              className="
                  lg:mx-5
                  mx-14
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                  border-gray-300 
                          text-black

"
                              placeholder="first name"
                              required
                              value={formData.contactPerson.name.firstName}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    name: {
                                      ...formData.contactPerson.name,
                                      firstName: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                            <input
                              className=" 
              lg:mx-5
                  mx-14
                  my-2
                          text-black
         
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2

                  border-gray-300 
"
                              placeholder="last name"
                              required
                              value={formData.contactPerson.name.LastName}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    name: {
                                      ...formData.contactPerson.name,
                                      LastName: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                          </div>
                        </div>
                        <div
                          className=" flex
              md:flex-row

              flex-col  
              items-center"
                        >
                          <div
                            className="

              flex
              md:flex-row
              flex-col
              items-center
              text-center

              "
                          >
                            <label className="font-bold lg:text-xl px-4 ">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              placeholder="mobile no."
                              required
                              className=" 
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300 
"
                              value={formData.contactPerson.mobile}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    mobile: e.target.value,
                                  },
                                })
                              }
                            ></input>
                          </div>

                          <div
                            className="  flex
              md:flex-row
              flex-col
              items-center
              text-center"
                          >
                            <label className="  lg:text-xl font-bold px-4">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              className=" 
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300 
"
                              required
                              placeholder="email"
                              value={formData.contactPerson.email}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    email: e.target.value,
                                  },
                                })
                              }
                            ></input>
                          </div>
                        </div>
                        <div></div>
                        <div
                          className="

              flex
              md:flex-row
              flex-col
              items-center
              text-center

              "
                        >
                          <div
                            className="  flex
              md:flex-row
              flex-col
              items-center
              text-center"
                          >
                            <label className=" rounded p-2 lg:text-xl font-bold px-4">
                              age
                            </label>
                            <input
                              type="date"
                              className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300 
"
                              placeholder="
                  age"
                              required
                              value={formData.contactPerson.age}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    age: e.target.value,
                                  },
                                })
                              }
                            ></input>
                          </div>
                          <div
                            className="  flex
              md:flex-row
              flex-col
              items-center
              text-center"
                          >
                            <label className=" rounded p-2 lg:text-xl font-bold px-4">
                              Relation / connection
                            </label>
                            <input
                              className=" 
                  
                  my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300 
"
                              placeholder="
                    ex.bother / 
                    sister
                    "
                              required
                              value={formData.contactPerson.relation}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    relation: e.target.value,
                                  },
                                })
                              }
                            ></input>
                          </div>
                        </div>

                        <div
                          className="
                  flex
                  md:flex-row
                  flex-col
                  items-center
                  
                  
                          
            "
                        >
                          <label className=" lg:text-xl font-bold px-4 mb-8 col-span-1">
                            Address
                          </label>
                          <div
                            className="    
                "
                          >
                            <input
                              type="text"
                              className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300 "
                              required
                              placeholder="building/area"
                              value={formData.contactPerson.address.building}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    address: {
                                      ...formData.contactPerson.address,
                                      building: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                            <input
                              type="text"
                              className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300"
                              required
                              placeholder="city"
                              value={formData.contactPerson.address.city}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    address: {
                                      ...formData.contactPerson.address,
                                      city: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                            <input
                              type="text"
                              className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300"
                              required
                              placeholder="Street"
                              value={formData.contactPerson.address.Street}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    address: {
                                      ...formData.contactPerson.address,
                                      Street: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                            <input
                              type="text"
                              className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300"
                              required
                              placeholder="District"
                              value={formData.contactPerson.address.district}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    address: {
                                      ...formData.contactPerson.address,
                                      district: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                            <input
                              type="number"
                              className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300"
                              required
                              placeholder="Pin-code"
                              value={formData.contactPerson.address.ZipCode}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    address: {
                                      ...formData.contactPerson.address,
                                      ZipCode: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                            <input
                              type="text"
                              className="     my-2
                  mx-2
                     w-64
                  h-10
                  rounded-lg
                  px-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-purple-600
                  focus:border-transparent
                  border-2
                          text-black

                  border-gray-300"
                              placeholder="State"
                              required
                              value={formData.contactPerson.address.state}
                              onChange={e =>
                                setFormData({
                                  ...formData,
                                  contactPerson: {
                                    ...formData.contactPerson,
                                    address: {
                                      ...formData.contactPerson.address,
                                      state: e.target.value,
                                    },
                                  },
                                })
                              }
                            ></input>
                          </div>
                        </div>
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
                ></button>
                <div className="my-11"></div>
                {loading ? <Loder /> : null}
              </div>
            </div>
          )}
        </>
      );
    }
  };

  return <div>{renderForm()}</div>;
};

export default RegisterDr;
