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
import {RiDashboardFill, RiLogoutBoxRLine} from "react-icons/ri";
import {useLogIN} from "../../../ContextLog";
import {BsCalendarDate} from "react-icons/bs";
import {FaFilePrescription} from "react-icons/fa";
import {TbCheckupList} from "react-icons/tb";
import {CgProfile, CgUserList} from "react-icons/cg";

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
        } else if (selected === "ListAppointments") {
          navigate("/patient/ListAppointments");
        } else if (selected === "MyCalendar") {
          navigate("/patient/MyCalendar");
        } else if (selected === "Profile") {
          navigate("/patient/Profile");
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
        <NavItem eventKey="MyCalendar">
          <NavIcon>
            <BsCalendarDate
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
            MyCalendar
          </NavText>
        </NavItem>

        <NavItem eventKey="appointment">
          <NavIcon>
            <FaFilePrescription
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
            appointments
          </NavText>
        </NavItem>
        <NavItem eventKey="ListAppointments">
          <NavIcon>
            <TbCheckupList
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
            ListAppointments
          </NavText>
        </NavItem>

        <NavItem eventKey="Profile">
          <NavIcon>
            <CgProfile
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
            Profile
          </NavText>
        </NavItem>

        <NavItem eventKey="logout">
          <NavIcon>
            <RiLogoutBoxRLine
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
            Logout
          </NavText>
        </NavItem>
      </SideNav.Nav>
    </SideNav>
  );
};

export default SideNavigate;
