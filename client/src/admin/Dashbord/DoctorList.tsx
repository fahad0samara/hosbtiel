import {useState, useEffect} from "react";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    async function fetchDoctors() {
      const response = await fetch("http://localhost:3000/admin/doctor", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      setDoctors(data.doctors);
    }

    fetchDoctors();
  }, []);

  return (
    <div className="ml-28">
      <div className="relative w-full max-w-lg">
        <div className="m-8 relative ">
          {doctors.map(doctor => (
            <div
              key={doctor._id}
              className="p-6 rounded-2xl my-3  border-cyan-300 border-2 flex items-center justify-between space-x-8"
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
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
