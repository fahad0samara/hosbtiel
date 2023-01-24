import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AgeDisplay from "../../tools/AgeDisplay";
import { useLogIN } from "../../../ContextLog";

import { useLocation } from "react-router-dom";
import Loder from "../../tools/Loder";
import { Data } from "../../types";
const Edit = () => {
  const { id } = useParams();
  const {
    logPatient,

    Profile,
    setProfile,

    dark,
    setdark,
  } = useLogIN();

  const [data, setData] = React.useState<Data>({
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    user: {
      email: "",
      password: "",
    },

    phoneNumber: "",
    Hospital: "",
    HospitalAddress: {
      city: "",
      building: "",
      state: "",
      ZipCode: "",
      Country: "",
    },
    specialty: "",
    degree: "",
    experience: "",
    date: "",
    bloodGroup: "",
  });

  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/admin/doctor/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(res => {
        console.log(res.data);
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `http://localhost:3000/admin/doctor/${id}`,
        {
          ...data,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(res => {
        console.log(res.data);
        setLoading(false);

        alert("Doctor Updated Successfully");
      })
      .catch(err => {
        console.log(err);
        alert("Doctor Not Updated");
        setLoading(false);
      });
  };

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
          className="
    
      "
        >
          <form className="w-full max-w-screen-md mx-auto  ">
            <h1 className="text-3xl font-bold text-center pt-4 mb-5">
              Edit Doctor
            </h1>
            <div
              className=" grid grid-cols-4 gap-6 
  
  
        "
            >
              <label className="block font-bold text-lg mb-2" htmlFor="name">
                Name
              </label>
              <input
                className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="name"
                name="name"
                id="name"
                value={data.name.firstName}
                onChange={e =>
                  setData({
                    ...data,
                    name: { ...data.name, firstName: e.target.value },
                  })
                }
              />
              <input
                className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                name="name"
                id="name"
                value={data.name.middleName}
                onChange={e =>
                  setData({
                    ...data,
                    name: { ...data.name, middleName: e.target.value },
                  })
                }
              />

              <input
                className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                name="name"
                id="name"
                value={data.name.lastName}
                onChange={e =>
                  setData({
                    ...data,
                    name: { ...data.name, lastName: e.target.value },
                  })
                }
              />
            </div>
            <div
              className="mb-4 mt-4

        "
            >
              <label className="block font-bold text-lg mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="email"
                required
                name="email"
                id="email"
                value={data.user.email}
                onChange={e =>
                  setData({
                    ...data,
                    user: { ...data.user, email: e.target.value },
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label
                className="block font-bold text-lg mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none bg-inherit focus:bg-transparent   border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                name="password"
                id="password"
                value={data.user.password}
                onChange={e =>
                  setData({
                    ...data,
                    user: {
                      ...data.user,

                      password: e.target.value,
                    },
                  })
                }
              />
            </div>
            <div className="mb-4">
              <label className="block font-bold text-lg mb-2" htmlFor="phone">
                Phone
              </label>
              <input
                className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                name="phone"
                id="phone"
                value={data.phoneNumber}
                onChange={e => setData({ ...data, phoneNumber: e.target.value })}
              />
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
                  name="bloodGroup"
                  id="bloodGroup"
                  value={data.bloodGroup}
                  onChange={e => setData({ ...data, bloodGroup: e.target.value })}
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
                <label className="block font-bold text-lg mb-2" htmlFor=" date">
                  date
                </label>

                <input
                  className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                  required
                  type={data.date}
                  name="date"
                  id="date"
                  value={data.date
                    .toString()
                    .substring(0, 10)
                    .split("-")
                    .reverse()
                    .join("-")}
                  onChange={e => setData({ ...data, date: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8  mb-4  mt-9">
              <div className="mb-4">
                <label
                  htmlFor="speciality"
                  className="mt-2 text-lg font-bold"
                >
                  Speciality
                </label>
                <select
                  style={{
                    backgroundColor: dark ? "#000" : "white",
                    color: dark ? "white" : "black",
                  }}
                  name="speciality"
                  id="speciality"
                  value={data.specialty}
                  onChange={e => setData({ ...data, specialty: e.target.value })}
                  className="block appearance-none w-full bg-inherit border-b border-cyan-400 hover:border-cyan-400 
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
                <label
                  className="block font-bold text-lg mb-2"
                  htmlFor="experience"
                >
                  experience
                </label>
                <input
                  className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                  name="experience"
                  id="experience"
                  value={data.experience}
                  onChange={e => setData({ ...data, experience: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8  mb-4  mt-9">
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
                  name="address"
                  id="address"
                  value={data.Hospital}
                  onChange={e => setData({ ...data, Hospital: e.target.value })}
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
                  style={{
                    backgroundColor: dark ? "#000" : "white",
                    color: dark ? "white" : "black",
                  }}
                  className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                  name="degree"
                  id="degree"
                  value={data.degree}
                  onChange={e => setData({ ...data, degree: e.target.value })}
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
              <label className="block font-bold text-lg " htmlFor="address">
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
                  value={data.HospitalAddress.city}
                  onChange={e =>
                    setData({
                      ...data,
                      HospitalAddress: {
                        ...data.HospitalAddress,
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
                  City
                </label>

                <input
                  className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  name="address"
                  id="address"
                  value={data.HospitalAddress.building}
                  onChange={e =>
                    setData({
                      ...data,
                      HospitalAddress: {
                        ...data.HospitalAddress,
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
                  Building
                </label>
                <input
                  className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  name="address"
                  id="address"
                  value={data.HospitalAddress.state}
                  onChange={e =>
                    setData({
                      ...data,
                      HospitalAddress: {
                        ...data.HospitalAddress,
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
                  Country
                </label>

                <input
                  className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  name="address"
                  id="address"
                  value={data.HospitalAddress.Country}
                  onChange={e =>
                    setData({
                      ...data,
                      HospitalAddress: {
                        ...data.HospitalAddress,
                        Country: e.target.value,
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
                  id="ZipCode"
                  value={data.HospitalAddress.ZipCode}
                  onChange={e =>
                    setData({
                      ...data,
                      HospitalAddress: {
                        ...data.HospitalAddress,
                        ZipCode: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </form>
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
  );
};

export default Edit;
