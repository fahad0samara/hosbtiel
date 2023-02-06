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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="24"
                                height="24"
                                viewBox="0 0 48 48"
                                style={{fill: "#000000"}}
                              >
                                <path
                                  fill="#80deea"
                                  d="M24,34C11.1,34,1,29.6,1,24c0-5.6,10.1-10,23-10c12.9,0,23,4.4,23,10C47,29.6,36.9,34,24,34z M24,16	c-12.6,0-21,4.1-21,8c0,3.9,8.4,8,21,8s21-4.1,21-8C45,20.1,36.6,16,24,16z"
                                ></path>
                                <path
                                  fill="#80deea"
                                  d="M15.1,44.6c-1,0-1.8-0.2-2.6-0.7C7.6,41.1,8.9,30.2,15.3,19l0,0c3-5.2,6.7-9.6,10.3-12.4c3.9-3,7.4-3.9,9.8-2.5	c2.5,1.4,3.4,4.9,2.8,9.8c-0.6,4.6-2.6,10-5.6,15.2c-3,5.2-6.7,9.6-10.3,12.4C19.7,43.5,17.2,44.6,15.1,44.6z M32.9,5.4	c-1.6,0-3.7,0.9-6,2.7c-3.4,2.7-6.9,6.9-9.8,11.9l0,0c-6.3,10.9-6.9,20.3-3.6,22.2c1.7,1,4.5,0.1,7.6-2.3c3.4-2.7,6.9-6.9,9.8-11.9	c2.9-5,4.8-10.1,5.4-14.4c0.5-4-0.1-6.8-1.8-7.8C34,5.6,33.5,5.4,32.9,5.4z"
                                ></path>
                                <path
                                  fill="#80deea"
                                  d="M33,44.6c-5,0-12.2-6.1-17.6-15.6C8.9,17.8,7.6,6.9,12.5,4.1l0,0C17.4,1.3,26.2,7.8,32.7,19	c3,5.2,5,10.6,5.6,15.2c0.7,4.9-0.3,8.3-2.8,9.8C34.7,44.4,33.9,44.6,33,44.6z M13.5,5.8c-3.3,1.9-2.7,11.3,3.6,22.2	c6.3,10.9,14.1,16.1,17.4,14.2c1.7-1,2.3-3.8,1.8-7.8c-0.6-4.3-2.5-9.4-5.4-14.4C24.6,9.1,16.8,3.9,13.5,5.8L13.5,5.8z"
                                ></path>
                                <circle
                                  cx="24"
                                  cy="24"
                                  r="4"
                                  fill="#80deea"
                                ></circle>
                              </svg>
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
