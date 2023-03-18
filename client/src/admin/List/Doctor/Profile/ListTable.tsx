import React, {useState, useEffect} from "react";
import axios from "axios";

import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

import {Link, useParams} from "react-router-dom";
import {FiEdit2, FiEye} from "react-icons/fi";
import {
  BsArrowLeftCircleFill,
  BsArrowRightCircleFill,
  BsInfoCircle,
} from "react-icons/bs";
import {useLogIN} from "../../../../../ContextLog";
import Alert from "../../../../tools/Alert";

const ListTable = () => {
  const {id} = useParams();
  const [lastPatient, setLastPatient] = useState();
  const [error, setError] = useState(null);

  const {dark} = useLogIN();
  const [Doctor, setDoctor] = useState();

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3000/admin/doctor/all-patient/${id}`, {
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
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="line"></div>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
      className="my-3
   


    

    
      "
    >
      <h1 className="text-2xl font-bold text-center my-3 text-cyan-300">
        patient list
      </h1>
      {
        /* Checking if the data is loaded and if it is loaded it will display the table. */
        lastPatient && lastPatient.length > 0 ? (
          <div
            style={{
              backgroundColor: dark ? "#000" : "#fff",
              color: dark ? "#fff" : "#000",
            }}
            className="   sm:overflow-x-scroll  
          sm:block
            hidden
      
        "
          >
            {loading ? (
              <div
                className=" 
              flex
              justify-center
              items-center
              h-screen
              
                    
              w-full"
              >
                <div className="line"></div>
              </div>
            ) : (
              <table
                className="
        
                
        
              
               
                md:max-w-4xl
                lg:max-w-5xl
                xl:max-w-6xl
                2xl:max-w-7xl
                w-full
                
         
       
             

            mx-auto
            text-left rounded-lg overflow-hidden table-auto"
              >
                <thead
                  className={
                    dark
                      ? "bg-cyan-400 text-gray-200"
                      : "bg-cyan-400 text-gray-800"
                  }
                >
                  <tr className=" uppercase text-sm leading-normal">
                    <th className=" text-left">healthIDNumber</th>
                    <th className=" text-center">PATIENT NAME</th>
                    <th className=" text-center">city</th>

                    <th className=" text-left">BloodGroup</th>

                    <th className=" text-center">mobile</th>
                    <th className=" text-center">age</th>

                    <th className=" text-center">weight</th>
                    <th className=" text-center">height</th>
                  </tr>
                </thead>
                {
                  //if there no pation
                  lastPatient && lastPatient.length === 0 ? (
                    <tbody className="text-sm font-light">
                      <tr className="text-center">
                        <td colSpan={9}>
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
                        <tbody
                          key={patients._id}
                          className={" text-sm font-light"}
                        >
                          <tr
                            className={
                              "border-b border-gray-200 hover:bg-gray-100 hover:text-black"
                            }
                          >
                            <td className="  ">
                              <span className="font-medium text-center ml-8">
                                {patients.healthIDNumber}
                              </span>
                            </td>
                            <td className=" text-left whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="mr-2">
                                  {
                                    //loading the image
                                    patients.avatar ? (
                                      <img
                                        className="w-8 h-8 rounded-full"
                                        src={patients.avatar}
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
                                  {patients.name.firstName}
                                  {patients.name.LastName}
                                </span>
                              </div>
                            </td>
                            <td className=" ">
                              <div className="mr-6 text-center">
                                {patients.address.city}
                              </div>
                            </td>
                            <td className=" ">
                              <div className="mr-6 text-center">
                                {patients.bloodGroup}
                              </div>
                            </td>
                            <td className=" ">
                              <div className="flex items-center text-center">
                                <div className="mr-2"></div>
                                <span>{patients.mobile}</span>
                              </div>
                            </td>
                            <td className="  text-center">
                              <div className="flex items-center justify-center">
                                <span>
                                  {patients.date
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
                                <span>{patients.weight}</span>
                              </div>
                            </td>
                            <td className="  text-center">
                              <div className="flex items-center justify-center">
                                <span>{patients.height}</span>
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

            <div className="flex justify-center items-center mt-4 mb-4 space-x-4">
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
        ) : (
          <p className="text-gray-500 text-center ml-11">
            The doctor does not have any patients
          </p>
        )
      }

      <div className="md:ml-28      mx-auto sm:hidden ">
        <Alert />

        {loading ? (
          <div className="flex justify-center items-center my-8">
            <h1>Loading...</h1>
          </div>
        ) : (
          <div className="relative w-full md:max-w-xl max-w-sm">
            <div className="m-8 relative ">
              {lastPatient &&
                lastPatient.map(patients => (
                  <div
                    key={patients._id}
                    className="p-1 hover:bg-cyan-300 rounded-2xl my-3 border-2 flex items-center justify-between space-x-8"
                  >
                    <div className="">
                      <span
                        className={`py-1 px-2 rounded-full text-white text-md text-center border-b border-gray-100 hover:bg-black hover:text-white ${
                          patients.healthIDNumber % 2 === 0
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                      >
                        {patients.healthIDNumber}
                      </span>
                    </div>
                    <td className=" text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2">
                          {
                            //loading the image
                            patients.avatar ? (
                              <img
                                className="w-8 h-8 rounded-full"
                                src={patients.avatar}
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
                          {patients.name.firstName}
                          {patients.name.LastName}
                        </span>
                      </div>
                    </td>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListTable;
