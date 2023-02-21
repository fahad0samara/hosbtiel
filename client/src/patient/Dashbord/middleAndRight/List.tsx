import {FcOvertime} from "react-icons/fc";
import Calendar from "./Calendar";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import { useLogIN } from "../../../../ContextLog";

const List = () => {
    const {
      logPatient,

      Profile,
      setProfile,
      Patient,

      dark,
      setdark,
    } = useLogIN();
  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
        List of appointments
      </h1>
      <Calendar />
      <div>
        <div
          style={{
            backgroundColor: dark ? "#000" : "#dbe6e7",
            color: dark ? "white" : "black",
            boxShadow: dark
              ? "0px 0px 5px 0px #ccc"
              : "0px 0px 10px 0px #ccc",
          }}
          className="bg-gray-200/60 
                  border-l-2
                  border-amber-400
                

          mx-2
            mt-1
            rounded-b-3xl
            p-3
            "
        >
          <div className="grid grid-cols-3  items-center  ml-3 ">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn8P6POnmXE2YJlFMqlJ-b2F_t8bdqTq4CAb-mQWDeI813MCCXefNOg9RjN2AQZwPzy3Y&usqp=CAU"
              alt="avatar"
              //avatar
              className=" rounded-full shadow-cyan-300 h-8 w-8 object-cover shadow-sm"
            />
            <div
              className="
             -ml-7 space-y-1
             text-center

            "
            >
              <h1 className="ml-1 italic">Dr. John Doe</h1>
              <h3 className="text-sm italic">10.00 20.00am</h3>
            </div>

            <div
              className="
                  bg-white
                  rounded-full
                  h-8
                  ml-7

                  w-10
                  flex
                  flex-row
                  justify-center
                  items-center
                  "
            >
              <IoIosArrowDroprightCircle className="text-2xl text-red-500" />
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default List;
