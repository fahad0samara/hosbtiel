import {Link, Outlet, useNavigate} from "react-router-dom";
import {useState} from "react";
import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";

import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {RiDashboardFill} from "react-icons/ri";
import { useLogIN } from "../../ContextLog";

const SideNavigate = (_props: any) => {
    const {
      Profile,
      setProfile,

      setLoading,
      dark,
      setdark,
    } = useLogIN();
  const navigate = useNavigate();

  return (
    <SideNav
      /*  . */
      style={{
        backgroundColor: dark ? "#000" : "rgb(103 232 249)",

        boxShadow: dark
          ? "0px 0px 10px 0px rgb(103 232 249)  "
          : "0px 0px 10px 0px #000",
      }}
      onSelect={function (selected: string): void {
        // Add your code here
        if (selected === "dashboard") {
          navigate("/patient/dashboard");
        } else if (selected === "about") {
          navigate("/patient/about");
        } else if (selected === "appointment") {
          navigate("/patient/appointment");
        }

        // console.log(selected);
      }}
      className="
  h-full

      fixed

    
      top-0
      left-0
      
  z-50
  "
    >
      <SideNav.Toggle
        style={{
          color: dark ? "red" : "black",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      />
      <SideNav.Nav
        defaultOpenKeys={["dashboard"]}
        className="

        "
        style={{
          color: dark ? "white" : "black",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
        defaultSelected="dashboard"
      >
        <NavItem eventKey="dashboard">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: dark ? "rgb(103 232 249)" : "black",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",
              }}
            />
          </NavIcon>
          <NavText
            style={{
              color: dark ? "rgb(103 232 249)" : "black",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            dashboard
          </NavText>
        </NavItem>
        <NavItem eventKey="about">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: dark ? "rgb(103 232 249)" : "black",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",
              }}
            />
          </NavIcon>
          <NavText
            style={{
              color: dark ? "rgb(103 232 249)" : "black",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "1rem",
              marginTop: "1rem",
            }}
          >
            about
          </NavText>
        </NavItem>
        <NavItem eventKey="appointment">
          <NavIcon>
            <RiDashboardFill
              style={{
                color: dark ? "rgb(103 232 249)" : "black",
                fontSize: "1.8rem",
                fontWeight: "bold",
                marginLeft: "1rem",
                marginTop: "1rem",

              }}
            />
          </NavIcon>
          <NavText

            style={{
              color: dark ? "rgb(103 232 249)" : "black",
              fontSize: "0.9rem",
              fontWeight: "bold",
              marginLeft: "1rem",

              marginTop: "1rem",
            }}
          >
            appointment
          </NavText>
        </NavItem>
        
      
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavigate;
