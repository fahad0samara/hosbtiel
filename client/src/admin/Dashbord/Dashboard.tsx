import React from "react";
import {useLogIN} from "../../../ContextLog";
import Stats from "./Stats";
import Example from "./Exmple";

function Dashboard() {
  const {
    logPatient,

    Profile,
    setProfile,

    setLoading,
    dark,
    setdark,
  } = useLogIN();

  return (
    <div
      className="
      flex flex-col items-center justify-center"
      style={{
        backgroundColor: dark ? "#000" : "#fff",
        color: dark ? "#fff" : "#000",
      }}
    >
      <h1>Dashboard</h1>
      <Stats />
    </div>
  );
}

export default Dashboard;
