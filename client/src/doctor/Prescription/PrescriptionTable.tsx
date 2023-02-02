import React, {useState, useEffect} from "react";
import axios from "axios";

import {useLogIN} from "../../../ContextLog";
import {useTable, usePagination} from "react-table";
function PrescriptionTable() {
  const {Doctor, dark} = useLogIN();

  const [Prescription, setPrescription] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchPrescription = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/doctor/Prescription/${Doctor._id}`
        );
        console.log("====================================");
        console.log("res.data in PrescriptionTable.tsx", res.data);
        console.log("====================================");
        setPrescription(res.data);

        setLoading(false);
      } catch (error) {
        console.log("====================================");
        console.log("error in PrescriptionTable.tsx", error);
        console.log("====================================");
        setError(true);
        setLoading(false);
      }
    };
    fetchPrescription();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <h1>Prescription</h1>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Doctor Name</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Dosage</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Instruction</th>
            <th className="px-4 py-2">Medication</th>
            <th className="px-4 py-2">Notes</th>
            <th className="px-4 py-2">Refills</th>
            <th className="px-4 py-2">Download</th>
          </tr>
        </thead>
        <tbody>
          {Prescription
            ? Object.values(Prescription).map(prescription => (
                <tr key={prescription._id}>
                  <td className="border px-4 py-2">
                    {prescription.patient.firstName}
                  </td>
                  <td className="border px-4 py-2">
                    {new Date(prescription.date).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="border px-4 py-2">{prescription.dosage}</td>
                  <td className="border px-4 py-2">{prescription.duration}</td>
                  <td className="border px-4 py-2">{prescription.frequency}</td>
                  <td className="border px-4 py-2">
                    {prescription.medication}
                  </td>
                  <td className="border px-4 py-2">{prescription.notes}</td>
                  <td className="border px-4 py-2">{prescription.refills}</td>
                  <td className="border px-4 py-2">
                    <a
                      href={`http://localhost:3000/doctor/Prescription/${prescription._id}/download`}
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default PrescriptionTable;
