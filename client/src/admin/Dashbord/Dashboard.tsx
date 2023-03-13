import React from "react";
import {useLogIN} from "../../../ContextLog";
import Stats from "./Stats";

import {FcCalendar} from "react-icons/fc";
import {BiTime} from "react-icons/bi";
import {useEffect, useState} from "react";
import DoctorList from "./List/DoctorList";

import ListPatient from "./List/ListPatient";

function Dashboard() {
  const {dark} = useLogIN();
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
    <div
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <div
        className="grid lg:grid-cols-2 
       px-16
      
      
        
          
        grid-cols-1
        "
      >
        <div className="flex flex-col justify-center  mt-10 ml-16 items-center md:items-start">
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

            <span className="text-zinc-400">Admin</span>
          </h1>
          <h4 className="text-sm font-bold mt-1 md:ml-3 text-zinc-400  ">
            Welcome to your dashboard
          </h4>
        </div>
        <div>
          <div className="flex flex-row justify-end items-center ml-20  md:mr-16 sm:mr-18 lg:mt-14">
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

      <Stats />
      <div className="grid lg:grid-cols-2 mt-8 ">
        <div>
          <h1 className="text-2xl text-center">Last Doctor</h1>
          <DoctorList />
        </div>
        <div>
          <h1 className="text-2xl text-center">Last Patient</h1>
          <ListPatient />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
