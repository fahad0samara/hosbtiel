import {Link, useNavigate} from "react-router-dom";
import {
  JSXElementConstructor,
  ReactElement,
  ReactFragment,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import {useLogIN} from "../../../ContextLog";
import Table from "../Table";
import {BiTime} from "react-icons/bi";
import {FcCalendar} from "react-icons/fc";
import LeftSide from "./LeftPage/LeftSide";
import RightSide from "./middleAndRight/RightSide";

const Dashboard = (props: any) => {
  const {
    Profile,
    Patient,

    dark,
    setdark,
  } = useLogIN();
  return (
    <div
      style={{
        backgroundColor: dark ? "#000" : "white",
        color: dark ? "white" : "black",
      }}
      className="grid lg:grid-cols-4
    h-screen
    w-screen
    md:grid-cols-3




    "
    >
      <div
        style={{
          backgroundColor: dark ? "#000" : "#dbe6e7",
          boxShadow: dark
            ? "0px 0px 10px 0px rgb(103 232 249)"
            : "0px 0px 10px 0px #ccc",
        }}
        className="col-span-1   p-2  hidden md:block   bg-[#dbe6e7]
   "
      >
        <LeftSide />
      </div>
      <div className=" lg:col-span-3  sm:col-span-2 sm:mx-auto ml-14">
        <RightSide />
      </div>
    </div>
  );
};

export default Dashboard;
