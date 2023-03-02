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
import "./Table.css";

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
      <table className="mx-auto ml-20 md:ml-10 lg:ml-4 ">
        <caption className="text-cyan-300 font-bold">
          {" "}
          Prescription History
        </caption>
        <thead>
          <tr>
            <th scope="col">Dr Name</th>
            <th scope="col">Refills</th>
            <th scope="col">Dosage</th>
            <th scope="col">Duration</th>
            <th scope="col">Frequency</th>
            <th scope="col">Medication</th>
            <th scope="col">Notes</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions && prescriptions.length > 0
            ? prescriptions.map(prescription => (
                <tr>
                  <td data-label="Dr Name">
                    {prescription.doctor.name.firstName}
                  </td>
                  <td data-label="Refills">{prescription.refills}</td>
                  <td data-label="Dosage">{prescription.dosage}</td>
                  <td data-label="Duration">{prescription.duration}</td>
                  <td data-label="Frequency">{prescription.frequency}</td>
                  <td data-label="Medication">{prescription.medication}</td>
                  <td data-label="Notes">{prescription.notes}</td>
                  <td data-label="Actions">{prescription.notes}</td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
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
  );
};

export default Table;


