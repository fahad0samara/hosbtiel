import {Routes, Route} from "react-router-dom";
import SideNavigate from "./SideNavigate";

import Dashboard from "../Dashbord/Dashboard";
import DoctorList from "../List/DoctorList";
import Edit from "../rgister_Edit/Edit";
import NotFound from "../NotFound";
import ViewDr from "../List/Doctor/ViewDr";
import RegisterDr from "../rgister_Edit/RegisterDr";
import PatientList from "../List/PatientList";
import ViewPatient from "../List/ViewPatient";
import ViewPrescription from "../ViewPrescription";

const RouterPatient = () => {
  return (
    <div>
      <SideNavigate />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="RegisterDr" element={<RegisterDr />} />
        <Route path="doctorList" element={<DoctorList />} />
        <Route path="patientList" element={<PatientList />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/Edit/:id" element={<Edit />} />
        <Route path="/ViewDr/:id" element={<ViewDr />} />
        <Route path="/ViewPatient/:id" element={<ViewPatient />} />
        <Route
          path="/ViewPrescription/:id/:prescriptionId"
          element={<ViewPrescription />}
        />

        <Route path="/RegisterDr/:id" element={<RegisterDr />} />
      </Routes>
    </div>
  );
};

export default RouterPatient;
