import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Loder from "../../tools/Loder";
import {Link, useNavigate} from "react-router-dom";
import {useLogIN} from "../../../ContextLog";
import jwtDecode from "jwt-decode";
import {AiFillMinusCircle, AiFillPlusCircle} from "react-icons/ai";
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
    allergyList: [
      {
        allergy: "",
      },
    ],
    medicationList: [
      {
        medication: "",
      },
    ],
    diseaseList: [{disease: ""}],

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

  const addAllergy = () => {
    const allergyList1 = [...formData.allergyList];
    allergyList1.push({allergy: ""});
    setFormData({...formData, allergyList: allergyList1});
  };

  const addDisease = () => {
    const diseaseList1 = [...formData.diseaseList];
    diseaseList1.push({disease: ""});
    setFormData({...formData, diseaseList: diseaseList1});
  };
  const addMedication = () => {
    const medicalHistory1 = [...formData.medicationList];
    medicalHistory1.push({medication: ""});
    setFormData({...formData, medicationList: medicalHistory1});
  };

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
      allergyList,
      diseaseList,
      medicationList,

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
        setTimeout(() => setError(""), 3000);
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
          !formData.bloodGroup ||
          !formData.date ||
          !formData.contactPerson.name.firstName ||
          !formData.contactPerson.name.LastName ||
          !formData.contactPerson.mobile ||
          !formData.contactPerson.email ||
          !formData.contactPerson.relation ||
          !formData.contactPerson.age ||
          !formData.contactPerson.address.building ||
          !formData.contactPerson.address.Street ||
          !formData.contactPerson.address.district
        ) {
          setError(
            `
          Please fill in ${!formData.name.firstName ? "First Name" : ""}
          ${!formData.name.LastName ? "Last Name" : ""}
          ${!formData.address.building ? "Building" : ""}
          ${!formData.address.Street ? "Street" : ""}
          ${!formData.address.district ? "District" : ""} 
          ${!formData.mobile ? "Mobile" : ""}
          ${!formData.bloodGroup ? "Blood Group" : ""}
          ${!formData.date ? "Date" : ""}
          ${!formData.contactPerson.name.firstName ? "First Name" : ""}
          ${!formData.contactPerson.name.LastName ? "Last Name" : ""}
          ${!formData.contactPerson.mobile ? "Mobile" : ""}
          ${!formData.contactPerson.email ? "Email" : ""}
          ${!formData.contactPerson.relation ? "Relation" : ""}
          ${!formData.contactPerson.age ? "Age" : ""}
          ${!formData.contactPerson.address.building ? "Building" : ""}
          ${!formData.contactPerson.address.Street ? "Street" : ""}
          ${!formData.contactPerson.address.district ? "District" : ""}

            `
          );
          setTimeout(() => setError(""), 2000);
          setLoading(false);
        }

        const response0 = await axios.post(
          "http://localhost:3000/user/register-patient",
          {
            user,
            name,
            address,
            date: date,
            mobile: mobile,
            bloodGroup: bloodGroup,
            weight: weight,
            height: height,
            contactPerson,
            allergyList,
            diseaseList,
            medicationList,
          }
        );

        setsuccess(true);

        console.log("Patient registered successfully,", response0);
        setLoading(false);

        const response = await axios.post(
          "http://localhost:3000/user/loginUser",
          {
            email,
            password,
          }
        );
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
      } catch (error) {
        //@ts-ignore
        console.log("Error: ", error.response.data);
        //@ts-ignore
        setError(error.response.data);
        setTimeout(() => setError(""), 4000);
        setLoading(false);
      }
    }
  };

  // Render the form based on the current step
  const renderForm = () => {
    if (step === 1) {
      return (
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1609188076864-c35269136b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute inset-0 object-cover w-full h-full"
            alt=""
          />
          <div className="relative ">
            <div className="px-4  bg-black opacity-60 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-xl xl:px-10 xl:w-5/12">
                  <div className=" rounded-2xl shadow-2xl drop-shadow-2xl shadow-sky-300 p-7 sm:p-12">
                    <div className="w-full glass-object    ">
                      <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold ">
                          Step {step} of 2
                        </h1>

                        <p className="text-md font-bold  text-black">
                          Please fill in this form to create an account!
                        </p>
                      </div>
                    </div>
                    <div>
                      <div
                        className="
       
            mt-10
            rounded-lg
            shadow-xl
            bg-red-900
            
                      "
                      >
                        {
                          //error
                          error ? (
                            <p className="text-white text-center text-xs italic">
                              {
                                //@ts-ignore
                                error
                              }
                            </p>
                          ) : null
                        }
                      </div>
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
            
           
       
          
            "
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-4 ">
                        <label
                          className="block text-sm font-bold mb-2  text-white"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className={`appearance-none bg-transparent placeholder:font-bold  border-b-2 border-cyan-300 text-white w-full  mr-3 py-1 px-2 leading-tight focus:outline-none
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
                          className="block  text-sm font-bold mb-2 text-white"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          className={`appearance-none bg-transparent placeholder:font-bold  border-b-2 border-cyan-300 text-white w-full  mr-3 py-1 px-2 leading-tight focus:outline-none
                ${error ? "border-red-500 " : ""}
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

                      <div className="flex items-center justify-between ml-14">
                        {formData.email && formData.password ? (
                          <button
                            onClick={handleSubmit}
                            className="bg-cyan-400 hover:bg-green-400  text-white font-bold
                             py-2 px-9 rounded focus:outline-none focus:shadow-outline"
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
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <form
                onSubmit={handleSubmit}
                style={{
                  backgroundColor: dark ? "#000" : "white",
                  color: dark ? "white" : "black",
                }}
                className="w-full max-w-4xl mx-auto mt-10 rounded-lg shadow-lg shadow-cyan-300 overflow-hidden md:p-8 p-12"
              >
                <div>
                  <div
                    className="w-full max-w-xl mx-auto md:p-4
                          p-6
                          rounded-lg
                          shadow-md
                      shadow-cyan-300
                          color-white
                          
                          font-bold
                          text-center
                          text-xl
                      

                          "
                  >
                    <div className="text-center mb-6">
                      <h1 className="text-3xl font-bold ">Step {step} of 2</h1>
                      <h1
                        className="
                                text-cyan-300"
                      >
                        we need more information to create your account
                      </h1>
                      <p className="text-md font-bold  ">
                        Please fill in this form to create an account!
                      </p>
                    </div>
                  </div>
                  <div
                    className="
                        
                            grid
                            grid-cols-1
                            md:grid-cols-3
                        md:mx-9
                            mt-10

                       
                            
                            
                      
         
              "
                  >
                    <label className="font-bold lg:text-xl font-poppins text-center   lg:my-4  col-span-1">
                      Name
                    </label>
                    <div
                      className="
                          col-span-2
               flex
              md:flex-row
              flex-col
              items-center
              space-y-5
              md:space-y-0


                "
                    >
                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="
                  First Name"
                        type="text"
                        value={formData.name.firstName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            name: {
                              ...formData.name,
                              firstName: e.target.value,
                            },
                          })
                        }
                      ></input>
                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="Middle Name"
                        type="text"
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
                      ></input>
                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="
                  Last Name"
                        type="text"
                        value={formData.name.LastName}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            name: {
                              ...formData.name,
                              LastName: e.target.value,
                            },
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-5 my-3 max-w-2xl">
                    <div>
                      <label className="font-bold lg:text-xl font-poppins lg:px-2 lg:my-1 ">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        value={formData.date.split("T")[0]}
                        onChange={e =>
                          setFormData({...formData, date: e.target.value})
                        }
                      ></input>
                    </div>

                    <div>
                      <label className="font-bold lg:text-xl  ">
                        Mobile Number
                      </label>

                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="Mobile Number"
                        type="number"
                        value={formData.mobile}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            mobile: e.target.value,
                          })
                        }
                      ></input>
                    </div>
                  </div>
                  <div className=" grid grid-cols-1 gap-4 md:gap-8 md:grid-cols-3 my-5">
                    <div className="flex md:flex-row md:items-center flex-col items-center">
                      <label className="  lg:text-xl font-bold px-4">
                        Blood Group
                      </label>
                      <div className="col-span-3 my-2  mx-2">
                        <select
                          className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                          id="blood-group"
                          required
                          value={formData.bloodGroup}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              bloodGroup: e.target.value,
                            })
                          }
                        >
                          <option id="select">select</option>
                          <option id="A+">A+</option>
                          <option id="A-">A-</option>
                          <option id="B+">B+</option>
                          <option id="B-">B-</option>
                          <option id="AB+">AB+</option>
                          <option id="AB-">AB-</option>
                          <option id="O+">O+</option>
                          <option id="O-">O-</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex md:flex-row md:items-center flex-col items-center">
                      <label className="font-bold lg:text-xl px-4 ">
                        Height
                      </label>

                      <input
                        required
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="Height"
                        type="number"
                        value={formData.height}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            height: e.target.value,
                          })
                        }
                      ></input>
                      <h1>{formData.height === "" ? "" : "cm"}</h1>
                    </div>
                    <div
                      className="
                  flex
              md:flex-row
              md:items-center
              flex-col
              items-center
                "
                    >
                      <label className="font-bold lg:text-xl px-4 ">
                        Weight
                      </label>

                      <input
                        required
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="Weight"
                        type="number"
                        value={formData.weight}
                        onChange={e =>
                          setFormData({
                            ...formData,
                            weight: e.target.value,
                          })
                        }
                      ></input>
                      <h1>{formData.weight === "" ? "" : "kg"}</h1>
                    </div>
                  </div>

                  <div
                    className="
                  flex
                  my-4
                  flex-col
                  lg:flex-row
                  lg:items-center
                  text-center
                   "
                  >
                    <label className="lg:text-xl font-bold px-8">Address</label>
                    <div
                      className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1
                              md:gap-6
                              px-8
                           lg:gap-9
                           gap-7
                            
                        "
                    >
                      <input
                        type="text"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="building/area"
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
                      ></input>
                      <input
                        type="text"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="city"
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
                      ></input>
                      <input
                        type="text"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="Street"
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
                      ></input>
                      <input
                        type="text"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="District"
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
                      ></input>
                      <input
                        type="number"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="Pin-code"
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
                      ></input>
                      <input
                        type="text"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        placeholder="State"
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
                      ></input>
                    </div>
                  </div>

                  <div
                    className="
                        text-red-500
                        italic
                        text-center
                        text-xl
                        font-bold
                        font-size-lg
                        my-6
                    
           
              "
                  >
                    <h1>This section Allergies and diseases</h1>
                    <h1>If you don't have anything you can ignore it</h1>
                  </div>

                  <div
                    className="grid lg:grid-cols-3
              md:grid-cols-2"
                  >
                    <div className="col-span-5 ">
                      <h1 className=" lg:text-xl  my-1 font-bold px-4 grid col-start-1 col-span-3">
                        Do you have a permanent illness ?
                      </h1>
                    </div>
                    <div className="col-span-4">
                      {formData.diseaseList.map((disease, index) => {
                        return (
                          <div
                            key={index}
                            className="grid grid-cols-7 col-span-1 mb-3"
                          >
                            <input
                              className="lg:h-10 lg:w-64 lg:rounded-lg lg:px-4 px-4 appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1  leading-tight  focus:outline-none  focus:ring-2 mx-3 col-span-3  lg:pl-4 h-8 pl-2"
                              type="text"
                              name="

                          Asthma
                          "
                              value={disease.disease}
                              placeholder="
                          ex.Asthma
                          "
                              onChange={e => {
                                const values = [...formData.diseaseList];
                                values[index].disease = e.target.value;
                                setFormData({
                                  ...formData,
                                  diseaseList: values,
                                });
                              }}
                            />

                            <div
                              className="col-span-1 pl-3"
                              onClick={() => {
                                if (formData.diseaseList.length > 1) {
                                  const values = [...formData.diseaseList];
                                  values.splice(index, 1);
                                  setFormData({
                                    ...formData,
                                    diseaseList: values,
                                  });
                                }
                              }}
                            >
                              <AiFillMinusCircle className="text-2xl text-red-500" />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div onClick={addDisease} className="col-span-1">
                      <AiFillPlusCircle className="text-2xl text-green-500" />
                    </div>
                  </div>
                </div>
                <div
                  className="grid lg:grid-cols-3
              md:grid-cols-2
              grid-cols-1
              gap-1
              my-2
              text-center
              lg:text-start
              "
                >
                  <div className="col-span-5 ">
                    <h1 className=" lg:text-xl  my-1 font-bold px-4 grid col-start-1 col-span-3">
                      do you have any allergy ?
                    </h1>
                  </div>
                  <div className="col-span-4  ">
                    {formData.allergyList.map((allergy, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-7 col-span-1 mb-3"
                        >
                          <input
                            className="lg:h-10 lg:w-64 lg:rounded-lg lg:px-4 px-4 appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1  leading-tight  focus:outline-none  focus:ring-2 mx-3 col-span-3  lg:pl-4 h-8 pl-2"
                            type="text"
                            name="allergy"
                            //allergyList
                            placeholder=" ex. penicillin"
                            value={allergy.allergy}
                            onChange={e => {
                              const values = [...formData.allergyList];
                              values[index].allergy = e.target.value;
                              setFormData({
                                ...formData,
                                allergyList: values,
                              });
                            }}
                          />

                          <div
                            className="col-span-1 pl-3"
                            onClick={() => {
                              if (formData.allergyList.length > 1) {
                                const values = [...formData.allergyList];
                                values.splice(index, 1);
                                setFormData({
                                  ...formData,
                                  allergyList: values,
                                });
                              }
                            }}
                          >
                            <AiFillMinusCircle className="text-2xl text-red-500" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div onClick={addAllergy} className="col-span-1">
                    <AiFillPlusCircle className="text-2xl text-green-500" />
                  </div>
                </div>

                <div
                  className="grid lg:grid-cols-3
              md:grid-cols-2
              grid-cols-1
              gap-1
              my-2
              text-center
              lg:text-start
              "
                >
                  <div className="col-span-5 ">
                    <h1 className=" lg:text-xl   font-bold px-4 grid col-start-1 col-span-3">
                      do you have any medication ?
                    </h1>
                  </div>
                  <div className="col-span-4  ">
                    {formData.medicationList.map((medication, index) => {
                      return (
                        <div
                          key={index}
                          className="grid grid-cols-7 col-span-1 mb-3"
                        >
                          <input
                            className="lg:h-10 lg:w-64 lg:rounded-lg lg:px-4 px-4 appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1  leading-tight  focus:outline-none  focus:ring-2 mx-3 col-span-3  lg:pl-4 h-8 pl-2"
                            type="text"
                            name="Drops"
                            value={medication.medication}
                            placeholder=" ex.
                        Drops
                        "
                            onChange={e => {
                              const values = [...formData.medicationList];
                              values[index].medication = e.target.value;
                              setFormData({
                                ...formData,
                                medicationList: values,
                              });
                            }}
                          />

                          <div
                            className="col-span-1 pl-3"
                            onClick={() => {
                              if (formData.medicationList.length > 1) {
                                const values = [...formData.medicationList];
                                values.splice(index, 1);
                                setFormData({
                                  ...formData,
                                  medicationList: values,
                                });
                              }
                            }}
                          >
                            <AiFillMinusCircle className="text-2xl text-red-500" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div onClick={addMedication} className="col-span-1">
                    <AiFillPlusCircle className="text-2xl text-green-500" />
                  </div>
                </div>
                <div>
                  <div
                    className="flex
                        justify-center
                        items-center
                        flex-col
                        
              "
                  >
                    <h1 className=" font-bold lg:text-3xl text-xl ">
                      Emergency Contact Details
                    </h1>

                    <p
                      className="text-red-500
                        italic
                        text-center
                        text-sm
                        font-bold
                "
                    >
                      We only need it if there is any problem
                    </p>
                  </div>

                  <div
                    className=" grid
                          grid-cols-1
                        md:mx-9
                        p-4
                        
                       lg:grid-cols-3 lg:gap-10 md:gap-8 gap-4"
                  >
                    <label className="font-bold lg:text-xl lg:text-start  text-center">
                      Name
                    </label>

                    <input
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                      className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                      className=" grid
                          grid-cols-1
                        md:mx-9
                        p-4
                        
                       lg:grid-cols-3 lg:gap-10 md:gap-8 gap-4"
                    >
                      <label className="  lg:text-xl font-bold px-4">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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

                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-16 gap-5 my-3 max-w-2xl">
                    <div>
                      <label className="font-bold lg:text-xl font-poppins lg:px-2 lg:my-1 ">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
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

                    <div>
                      <label className="font-bold lg:text-xl  ">
                        Relation/ Relationship
                      </label>

                      <input
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                        required
                        placeholder="
                    ex.bother / 
                    sister
                    "
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
                  my-4
                  flex-col
                  lg:flex-row
                  lg:items-center
                  text-center
                   "
                  >
                    <label className="lg:text-xl font-bold px-8">Address</label>
                    <div
                      className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1
                              md:gap-6
                              px-8
                           lg:gap-9
                           gap-7
                            
                        "
                    >
                      <input
                        type="text"
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                        className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
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
                <div
                  className="
       
            mt-10
            rounded-lg
            shadow-xl
            bg-red-900
            
                      "
                >
                  {
                    //error
                    error ? (
                      <p className="text-white text-center text-xs italic">
                        {
                          //@ts-ignore
                          error
                        }
                      </p>
                    ) : null
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
                    className="bg-cyan-400 hover:bg-cyan-500  font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={prevStep}
                  >
                    Previous
                  </button>

                  <div className="flex items-center justify-between ml-14">
                    {formData.contactPerson.name &&
                    formData.contactPerson.email &&
                    formData.contactPerson.address.building &&
                    formData.contactPerson.address.city &&
                    formData.name.firstName &&
                    formData.name.LastName ? (
                      <button
                        onClick={handleSubmit}
                        className="bg-cyan-400 hover:bg-green-400  text-white font-bold
                             py-2 px-9 rounded focus:outline-none focus:shadow-outline"
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
                  </div>
                  <div className="my-11"></div>
                  {loading ? <Loder /> : null}
                </div>
              </form>
            </div>
          )}
        </>
      );
    }
  };

  return <div>{renderForm()}</div>;
};

export default RegisterDr;
