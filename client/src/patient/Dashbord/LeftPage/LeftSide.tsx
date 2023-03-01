import React from "react";
import img from "../../../assets/LeftSide.png";
import {FcCalendar} from "react-icons/fc";
import {useLogIN} from "../../../../ContextLog";
const LeftSide = () => {
  const {
    logPatient,

    Profile,
    setProfile,
    Patient,

    dark,
    setdark,
  } = useLogIN();
  return (
    <div className="ml-16 ">
      <div className="mt-12 flex flex-col justify-center ">
        <h1 className="text-lg font-semibold lg:ml-3">Check your condition</h1>
        <p className="text-sm font-normal text-gray-500 mt-2 lg:ml-5">
          Check your every situation{" "}
        </p>
        <p className="text-sm font-normal text-gray-500  ml-12">
          and your actives
        </p>
        <div className="flex flex-row justify-center items-center mr-7">
          <button className="bg-cyan-300 text-white font-semibold rounded-2xl shadow-md px-4 py-2 mt-4 ml-2">
            cheek it Now
          </button>
        </div>
      </div>

      <img
        src={img}
        alt="leftsid"
        className="mt-10
                w-96 h-96
                
                
                
                
                
                

              "
      />
    </div>
  );
};

export default LeftSide;
