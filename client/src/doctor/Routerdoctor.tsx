
import {Routes, Route, useParams} from "react-router-dom";


import Dashboard from "./Dashboard";
import SideNav from "./SideNavigate";
import DoctorProfile from "./DoctorProfile";
import MyCalendar from "./MyCalendar";
import ViewPatient from "../admin/List/ViewPatient";
import Chart from "./Chart";

const Routerdoctor = () => {



  return (
    <div>
      <SideNav />

      <Routes>
        <Route path="Chart" element={<Chart />} />
        <Route
          path="MyCalendar"

          element={<MyCalendar />} />

        <Route path="/doctor/:id" element={<DoctorProfile />} />
        <Route path="/ViewPatient/:id" element={<ViewPatient />} />
      </Routes>


      
    </div>
  );
};

export default Routerdoctor;