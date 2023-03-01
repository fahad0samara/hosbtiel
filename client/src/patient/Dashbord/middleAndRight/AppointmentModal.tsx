import {useLogIN} from "../../../../ContextLog";

const AppointmentModal = ({appointmentData, onClose}) => {
  const {Profile, Patient, dark, setdark} = useLogIN();
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen">
        <div
          style={{
            backgroundColor: dark ? "#000" : "white",
            color: dark ? "white" : "black",
          }}
          className="relative bg-white rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3  mx-16 ml-24"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-cyan-300 ">
              Appointment Details
            </h1>
            <p className="border-b-2  w-48 mx-auto"></p>
            <div className="mb-4">
              <p className="font-semibold text-cyan-300">Doctor:</p>
              <p>
                {appointmentData.doctor.name.firstName}{" "}
                {appointmentData.doctor.name.lastName}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-cyan-300">Specialty:</p>
              <p>{appointmentData.doctor.specialty}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-cyan-300">Appointment Date:</p>
              <p>
                {appointmentData.appointmentDate
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("-")}
              </p>
            </div>
            <div className="mb-4">
              <p className="font-semibold text-cyan-300">Appointment Time:</p>
              <p>{appointmentData.appointmentTime}</p>
            </div>

            <div className="mb-4">
              <p className="font-semibold text-cyan-300">Symptoms:</p>
              <p>{appointmentData.symptoms}</p>
            </div>
            <p className="border-b-2  w-48 mx-auto my-4"></p>
            <p className="text-sm text-center  italic">
              Please arrive on time for your appointment. If you are running
              late, please call the office to let us know.
            </p>
          </div>
          <div
            className="bg-cyan-300 px-6 py-1 flex justify-end
          "
          >
            <button
              style={{
                backgroundColor: dark ? "#000" : "white",
                color: dark ? "white" : "black",
              }}
              className="px-4 py-2 rounded-md duration-300  
                hover:bg-cyan-300 hover:text-white focus:outline-none focus:ring-2 
                focus:ring-cyan-300 focus:ring-opacity-75
                sm:w-full md:w-auto"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
