// import axios from "axios";
// import React, {useEffect} from "react";
// import {Link, useParams} from "react-router-dom";
// ;
// import {patient} from "../../../types";
// import FileSaver from "file-saver";
// import {useLogIN} from "../../../../ContextLog";
// import Loder from "../../../tools/Loder";
// const Table = () => {
//   const {
//     Patient,

//     dark,
//   } = useLogIN();

//   const [loading, setLoading] = React.useState<boolean>(true);
//   const [prescriptions, setPrescriptions] = React.useState<any>([]);
//   const [error, setError] = React.useState<boolean>(false);

//   useEffect(() => {
//     setLoading(true);
//     const fetchData = async () => {
//       if (!Patient || !Patient._id) {
//         return;
//       }
//       try {
//         const response = await fetch(
//           `http://localhost:3000/user/Prescription/${Patient._id}`
//         );
//         const data = await response.json();
//         setPrescriptions(data.prescription);
//         setLoading(false);
//         console.log("====================================");
//         console.log(
//           "🚀 ~ file: PrescriptionTable.tsx ~ line 18 ~ fetchData ~ data",
//           data.prescription
//         );
//         console.log("====================================");
//       } catch (error) {
//         setError(error);
//         setLoading(false);

//         console.error(error.message);
//       }
//     };

//     fetchData();
//   }, [Patient]);

//   if (loading) {
//     return (
//       <div>
//         <Loder />
//       </div>
//     );
//   }
//   if (error) {
//     return (
//       <p className="text-center font-medium text-red-600">
//         Error: {error.message}
//       </p>
//     );
//   }

//   return (
//     <div
//       className="

//                 "
//     >
//       <h1
//         className="
//                   text-center

//                   font-bold
//                    text-2xl mb-5 text-cyan-400 "
//       >
//         Prescription History
//       </h1>
//       {
//         /* Checking if the data is loaded and if it is loaded it will display the table. */
//         prescriptions && prescriptions.length > 0 ? (
//           <div
//             className="

//                       w-full

//                       sm:-mx-6
//                       lg:mx-8
//                       "
//           >
//             <table
//               className="

//     max-w-5xl
//             w-full

//             mx-auto

//     "
//             >
//               <thead
//                 className="bg-cyan-300 p-1"

//               >
//                 <tr className="uppercase text-sm italic font-medium leading-normal">
//                   <th className="text-center">
//                     Patient Name
//                   </th>
//                   <th className="py-2 px-4 font-medium text-gray-700">
//                     Date of Prescription
//                   </th>

//                   <th className="py-2 px-4 font-medium text-gray-700">
//                     medication
//                   </th>
//                   <th className="py-2 px-4 font-medium text-gray-700">
//                     dosage
//                   </th>
//                   <th className="py-2 px-4 font-medium text-gray-700">
//                     frequency
//                   </th>
//                   <th className="py-2 px-4 font-medium text-gray-700">
//                     duration
//                   </th>
//                   <th className="py-2 px-4 font-medium text-gray-700">notes</th>
//                   <th className="py-2 px-4 font-medium text-gray-700">
//                     refills
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {prescriptions.map((prescription: any) => (
//                   <tr
//                     key={prescription._id}
//                     className="hover:bg-gray-100 border-b border-gray-200 py-10"
//                   >
//                     <td className="py-2 px-4">
//                       {prescription.patient.name.firstName}{" "}
//                       {prescription.patient.name.LastName}
//                     </td>
//                     <td className="py-2 px-4">
//                       {prescription.createdAt
//                         .slice(0, 10)
//                         .split("-")
//                         .reverse()
//                         .join("-")}
//                     </td>
//                     <td className="py-2 px-4">{prescription.medication}</td>
//                     <td className="py-2 px-4">{prescription.dosage}</td>
//                     <td className="py-2 px-4">{prescription.frequency}</td>
//                     <td className="py-2 px-4">{prescription.duration}</td>
//                     <td className="py-2 px-4">{prescription.notes}</td>
//                     <td className="py-2 px-4">{prescription.refills}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : null
//       }

//       {prescriptions.length === 0 ? (
//         <p className="text-center font-medium text-red-600">
//           No Prescription Found
//         </p>
//       ) : (
//         prescriptions.map(prescription => {
//           return (
//             <div
//               key={prescription._id}
//               className="border-b max-w-md ml-20 mt-4"
//             >
//               <div className="flex justify-between">
//                 <h3 className=" ">
//                   Dr. {prescription.doctor.name.firstName}{" "}
//                   {prescription.doctor.name.lastName}
//                 </h3>
//                 <div className="">
//                   <span className="font-medium ">duration :</span>
//                   <span className="text-sm">{prescription.duration}</span>
//                 </div>
//               </div>
//               <div className="mt-2">
//                 <span className="font-medium">dosage :</span>
//                 <span> {prescription.dosage}</span>

//                 <div className="mt-2">
//                   <span className="font-medium">Date: </span>
//                   <span>
//                     {" "}
//                     {new Date(prescription.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>
//                 <div className="flex flex-wrap mt-2"></div>
//               </div>
//             </div>
//           );
//         })
//       )}
//     </div>
//   );
// };

import React, {useState, useEffect} from "react";
import axios from "axios";

import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

import {Link} from "react-router-dom";
import {FiEdit2, FiEye} from "react-icons/fi";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";

import {useLogIN} from "../../../../ContextLog";

const Table = () => {
  const [prescriptions, setPrescriptions] = React.useState<any>([]);
  const [error, setError] = useState(null);
  const {Patient, dark} = useLogIN();

  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    totalPages: 0,
  });

  useEffect(() => {
    setLoading(true);
    if (Patient) {
      axios
        .get(`http://localhost:3000/user/Prescription/${Patient._id}`, {
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        })
        .then(res => {
          setPrescriptions(res.data.prescription);
          console.log(res.data.prescription);

          setPagination({
            ...pagination,
            totalPages: res.data.pagination.totalPages,
            page: pagination.page,
          });
          setLoading(false);
        })

        .catch(err => {
          console.log(err);
          setError(err.response);
          setLoading(false);
        });
    }
  }, [Patient]);

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
      <h1 className="text-xl my-4 text-cyan-300 font-bold ml-7">
        Prescription History
      </h1>
      <div className="">
        {loading ? (
          <div
            className=" 
            flex
            justify-center

          
             
       


                        "
          >
            <div className="line"></div>
          </div>
        ) : (
          <table className=" w-full table-auto  lg:max-w-4xl mx-auto md:max-w-md overflow-auto ">
            <thead
              className="
              bg-gray-300
 
                uppercase
                text-sm
                leading-normal
                italic
                text-gray-700

                "
            >
              <tr className=" uppercase text-sm leading-normal">
                <th className=" text-left"> dr name </th>
                <th className=" text-left">refills</th>
                <th className=" text-left">dosage</th>

                <th className=" text-center">duration</th>
                <th className=" text-center">frequency</th>
                <th className=" text-center">medication</th>
                <th className=" text-center">notes</th>

                <th className=" text-center">Actions</th>
              </tr>
            </thead>
            {
              //if there no prescriptions
              prescriptions && prescriptions.length === 0 ? (
                <tbody className="text-sm font-light">
                  <tr className="text-center">
                    <td>
                      <p className="text-red-500 text-center text-2xl">
                        No Patients
                      </p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                prescriptions &&
                prescriptions.map(prescription => {
                  return (
                    <tbody
                      key={prescription._id}
                      className={" text-sm font-light"}
                    >
                      <tr
                        className={
                          "border-b border-gray-200 hover:bg-gray-100 hover:text-black"
                        }
                      >
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
                              {prescription.doctor.name.firstName}
                            </span>
                          </div>
                        </td>
                        <td className="  ">
                          <span className="font-medium text-center ml-8">
                            {prescription.refills}
                          </span>
                        </td>

                        <td className=" ">
                          <div className="mr-6 text-center">
                            {prescription.dosage}
                          </div>
                        </td>
                        <td className=" ">
                          <div className="flex items-center text-center">
                            <div className="mr-11"></div>
                            <span>{prescription.duration}</span>
                          </div>
                        </td>
                        <td className="  text-center">
                          <div className="flex items-center justify-center">
                            <span>{prescription.frequency}</span>
                          </div>
                        </td>
                        <td className="  text-center">
                          <div className="flex items-center justify-center">
                            <span>
                              {prescription.createdAt
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
                            <span>{prescription.notes}</span>
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
                                to={`/admin/ViewPatient/${prescription._id}`}
                                className="w-4 mr-2 transform text-cyan-400 hover:text-cyan-400 hover:scale-150"
                              >
                                <FiEye className="w-4 mr-2 transform text-cyan-400 hover:text-cyan-400 hover:scale-150" />
                              </Link>
                            </div>
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
          p-8
        
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

export default Table;
