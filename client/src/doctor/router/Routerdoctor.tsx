import {Routes, Route, useParams} from "react-router-dom";

import Dashboard from "../DashBord/Dashboard";
import SideNav from "./SideNavigate";
import DoctorProfile from "../Profile/DoctorProfile";

import ViewPatient from "../../admin/List/patient/Profiel/ViewPatient";
import Prescription from "../Prescription/Prescription";
import PrescriptionTable from "../Prescription/PrescriptionTable";
import ListTable from "../PatientsList/ListTable";
import MyCalendar from "../Calendar/MyCalendar";

const Routerdoctor = () => {
  return (
    <div>
      <SideNav />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="MyCalendar" element={<MyCalendar />} />

        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="Prescription" element={<Prescription />} />
        <Route path="ListTable" element={<ListTable />} />
        <Route path="PrescriptionTable" element={<PrescriptionTable />} />
        <Route path="/ViewPatient/:id" element={<ViewPatient />} />
      </Routes>
    </div>
  );
};

export default Routerdoctor;
