import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useLogIN} from "../../../ContextLog";

const Prescription = () => {
  const {Doctor, dark} = useLogIN();
  const [prescriptions, setPrescriptions] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/doctor/Prescription/${Doctor._id}`
        );
        const data = await response.json();
        setPrescriptions(data.prescription);
        console.log("====================================");
        console.log(
          "🚀 ~ file: PrescriptionTable.tsx ~ line 18 ~ fetchData ~ data",
          data.prescription
        );
        console.log("====================================");
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [Doctor._id]);

  if (loading) {
    return <p className="text-center font-medium text-gray-600">Loading...</p>;
  }
  if (error) {
    return (
      <p className="text-center font-medium text-red-600">
        Error: {error.message}
      </p>
    );
  }

  return (
    <div
      className={`${dark ? "bg-gray-800" : "bg-gray-100"} 
        max-w-4xl
       h-full p-4 rounded-md  ml-20 shadow-md`}
    >
      <h1 className="text-2xl font-medium text-gray-600">Prescription</h1>

      <table
        className={`${
          dark ? "bg-gray-800" : "bg-gray-100"
        } w-full mt-4 text-sm text-gray-600`}
      >
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 font-medium text-gray-700">
              Patient Name
            </th>
            <th className="py-2 px-4 font-medium text-gray-700">Patient Age</th>
            <th className="py-2 px-4 font-medium text-gray-700">
              Patient Gender
            </th>

            <th className="py-2 px-4 font-medium text-gray-700">
              Patient Address
            </th>
            <th className="py-2 px-4 font-medium text-gray-700">
              Patient Phone
            </th>
            <th className="py-2 px-4 font-medium text-gray-700">
              Patient Email
            </th>
          </tr>
        </thead>
        <tbody>
          {
            // check if the data is loaded
            prescriptions ? (
              prescriptions.map((prescription: any) => (
                <tr
                  key={prescription._id}
                  className="hover:bg-gray-100 border-b border-gray-200 py-10"
                >
                  <td className="py-2 px-4">{prescription.frequency}</td>
                  <td className="py-2 px-4">{prescription.duration}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4">No data</td>
              </tr>
            )

            // if the data is not loaded
          }
        </tbody>
      </table>
    </div>
  );
};

export default Prescription;
