import img from "../../assets/Appointment.png";
import {FcOvertime} from "react-icons/fc";
import {BsAlarm} from "react-icons/bs";
const Appointment = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
        upcoming Appointment
      </h1>
      <div className="grid grid-cols-3 gap-10 rounded-2xl ">
        <div className="rounded-2xl h-32 w-40">
          <img
            src={img}
            alt="Appointment"
            className="
          rounded-2xl
          shadow-60
w-60
          object-cover"
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-lg font-bold">Miracle hospital</h1>
            <p className="text-sm font-bold text-cyan-300  mb-4">
              cypress
              <br />
            </p>
          </div>
        </div>
        <div className="grid grid-rows-3 gap-4  w-80 mt-7">
          <div className="grid grid-cols-3  items-center  ml-3">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU"
              alt="avatar"
              //avatar
              className=" rounded-full shadow-cyan-300 h-12 w-12 object-cover shadow-sm"
            />
            <h1 className="-ml-8 text-lg font-bold">Dr. John Doe</h1>
            <button className=" bg-cyan-300 rounded-full h-8 w-20">
              <h1 className="text-sm font-bold text-white">View</h1>
            </button>
          </div>
          <div
            className="bg-gray-200/60 rounded-t-3xl
            mt-1
            rounded-b-3xl"
          >
            <div className="grid grid-cols-2 gap-5  p-4">
              <div className="flex flex-row justify-center items-center space-x-1">
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

      <div>
        <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
          patients activities
        </h1>

        <div className="grid grid-cols-3 gap-10 rounded-2xl ">
          <div className="rounded-2xl h-32 w-40">
            <img
              src={img}
              alt="Appointment"
              className="
          rounded-2xl
          shadow-60
w-60
          object-cover"
            />
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-lg font-bold">Miracle hospital</h1>
              <p className="text-sm font-bold text-cyan-300  mb-4">
                cypress
                <br />
              </p>
            </div>
          </div>
          <div className="grid grid-rows-3 gap-4  w-80 mt-7">
            <div className="grid grid-cols-3  items-center  ml-3">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU"
                alt="avatar"
                //avatar
                className=" rounded-full shadow-cyan-300 h-12 w-12 object-cover shadow-sm"
              />
              <h1 className="-ml-8 text-lg font-bold">Dr. John Doe</h1>
              <button className=" bg-cyan-300 rounded-full h-8 w-20">
                <h1 className="text-sm font-bold text-white">View</h1>
              </button>
            </div>
            <div
              className="bg-gray-200/60 rounded-t-3xl
            mt-1
            rounded-b-3xl"
            >
              <div className="grid grid-cols-2 gap-5  p-4">
                <div className="flex flex-row justify-center items-center space-x-1">
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
    </div>
  );
};

export default Appointment;
