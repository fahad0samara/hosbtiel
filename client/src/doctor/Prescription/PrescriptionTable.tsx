import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useLogIN} from "../../../ContextLog";
import img from "../../assets/Medical.png";
import Loder from "../../tools/Loder";

const Prescription = () => {
  const {Doctor, dark} = useLogIN();
  const [prescriptions, setPrescriptions] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/doctor/Prescription/${Doctor._id}`
        );
        const data = await response.json();
        setPrescriptions(data.prescription);
        setLoading(false);
        console.log("====================================");
        console.log(
          "🚀 ~ file: PrescriptionTable.tsx ~ line 18 ~ fetchData ~ data",
          data.prescription
        );
        console.log("====================================");
      } catch (error) {
        setError(error);
        setLoading(false);

        console.error(error.message);
      }
    };

    fetchData();
  }, [Doctor._id]);

  if (loading) {
    return (
      <div>
        <Loder />
      </div>
    );
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
      className="w-full overflow-hidden
       rounded-lg shadow-xs p-4
       h-screen
    
      "
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <div
        className="
        grid 

        grid-cols-1
        md:grid-cols-2
        gap-4

      "
      >
        <div
          className="text-xl  font-medium  flex 
      items-center
      ml-20
      
        "
        >
          <h1 className=" text-2xl font-bold py-4 ">Prescription list</h1>
          {
            /* Checking if the data is loaded and if it is loaded it will display the table. */
            prescriptions && prescriptions.length > 0 ? (
              <h1
                className="text-2xl text-cyan-300
              font-medium ml-3"
              >
                {" "}
                {prescriptions.length}{" "}
              </h1>
            ) : (
              <h1 className="text-2xl text-cyan-300 font-medium  ml-2"> 0 </h1>
            )
          }
        </div>

        <div className="text-xl  font-medium  ml-20">
          <h1> All prescriptions you have written</h1>{" "}
          <h1>
            {" "}
            since you joined the platform
            <span className="text-cyan-300 font-medium ml-2">
              {Doctor.user.createdAt
                .slice(0, 10)
                .split("-")
                .reverse()
                .join("-")}
            </span>
          </h1>
        </div>
        <h1 className=" "></h1>
        <h1 className=" text-xl   ml-20"></h1>
      </div>

      {
        /* Checking if the data is loaded and if it is loaded it will display the table. */
        prescriptions && prescriptions.length > 0 ? (
          <div
            className="relative overflow-x-auto shadow-md sm:rounded-lg 
      mx-20
     
       p-5"
          >
            <table className="w-full text-sm text-left  ">
              <thead className="bg-gray-200">
                <tr className=" uppercase text-sm leading-normal">
                  <th className="py-2 px-4 font-medium text-gray-700">
                    Patient Name
                  </th>
                  <th className="py-2 px-4 font-medium text-gray-700">
                    Date of Prescription
                  </th>

                  <th className="py-2 px-4 font-medium text-gray-700">
                    medication
                  </th>
                  <th className="py-2 px-4 font-medium text-gray-700">
                    dosage
                  </th>
                  <th className="py-2 px-4 font-medium text-gray-700">
                    frequency
                  </th>
                  <th className="py-2 px-4 font-medium text-gray-700">
                    duration
                  </th>
                  <th className="py-2 px-4 font-medium text-gray-700">notes</th>
                  <th className="py-2 px-4 font-medium text-gray-700">
                    refills
                  </th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription: any) => (
                  <tr
                    key={prescription._id}
                    className="hover:bg-gray-100 border-b border-gray-200 py-10"
                  >
                    <td className="py-2 px-4">
                      {prescription.patient.name.firstName}{" "}
                      {prescription.patient.name.LastName}
                    </td>
                    <td className="py-2 px-4">
                      {prescription.createdAt
                        .slice(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")}
                    </td>
                    <td className="py-2 px-4">{prescription.medication}</td>
                    <td className="py-2 px-4">{prescription.dosage}</td>
                    <td className="py-2 px-4">{prescription.frequency}</td>
                    <td className="py-2 px-4">{prescription.duration}</td>
                    <td className="py-2 px-4">{prescription.notes}</td>
                    <td className="py-2 px-4">{prescription.refills}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div
            className="flex 
        flex-col
        items-center
        justify-center
        h-full
        text-gray-400
        
        
          "
          >
            No prescriptions yet
            <img
              src={img}
              alt="no prescriptions"
              className="
          mt-4
          md:h-3/4
         
          w-4/12
    h-4/12
  
      
        
            "
            />
          </div>
        )
      }
    </div>
  );
};

export default Prescription;
