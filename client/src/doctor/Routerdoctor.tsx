
import {Routes, Route, useParams} from "react-router-dom";


import Dashboard from "./Dashboard";
import SideNav from "./SideNavigate";
import DoctorProfile from "./DoctorProfile";
import MyCalendar from "./MyCalendar";

const Routerdoctor = () => {



  return (
    <div>
      <SideNav />

      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route
          path="MyCalendar"

          element={<MyCalendar />} />
        {
          // pass the actual id value here
          //http://localhost:3000/doctor/doctors/63af46e39b3184d62a652f4e
        }
        <Route path="/doctor/:id" element={<DoctorProfile />} />
      </Routes>


      
    </div>
  );
};

export default Routerdoctor;