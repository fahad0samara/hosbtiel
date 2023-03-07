import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {useLogIN} from "../../../../ContextLog";
import Table from "./Table/Table";
import {BiTime} from "react-icons/bi";
import {FcCalendar} from "react-icons/fc";
import LeftSide from "../LeftPage/LeftSide";
import Appointment from "./Appointment";

import List from "./List";
import Loder from "../../../tools/Loder";

const RightSide = () => {
  const {
    Profile,
    Patient,

    dark,
    setdark,
  } = useLogIN();

  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const date = new Date();

    const hour = date.getHours();

    if (hour >= 0 && hour < 12) {
      setMessage("Good Morning");
    } else if (hour >= 12 && hour < 17) {
      setMessage("Good Afternoon");
    } else if (hour >= 17 && hour < 24) {
      setMessage("Good Evening");
    }
  }, []);

  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="">
      <div
        style={{
          backgroundColor: dark ? "#000" : "white",
          color: dark ? "white" : "black",
        }}
        className=""
      >
        <div
          className="grid lg:grid-cols-2 mt-8 mx-9
          
        grid-cols-1
        "
        >
          <div className="flex flex-col justify-center ">
            <h1 className="xl:text-2xl md:text-xl text-lg font-bold text-cyan-300  ">
              <span
                style={{
                  backgroundColor: dark ? "#000" : "white",
                  color: dark ? "white" : "black",
                }}
                className="xl:text-2xl md:text-xl text-xl font-bold mx-2"
              >
                {message}
              </span>

              {Patient ? Patient.name.firstName : ""}
            </h1>
            <h4 className="text-sm font-bold mt-1 md:ml-3 text-zinc-400  ">
              You'll be feeling healthy and strong again soon!
            </h4>
          </div>
          <div>
            <div className="flex flex-row justify-end items-center mr-20  md:mr-16 sm:mr-18 ">
              <div className="flex flex-row justify-center items-center">
                <BiTime className="sm:text-xl text-sm" />
                <h1 className="text-sm font-bold lg:ml-2">{time}</h1>
              </div>

              <div className="flex flex-row justify-center items-center ml-4 ">
                <FcCalendar className="text-xl" />
                <h1 className="text-sm font-bold ml-2">
                  {new Date().toLocaleDateString()}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div
          className="grid lg:grid-cols-3


    md:grid-cols-2
    grid-cols-1

    
    sm:mx-auto
         md:gap-6  "
        >
          <div className="md:col-span-2 mx-auto col-span-1">
            <Appointment />
          </div>
          <div className="md:col-span-1 col-span-1 mx-auto md:-mr-40 lg:-ml-10 lg:mx-8">
            {
              //    List of appointments{}
              // calender
            }
            <List />
          </div>
        </div>
        <Table />
      </div>
    </div>
  );
};

export default RightSide;
