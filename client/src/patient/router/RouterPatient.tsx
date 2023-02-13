import {Routes, Route} from "react-router-dom";
import SideNavigate from "./SideNavigate";
import Dashboard from "../Dashbord/Dashbord";
import About from "../About";
import Appointment from "../AppointmentForm";
import Profile from "../profile/Profile";

const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="appointment" element={<Appointment />} />
        <Route path="Profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default RouterPatient;
