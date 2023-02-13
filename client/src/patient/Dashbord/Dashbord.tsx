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
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";

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
      className="grid grid-cols-4
    h-screen
    w-screen



    "
    >
      <div className="col-span-1 bg-[#dbe6e7] border-r-2  p-2">
        <LeftSide />
      </div>
      <div className=" col-span-3  p-1">
        <RightSide />
      </div>
    </div>
  );
};

export default Dashboard;
