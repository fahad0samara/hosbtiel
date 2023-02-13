import img from "../../assets/Appointment.png";
import {FcOvertime} from "react-icons/fc";
import {BsAlarm} from "react-icons/bs";
const Appointment = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
        upcoming Appointment
      </h1>
      <div className="grid grid-cols-3 gap-12 rounded-2xl h-80">
        <div className="rounded-2xl col-span-1  shadow-cyan-300 shadow-sm ">
          <img
            src={img}
            alt="Appointment"
            className="rounded-t-2xl h-40 w-full object-cover"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg font-bold">Miracle hospital</h1>
            <p className="text-sm font-bold text-cyan-300  mb-4">
              cypress
              <br />
            </p>
          </div>
        </div>
        <div className="grid grid-rows-3 gap-12 w-96 h-80">
          <div className="grid grid-cols-3 gap-5 items-center ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU"
              alt="avatar"
              //avatar
              className="
              rounded-full
            h-14
              w-14
              object-cover
              ml-4
              mt-4
              shadow-cyan-300
              shadow-sm

                
              "
            />
            <h1>
              <span className="text-cyan-300 font-bold">Dr. </span>
              <span className="font-bold">John Doe</span>
            </h1>
            <button
              className="
              rounded-2xl
              shadow-cyan-300
              shadow-sm
              bg-cyan-300
              text-white
              font-bold
              p-2
              "
            >
              information
            </button>
          </div>
          <div className="rounded-2xl  shadow-cyan-300 shadow-sm bg-gray-200  ">
            <div className="grid grid-cols-2 gap-5  p-4">
              <div className="flex flex-row justify-center items-center space-x-2">
                <div
                  className="
                  bg-white
                  rounded-full
                  h-10

                  w-10
                  flex
                  flex-row
                  justify-center
                  items-center
                  "
                >
                  {" "}
                  <BsAlarm className="text-xl text-red-500" />
                </div>

                <h1 className="text-sm font-bold ml-2">10:00 AM</h1>
              </div>

              <div className="flex flex-row justify-center items-center space-x-2 ">
                <div
                  className="
                  bg-white
                  rounded-full
                  h-10

                  w-10
                  flex
                  flex-row
                  justify-center
                  items-center
                  "
                >
                  {" "}
                  <FcOvertime className="text-xl text-sky-400" />
                </div>

                <h1 className="text-sm font-bold ">
                  {new Date().toLocaleDateString()}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
