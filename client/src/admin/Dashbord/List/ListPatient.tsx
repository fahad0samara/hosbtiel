import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function ListPatient() {
  const [patient, setpatient] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    async function fetchDoctors() {
      setLoading(true);
      const response = await fetch("http://localhost:3000/admin/patient", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setLoading(false);

      setpatient(data.patients);
    }

    fetchDoctors();
  }, []);

  return (
    <div className="md:ml-28 sm:ml-12 sm:ml-44      ml-16 mx-auto">
      {loading ? (
        <div className="flex justify-center items-center my-8">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="relative w-full md:max-w-xl max-w-sm">
          <div className="m-8 relative ">
            {patient.slice(0, 3).map(patients => (
              <div
                key={patients._id}
                className="p-1 hover:bg-cyan-300 rounded-2xl my-3 border-2 flex items-center justify-between space-x-8"
              >
                <div>
                  <h2 className="rounded-2xl">
                    <span className="font-medium">
                      {patients.name.firstName} {patients.name.LastName}
                    </span>
                  </h2>
                  <span className="ml-2">
                    {patients.user.createdAt
                      .toString()
                      .substring(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </span>
                </div>
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
              </div>
            ))}
            <button
              className="
            bg-cyan-300
            hover:bg-cyan-400
            
             text-white font-bold py-2 px-4 rounded md:ml-28 ml-14"
              onClick={() => navigate("/admin/patientList")}
            >
              View all patient
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListPatient;
