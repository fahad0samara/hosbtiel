import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLogIN} from "../../ContextLog";

const Prescription = () => {
  const {Doctor, dark} = useLogIN();

  const [patients, setPatients] = useState([]);
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
    const fetchpatients = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/doctor/patients"
        );
        setPatients(response.data);
        setLoading(false);
        console.log("response", response.data);
      } catch (error) {
        setLoading(false);

        console.log(error);
      }
    };

    fetchpatients();
  }, []);

  const handleSubmit = async (e: {preventDefault: () => void}) => {
    console.log("====================================");
    console.log("selectedpatient", selectedpatient);
    console.log("====================================");
    e.preventDefault();

    try {
      console.log("====================================");
      console.log("ffff");
      console.log("====================================");
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

      console.log("response", response.data);
      console.log("====================================");

      console.log("response", response.data);
    } catch (error) {
      //@ts-ignore

      //delettheerrormassage after2s
      setTimeout(() => {
        setErrorMessage("");
      }, 4000);

      setErrorMessage(error.response.data.error);

      console.log(
        //@ts-ignore
        error
      );
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl p-6 mx-auto bg-indigo-600 rounded-md shadow-md  mt-20">
      <h1 className="text-xl font-bold text-white capitalize ctext-white">
        Prescription
      </h1>

      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
          <div>
            <label className="text-white ctext-gray-200">Patient</label>
            <select
              value={selectedpatient}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
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
              {patients.map(patient => (
                <option key={patient._id} value={patient._id}>
                  {patient.name.firstName} {patient.name.lastName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white ctext-gray-200">Medication</label>
            <input
              value={medication}
              id="medication"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
              onChange={e => setMedication(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white ctext-gray-200">Dosage</label>
            <input
              value={dosage}
              id="dosage"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
              onChange={e => setDosage(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white ctext-gray-200">Frequency</label>
            <input
              value={frequency}
              id="frequency"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
              onChange={e => setFrequency(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white ctext-gray-200">Duration</label>
            <input
              value={duration}
              id="duration"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
              onChange={e => setDuration(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white ctext-gray-200">Refills</label>
            <input
              value={refills}
              id="date"
              type="number"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
              onChange={e => setRefills(e.target.value)}
            />
          </div>
          <div>
            <label className="text-white ctext-gray-200">Date</label>
            <input
              id="date"
              type="date"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
            />
          </div>
          <div>
            <label className="text-white ctext-gray-200">
              Prescription Notes
            </label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              id="textarea"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md cbg-gray-800 ctext-gray-300 cborder-gray-600 focus:border-blue-500 cfocus:border-blue-500 focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-white">
              Image
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-white"
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
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span className="">Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1 text-white">or drag and drop</p>
                </div>
                <p className="text-xs text-white">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-pink-500 rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">
            Save
          </button>
        </div>
      </form>
    </section>
  );
};

export default Prescription;
