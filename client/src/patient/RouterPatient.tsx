import { Routes, Route } from "react-router-dom";
import SideNavigate from "./SideNavigate";
import Dashboard from "./Dashbord";
import About from "./About";
import Appointment from "./AppointmentForm";









const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />
  
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="about" element={<About />} />
        <Route path="appointment" element={<Appointment />} />
      </Routes>
    </div>
  );
};

export default RouterPatient;