import React, {useState, useEffect} from "react";
import axios from "axios";
import {useLogIN} from "../../../ContextLog";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Loder from "../../tools/Loder";
import {Link} from "react-router-dom";
import {FiEdit2, FiEye} from "react-icons/fi";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import {patient} from "../../types";

const Patient = () => {
  const [lastPatient, setLastPatient] = useState();
  const [error, setError] = useState(null);
  const {Doctor, dark} = useLogIN();

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/doctor/all-appointments/${Doctor._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })

      .then(res => {
        setLastPatient(res.data.patients);
        console.log(res.data.patients, "res.data.patients");

        setPagination({
          ...pagination,
          totalPages: res.data.pagination.totalPages,
          page: pagination.page,
        });

        setLoading(false);
      })
      .catch(err => {
        console.log(
          err.response.data ? err.response.data : "Error in getting patients"
        );

        setError(
          err.response.data && err.response.data.error
            ? err.response.data.error
            : "Error in getting patients"
        );

        setLoading(false);
      });
  }, [pagination.page]);

  // handle prev and next

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

  if (error) {
    return (
      <p
        className={
          dark
            ? "text-red-500 text-center text-2xl"
            : "text-red-500 text-center text-2xl"
        }
      >
        {
          // @ts-ignore
          error
        }
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-xl my-4 text-cyan-300 font-bold">Last Patients</h1>
      <div className="">
        {loading ? (
          <div
            className=" 
              flex
              justify-center
              items-center
              h-screen
       


                        "
          >
            <div className="line"></div>
          </div>
        ) : (
          <table className="min-w-max w-full table-auto ">
            <thead
              className={
                dark ? "bg-gray-800 text-gray-200" : "bg-gray-200 text-gray-800"
              }
            >
              <tr className=" uppercase text-sm leading-normal">
                <th className=" text-left">healthIDNumber</th>
                <th className=" text-left">name</th>
                <th className=" text-left">BloodGroup</th>

                <th className=" text-center">mobile</th>
                <th className=" text-center">Date</th>
                <th className=" text-center">ViSiT Time</th>
                <th className=" text-center">Age</th>

                <th className=" text-center">Actions</th>
              </tr>
            </thead>
            {
              //if there no pation
              lastPatient && lastPatient.length === 0 ? (
                <tbody className="text-sm font-light">
                  <tr className="text-center">
                    <td colSpan="8">
                      <p className="text-red-500 text-center text-2xl">
                        No Patients
                      </p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                lastPatient &&
                lastPatient.map(patients => {
                  return (
                    <tbody key={patients._id} className={" text-sm font-light"}>
                      <tr
                        className={
                          "border-b border-gray-200 hover:bg-gray-100 hover:text-black"
                        }
                      >
                        <td className="  ">
                          <span className="font-medium text-center ml-8">
                            {patients.patient.healthIDNumber}
                          </span>
                        </td>
                        <td className=" text-left whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="mr-2">
                              {
                                //loading the image
                                patients.patient.avatar ? (
                                  <img
                                    className="w-8 h-8 rounded-full"
                                    src={patients.patient.avatar}
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
                              {patients.patient.name.firstName}
                              {patients.patient.name.LastName}
                            </span>
                          </div>
                        </td>
                        <td className=" ">
                          <div className="mr-6 text-center">
                            {patients.patient.bloodGroup}
                          </div>
                        </td>
                        <td className=" ">
                          <div className="flex items-center text-center">
                            <div className="mr-2"></div>
                            <span>{patients.patient.mobile}</span>
                          </div>
                        </td>
                        <td className="  text-center">
                          <div className="flex items-center justify-center">
                            <span>
                              {patients.appointmentDate
                                .toString()
                                .substring(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </span>
                          </div>
                        </td>
                        <td className="  text-center">
                          <div className="flex items-center justify-center">
                            <span>{patients.appointmentTime}</span>
                          </div>
                        </td>
                        <td className="  text-center">
                          <div className="flex items-center justify-center">
                            <span>
                              {patients.patient.date
                                .toString()
                                .substring(0, 10)
                                .split("-")
                                .reverse()
                                .join("-")}
                            </span>
                          </div>
                        </td>

                        <td className="  text-center">
                          <div className="flex item-center justify-center mt-3 ">
                            <div
                              className={
                                "w-4 mr-2  transform hover:text-purple-500 hover:scale-110"
                              }
                            >
                              <Link
                                //
                                to={`/admin/ViewPatient/${patients._id}`}
                                className="w-4 mr-2 transform text-cyan-400 hover:text-cyan-400 hover:scale-150"
                              >
                                <FiEye />
                              </Link>
                            </div>

                            <Link
                              to={`/admin/Edit/${patients._id}`}
                              className={
                                "w-4 mr-2 transform text-cyan-400 hover:text-cyan-400 hover:scale-150"
                              }
                            >
                              <FiEdit2 />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  );
                })
              )
            }
          </table>
        )}

        <div
          className="
          flex
          justify-center
          items-center
          mt-4
          mb-4
          space-x-4

               

              
                            
              "
        >
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

export default Patient;
