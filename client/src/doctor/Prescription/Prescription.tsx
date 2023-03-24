import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLogIN} from "../../../ContextLog";
import PrescriptionTable from "./PrescriptionTable";
import Loder from "../../tools/Loder";

const Prescription = () => {
  const {Doctor, dark} = useLogIN();

const [patients, setPatients] = useState<
  Array<{_id: string; name: {firstName: string; lastName: string}}>
>([]);

const [medication, setMedication] = useState("");
const [dosage, setDosage] = useState("");
const [frequency, setFrequency] = useState("");
const [duration, setDuration] = useState("");
const [date, setDate] = useState("");
const [notes, setNotes] = useState("");
const [refills, setRefills] = useState("");

const [selectedpatient, setSelectedpatient] = useState("");

const [loading, setLoading] = useState(false);

const [errorMessage, setErrorMessage] = useState("");

useEffect(() => {
  setLoading(true);
  axios
    .get(`http://localhost:3000/doctor/all-patient/${Doctor._id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })

    .then(res => {
      setPatients(res.data.patients);
      setLoading(false);
    })

    .catch(err => {
      console.log(
        err.response.data ? err.response.data : "Error in getting patients"
      );

      setErrorMessage(
        err.response.data && err.response.data.error
          ? err.response.data.error
          : "Error in getting patients"
      );

      setLoading(false);
    });
}, []);

const handleSubmit = async (e: {preventDefault: () => void}) => {
  e.preventDefault();

  try {
    setLoading(true);
    const response = await axios.post(
      "http://localhost:3000/doctor/Prescription",
      {
        doctor: Doctor._id,
        patient: selectedpatient,
        medication,
        dosage,
        frequency,
        duration,
        date,
        notes,
        refills,
      }
    );
    setLoading(false);
  } catch (error) {
    //@ts-ignore

    setTimeout(() => {
      setErrorMessage("");
    }, 4000);
    //@ts-ignore
    setErrorMessage(error.response.data.error);

    console.log(
      //@ts-ignore
      error
    );
    setLoading(false);
  }
};
if (loading) {
  return (
    <div>
      <Loder />
    </div>
  );
}

return (
  <div
    style={{
      backgroundColor: dark ? "#000" : "#fff",
      color: dark ? "#fff" : "#000",
    }}
    className={`


       min-h-screen flex items-center justify-center`}
  >
    <div
      style={{
        boxShadow: dark
          ? "0px 0px 10px 0px rgb(103 232 249)"
          : "0px 0px 10px 0px rgb(103 232 249)",
      }}
      className="
    w-full lg:max-w-4xl md:max-w-xl max-w-md   shadow-cyan-300 rounded-2xl p-4 my  my-20"
    >
      {errorMessage && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      <div className="flex items-center justify-between ml-40 md:ml-0">
        <span className="text-gray-600 dark:text-gray-300 text-center">
          Prescription
        </span>
      </div>

      <h1 className="text-xl font-bold capitalize  text-center md:text-start">
        Add Prescription
      </h1>
      <h1>
        {loading ? (
          <div className="flex justify-center items-center">
            <div
              style={{
                borderTopColor: dark ? "#fff" : "#000",
              }}
              className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-300"
            ></div>
          </div>
        ) : (
          <form className="mt-4 ml-9" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 mx-16">
              <div>
                <label className="">Patient</label>
                <select
                  value={selectedpatient}
                  className="block w-full px-4 py-2 mt-2  border border-cyan-300 rounded-md bg-gray-800 text-cyan-300   focus:outline-none focus:ring"
                  onChange={e => {
                    if (e.target.value === "") {
                      setErrorMessage("Please select a patient");
                      setTimeout(() => {
                        setErrorMessage("");
                      }, 4000);
                      return;
                    }
                    setSelectedpatient(e.target.value);
                  }}
                >
                  <option value="">Select Patient</option>
                  {patients.map(
                    (patient): JSX.Element => (
                      <option key={patient._id} value={patient._id}>
                        {patient.name.firstName} {patient.name.lastName}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="">Medication</label>
                <input
                  value={medication}
                  id="medication"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  border-cyan-300 border-b-2 bg-transparent rounded-md cbg-gray-800 ctext-gray-300"
                  onChange={e => setMedication(e.target.value)}
                />
              </div>

              <div>
                <label className="c">Dosage</label>
                <input
                  value={dosage}
                  id="dosage"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  border-cyan-300 border-b-2 bg-transparent rounded-md cbg-gray-800 ctext-gray-300"
                  onChange={e => setDosage(e.target.value)}
                />
              </div>

              <div>
                <label className="c">Frequency</label>
                <input
                  value={frequency}
                  id="frequency"
                  type="text"
                  className="block w-full px-4 py-2 mt-2  border-cyan-300 border-b-2 bg-transparent rounded-md cbg-gray-800 ctext-gray-300"
                  onChange={e => setFrequency(e.target.value)}
                />
              </div>
              <div>
                <label className="c">Duration</label>
                <input
                  value={duration}
                  id="duration"
                  type="number"
                  className="block w-full px-4 py-2 mt-2  border-cyan-300 border-b-2 bg-transparent rounded-md cbg-gray-800 ctext-gray-300"
                  onChange={e => setDuration(e.target.value)}
                />
              </div>

              <div>
                <label className="">Refills</label>
                <input
                  value={refills}
                  id="date"
                  type="number"
                  className="block w-full px-4 py-2 mt-2  border-cyan-300 border-b-2 bg-transparent rounded-md cbg-gray-800 ctext-gray-300"
                  onChange={e => setRefills(e.target.value)}
                />
              </div>
              <div>
                <label className="c">Date</label>
                <input
                  id="date"
                  type="date"
                  className="block w-full px-4 py-2 mt-2  border-cyan-300 border-b-2 bg-transparent rounded-md cbg-gray-800 ctext-gray-300"
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              <div>
                <label className="c">Prescription Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  id="textarea"
                  className="block w-full px-4 py-2 mt-2 border-cyan-300  border  rounded-md  focus:border-cyan-300 focus:outline-none focus:ring"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-cyan-300"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm ">
                      <label className="relative cursor-pointer  rounded-md font-medium text-cyan-300 hover:text-cyan-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <span className="">Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1 ">or drag and drop</p>
                    </div>
                    <p className="text-xs ">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="px-6 py-2 leading-5 transition-colors duration-200 transform bg-cyan-300 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
                Save
              </button>
            </div>
          </form>
        )}
      </h1>
    </div>
  </div>
);
};

export default Prescription;
