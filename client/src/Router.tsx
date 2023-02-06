import {Routes, Route} from "react-router-dom";


import Hero from "./Home/Hero";
import RouterPatient from "./patient/RouterPatient";
import {useLogIN} from "../ContextLog";
import RouterAdmin from "./admin/RouterAdmin";
import Register from "./Home/auth/Register";
import Login from "./Home/auth/Login";
import RegisterPatient from "./patient/auth/RegisterPatient";
import Routerdoctor from "./doctor/router/Routerdoctor";

const Router = () => {
  const { logPatient, logAdmin,
    logDr,
    setlogAdmin, setlogPatient } = useLogIN();

  return (
    <Routes>
      {logPatient && <Route path="/patient/*" element={<RouterPatient />} />}
      {logAdmin && <Route path="/admin/*" element={<RouterAdmin />} />}
      {logDr && <Route path="/doctor/*" element={<Routerdoctor />} />}

      <Route path="/" element={<Hero />} />

      <Route path="/RegisterPatient" element={<RegisterPatient />} />

      <Route path="/Register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Router;
