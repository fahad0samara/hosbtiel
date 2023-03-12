import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchDoctors() {
      setLoading(true);
      const response = await fetch("http://localhost:3000/admin/doctor", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      console.log(data);

      setDoctors(data.doctors);
      setLoading(false);
    }

    fetchDoctors();
  }, []);

  return (
    <div className="md:ml-28 mx-auto sm:ml-44   ml-16">
      {loading ? (
        <div className="flex justify-center items-center my-8">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="relative w-full  max-w-sm md:max-w-xl">
          <div className="m-8 relative ">
            {doctors.slice(0, 3).map(doctor => (
              <div
                key={doctor._id}
                className="p-1 hover:bg-cyan-300
                rounded-2xl my-3   border-2 flex items-center justify-between space-x-8"
              >
                <div>
                  <h2 className=" rounded-2xl">
                    <span className="font-medium">
                      {doctor.name.firstName} {doctor.name.LastName}
                    </span>
                  </h2>

                  <span className="ml-2">
                    {
                      //createdAt
                      doctor.user.createdAt
                        .toString()
                        .substring(0, 10)
                        .split("-")
                        .reverse()
                        .join("-")
                    }
                  </span>

                  <p className="text-sm font-medium text-gray-500">
                    {doctor.specialization}
                  </p>
                </div>
                <div className="">
                  <span
                    className={`py-1 px-2 rounded-full text-white text-md  text-center border-b border-gray-100 hover:bg-black hover:text-white ${
                      doctor.specialty === "Cardiologist" ? "bg-green-400" : ""
                    } ${doctor.specialty === "Dentist" ? "bg-rose-500" : ""}
                              ${
                                doctor.specialty === "Oncologist"
                                  ? "bg-cyan-500"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Pediatrician"
                                  ? "bg-rose-400"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Dermatologist"
                                  ? "bg-red-600"
                                  : ""
                              }${
                      doctor.specialty === "Endocrinologist"
                        ? "bg-purple-500"
                        : ""
                    }
                              ${
                                doctor.specialty === "Gastroenterologist"
                                  ? "bg-pink-300"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Psychiatrist"
                                  ? "bg-lime-300"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Pulmonologist"
                                  ? "bg-green-400"
                                  : ""
                              }
                              ${
                                doctor.specialty === "Neurologist"
                                  ? "bg-teal-300 "
                                  : ""
                              }
                              ${
                                doctor.specialty === "Rheumatologist"
                                  ? "bg-orange-500 "
                                  : ""
                              }${
                      doctor.specialty === "Urologist" ? "bg-teal-300 " : ""
                    }
                               ${
                                 doctor.specialty === "Gynecologist"
                                   ? "bg-yellow-500"
                                   : ""
                               }`}
                  >
                    {doctor.specialty}
                  </span>
                </div>
              </div>
            ))}
            <button
              className="
            bg-cyan-300
            hover:bg-cyan-400
            
             text-white font-bold py-2 px-4 rounded md:ml-28 ml-14"
              onClick={() => navigate("/admin/doctorList")}
            >
              View all doctors
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorList;
