import React, {useState, useEffect} from "react";
import axios from "axios";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from "react-icons/bs";
import {useLogIN} from "../../../../../../ContextLog";
import "./Table.css";
import FileSaver from "file-saver";
import {useParams} from "react-router-dom";
import {patient} from "../../../../../types";
const Table = () => {
  let {id} = useParams();
  const {Doctor, dark} = useLogIN();
  const [prescriptions, setPrescriptions] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/admin/doctor/Prescription/${id}`
        );
        const data = await response.json();
        setPrescriptions(data.prescription);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);

        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);

  const downloadPrescription = async prescriptionId => {
    setLoading(true);
    console.log(prescriptionId);
    try {
      const res = await axios.get(
        `http://localhost:3000/admin/doctor/prescriptions/download/${prescriptionId}/${id}`,
        {
          responseType: "arraybuffer",
        }
      );
      FileSaver.saveAs(
        new Blob([res.data], {type: "application/pdf"}),
        `Prescription ${prescriptionId}.pdf`
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //downloadPrescription

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
      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader  ease-linear rounded-full border-8 border-t-8 border-gray-200 h-12 w-12 mb-4 animate-spin"></div>
        </div>
      ) : prescriptions && prescriptions.length > 0 ? (
        <>
          <table className="mx-auto md:ml-10 lg:ml-4 table md:-mt-24">
            <caption className="text-cyan-300 font-bold tablecaption ">
              {" "}
              Prescription History
            </caption>
            <thead>
              <tr>
                <th scope="col"> PATIENT NAME</th>
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
              {prescriptions.map(prescription => (
                <tr key={prescription._id}>
                  <td data-label="PATIENT NAME">
                    {prescription.patient.name.firstName}
                  </td>
                  <td data-label="Refills">{prescription.refills}</td>
                  <td data-label="Dosage">{prescription.dosage}</td>
                  <td data-label="Duration">{prescription.duration}</td>
                  <td data-label="Frequency">{prescription.frequency}</td>
                  <td data-label="Medication">{prescription.medication}</td>
                  <td data-label="Notes">{prescription.notes}</td>
                  <td data-label=" Actions">
                    {loading ? (
                      <div className="flex justify-center items-center">
                        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mb-4"></div>
                      </div>
                    ) : (
                      <button
                        className="bg-cyan-300 text-white rounded-md px-2 py-1"
                        onClick={() => downloadPrescription(prescription._id)}
                      >
                        Download
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div className="md:-mt-24 flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold text-center my-3 text-cyan-300">
            Prescription History
          </h1>
          <p className="text-gray-500 text-center ml-11">
            The doctor does not have any Prescription
          </p>
        </div>
      )}
    </div>
  );
};

export default Table;
