import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLogIN} from "../../../ContextLog";
import {RiDeleteBin5Line} from "react-icons/ri";
import {FiEdit2, FiEye} from "react-icons/fi";
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";

import Loder from "../../tools/Loder";
import {Data, Doctor} from "../../types";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";

const DoctorList = () => {
  const {
    logPatient,

    Profile,
    setProfile,

    dark,
    setdark,
  } = useLogIN();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:3000/admin/doctor", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
      .then(res => {
        setDoctors(res.data.doctors);
        setPagination({
          ...pagination,
          totalPages: res.data.pagination.totalPages,
          limit: res.data.pagination.limit,
        });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        setError(err.message);
        setTimeout(() => {
          setError("");
        }, 2000);
      });
  }, [pagination.page, pagination.limit]);

  const handlePrevClick = () => {
    setLoading(true);

    if (pagination.page === 1) {
      // Display a message to the user indicating that they are on the first page
      alert("You are on the first page");
      setLoading(false);
    } else {
      setLoading(false);
      setPagination({
        ...pagination,
        page: pagination.page - 1,
      });
    }
  };

  const handleNextClick = () => {
    setLoading(true);
    if (pagination.page === pagination.totalPages) {
      // Display a message to the user indicating that there are no more pages to be displayed
      alert("No more pages to be displayed");
      setLoading(false);
    } else {
      setLoading(false);
      setPagination({
        ...pagination,
        page: pagination.page + 1,
      });
    }
  };

  // currentPage
  const currentPage = pagination.page;

  // total pages
  const totalPages = pagination.totalPages;

  // delet the doctor
  const deleteDoctor = (id: any) => {
    setLoading(true);
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      axios
        .delete(`http://localhost:3000/admin/doctor/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(res => {
          console.log(res.data);
          setDoctors(doctors.filter((doctor: any) => doctor._id !== id));
          setLoading(false);
        })
        .then(res => {
          setLoading(false);
          setSuccess("Doctor deleted successfully");
          setTimeout(() => {
            setSuccess("");
          }, 2000);
        })
        .catch(err => {
          setError("Error deleting doctor");
          setTimeout(() => {
            setError("");
          }, 2000);
        });
    }
  };

  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
      className="p-6 h-screen ml-11"
    >
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 my-5">
        <div
          className="text-xl  font-medium  flex 
      items-center
      ml-20
      
        "
        >
          <h1 className=" text-2xl font-bold "> Doctor List</h1>
          {
            /* Checking if the data is loaded and if it is loaded it will display the table. */
            doctors && doctors.length > 0 ? (
              <h1
                className="text-2xl text-cyan-300
              font-medium ml-3"
              >
                {" "}
                {doctors.length}{" "}
              </h1>
            ) : (
              <h1 className="text-2xl text-cyan-300 font-medium  ml-2"> 0 </h1>
            )
          }
        </div>
      </div>
      <div className="overflow-x-auto ">
        <div className=" ">
          {loading ? (
            <Loder />
          ) : (
            <table
              className="
            max-w-5xl
            w-full
             

            mx-auto
            text-left rounded-lg overflow-hidden table-auto"
            >
              <thead>
                <tr className=" uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">name</th>
                  <th className="py-3 px-6 text-center">email</th>
                  <th className="py-3 px-6 text-center">joinDate</th>
                  <th className="py-3 px-6 text-center">phoneNumber</th>
                  <th className="py-3 px-6 text-center">Age</th>
                  <th className="py-3 px-6 text-center">specialty</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              {doctors &&
                doctors.map(doctor => {
                  return (
                    <tbody
                      key={doctor._id}
                      className=" text-sm font-extrabold "
                    >
                      <tr className="border-b border-gray-200 hover:bg-gray-100 hover:text-black">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              {
                                //loading the image
                                doctor.avatar ? (
                                  <img
                                    className="w-8 h-8 rounded-full"
                                    src={doctor.avatar}
                                    alt=""
                                  />
                                ) : (
                                  <div>
                                    <h1>loading...</h1>
                                  </div>
                                )
                              }
                            </div>
                            <span className="font-medium">
                              {doctor.name.firstName} {doctor.name.LastName}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 ">
                          <div className="flex items-center text-center">
                            <div className="mr-2"></div>
                            <span>{doctor.user.email}</span>
                          </div>
                        </td>
                        <td className="py-3ml-2 text-center">
                          <div className="flex items-center justify-center">
                            <span className="ml-2">
                              {
                                //createdAt
                                doctor.user.createdAt
                                  .toString()
                                  .substring(0, 10)
                                  .split("-")
                                  .reverse()
                                  .join("-")
                              }
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <div className="flex items-center justify-center">
                            <span>{doctor.phoneNumber}</span>
                          </div>
                        </td>
                        <td className="py-3  text-center">
                          <div className="flex items-center justify-center">
                            <span>
                              {doctor.date
                                .toString()
                                .substring(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-center">
                          <span
                            className={`py-1 px-2 rounded-full text-white text-md  text-center border-b border-gray-100 hover:bg-black hover:text-white ${
                              doctor.specialty === "Cardiologist"
                                ? "bg-green-400"
                                : ""
                            } ${
                              doctor.specialty === "Dentist"
                                ? "bg-rose-500"
                                : ""
                            }
                              ${
                                doctor.specialty === "Oncologist"
                                  ? "bg-cyan-500"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Pediatrician"
                                  ? "bg-rose-400"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Dermatologist"
                                  ? "bg-red-600"
                                  : ""
                              }${
                              doctor.specialty === "Endocrinologist"
                                ? "bg-purple-500"
                                : ""
                            }
                              ${
                                doctor.specialty === "Gastroenterologist"
                                  ? "bg-pink-300"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Psychiatrist"
                                  ? "bg-lime-300"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Pulmonologist"
                                  ? "bg-green-400"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Neurologist"
                                  ? "bg-teal-300 "
                                  : ""
                              }
                              ${
                                doctor.specialty === "Rheumatologist"
                                  ? "bg-orange-500 "
                                  : ""
                              }${
                              doctor.specialty === "Urologist"
                                ? "bg-teal-300 "
                                : ""
                            }
                               ${
                                 doctor.specialty === "Gynecologist"
                                   ? "bg-yellow-500"
                                   : ""
                               }`}
                          >
                            {doctor.specialty}
                          </span>
                        </td>

                        <td className="py-3 px-6 text-center">
                          <div className="flex item-center justify-center">
                            <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                              <Link
                                to={`/admin/ViewDr/${doctor._id}`}
                                className="w-4 mr-2 transform text-cyan-400 hover:text-cyan-400 hover:scale-150"
                              >
                                <FiEye />
                              </Link>
                            </div>

                            <Link
                              to={`/admin/Edit/${doctor._id}`}
                              className="w-4 mr-2 transform text-cyan-400 hover:text-cyan-400 hover:scale-150"
                            >
                              <FiEdit2 />
                            </Link>

                            <div className="w-4 mr-2 transform  hover:text-purple-500 hover:scale-110 ">
                              <RiDeleteBin5Line
                                onClick={() => {
                                  deleteDoctor(doctor._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </table>
          )}
        </div>

        <div className="flex justify-center items-center mt-4  space-x-4">
          <div className="   rounded-full text-center py-2">
            <BsArrowLeftCircleFill
              className={
                currentPage === 1
                  ? "text-gray-300 text-xl cursor-not-allowed"
                  : "text-cyan-300 text-xl cursor-pointer "
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
                  ? "text-gray-300 text-xl cursor-not-allowed"
                  : "text-cyan-300 text-xl cursor-pointer "
              }
              onClick={handleNextClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
