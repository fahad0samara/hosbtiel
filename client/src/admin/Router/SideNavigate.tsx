// import {useState} from "react";
// import {Link, NavLink, useLocation} from "react-router-dom";
// import {IconContext} from "react-icons/lib";
// import {FaTimes} from "react-icons/fa";
// import {AiOutlineClose} from "react-icons/ai";
// import {AiOutlineMenu} from "react-icons/ai";
// import {AiOutlineCloseCircle} from "react-icons/ai";
// import {AiOutlineCloseSquare} from "react-icons/ai";
// import {useLogIN} from "../../ContextLog";
// function SideNavigate() {
//   const [showSidebar, setShowSidebar] = useState(true);
//   const location = useLocation();
//   const {
//     logPatient,

//     Profile,
//     setProfile,

//     setLoading,
//     dark,
//     setdark,
//   } = useLogIN();

//   return (
//     <div
//       style={{
//         backgroundColor: dark ? "#000" : "white",
//         color: dark ? "white" : "black",
//         boxShadow: dark
//           ? "0px 0px 10px 0px rgb(103 232 249)"
//           : "0px 0px 10px 0px #ccc",
//       }}
//     >
//       {showSidebar ? (
//         <button
//           className="
//           fixed z-30 flex items-center cursor-pointer left-10 top-6 text-4xl font-semibold
//           "
//           onClick={() => setShowSidebar(!showSidebar)}
//         >
//           x
//         </button>
//       ) : (
//         <AiOutlineMenu
//           onClick={() => setShowSidebar(!showSidebar)}
//           className="fixed

//              z-30 flex items-center cursor-pointer left-10 top-6"
//         />
//       )}

//       <div
//         style={{
//           backgroundColor: dark ? "#000" : "white",
//           color: dark ? "white" : "black",
//           boxShadow: dark
//             ? "0px 0px 10px 0px rgb(103 232 249)"
//             : "0px 0px 10px 0px #ccc",
//         }}
//         className={`
//         fixed  top-0
//         min-h-screen flex
//         flex-col items-center justify-between
//         left-0 h-screen w-48  transition-all duration-500 ease-in-out transform
//         ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
//       >
//         <nav
//           className="flex flex-col items-center mt-36
//           w-full h-full
//           "
//         >
//           <ul>
//             <li
//               className="flex items-center justify-center
//                 text-2xl
//                 "
//             >
//               <NavLink
//                 to="/admin/dashboard"
//                 activeClassName={
//                   location.pathname === "/admin/dashboard" ? "active" : ""
//                 }
//               >
//                 Dashboard
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/admin/RegisterDr"
//                 activeClassName={
//                   location.pathname === "/admin/RegisterDr" ? "active" : ""
//                 }
//               >
//                 Register Doctor
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/admin/doctorList"
//                 activeClassName={
//                   location.pathname === "/admin/doctorList" ? "active" : ""
//                 }
//               >
//                 Doctor List
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/admin/patientList"
//                 activeClassName={
//                   location.pathname === "/admin/patientList" ? "active" : ""  //  <---  This is the problem
//                 }
//               >
//                 Patient List
//               </NavLink>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// // }

// export default SideNavigate;
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
import {FaClipboardList, FaRegIdCard} from "react-icons/fa";
import {GoChecklist} from "react-icons/go";

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
          navigate("/admin/dashboard");
        } else if (selected === "RegisterDr") {
          navigate("/admin/RegisterDr");
        } else if (selected === "doctorList") {
          navigate("/admin/doctorList");
        } else if (selected === "patientList") {
          navigate("/admin/patientList");
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
            Dashboard
          </NavText>
        </NavItem>
        <NavItem eventKey="RegisterDr">
          <NavIcon>
            <FaRegIdCard
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
            Register Doctor
          </NavText>
        </NavItem>
        <NavItem eventKey="doctorList">
          <NavIcon>
            <FaClipboardList
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
            Doctor List
          </NavText>
        </NavItem>
        <NavItem eventKey="patientList">
          <NavIcon>
            <GoChecklist
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
            Patient List
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
