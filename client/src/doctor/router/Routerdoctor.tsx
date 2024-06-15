import {Routes, Route, useParams, useNavigate} from "react-router-dom";

import Dashboard from "../DashBord/Dashboard";
import SideNav from "./SideNavigate";
import DoctorProfile from "../Profile/DoctorProfile";
import MyCalendar from "../Calendar/MyCalendar";
import ViewPatient from "../../admin/List/patient/Profiel/ViewPatient";
import Prescription from "../Prescription/Prescription";
import PrescriptionTable from "../Prescription/PrescriptionTable";
import ListTable from "../PatientsList/ListTable";
import {useState, useEffect} from "react";
import WorkingHours from "../Calendar/WorkingHours";
import {useLogIN} from "../../../ContextLog";
import axios from "axios";
import FirstTimeLogin from "../FirstTimeLogin";



const Routerdoctor = () => {
  const {Doctor} = useLogIN();

  const [showDashboard, setShowDashboard] = useState(true); // Initially show the dashboard
  const [showFirstTimeLogin, setShowFirstTimeLogin] = useState(false);

  useEffect(() => {
    if (!Doctor) return;

    const checkFirstTimeLogin = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/doctor/checkFirstTimeLogin/${Doctor._id}`
        );
        const data = response.data;
        setShowFirstTimeLogin(!data.hasCompletedFirstTimeLogin);
      } catch (error) {
        console.error(error);
      }
    };

    checkFirstTimeLogin();

    const timerId = setTimeout(() => {
      setShowDashboard(false); // Hide the dashboard after 2 seconds
    }, 400);

    return () => clearTimeout(timerId); // Clear the timeout on unmount
  }, [Doctor]);

  const handleContinue = async () => {
    try {
      await axios.post(
        `http://localhost:3000/doctor/completeFirstTimeLogin/${Doctor._id}`,
        {
          doctorId: Doctor._id,
        }
      );
      setShowFirstTimeLogin(false);
      setShowDashboard(false); // Hide the dashboard after completing first-time login
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {showDashboard && (
        <div className="flex items-center justify-center h-screen">
          <h1>Loading dashboard...</h1>
        </div>
      )}
      {!showDashboard && (
        <>
          {showFirstTimeLogin ? (
            <FirstTimeLogin onContinue={handleContinue} />
          ) : (
            <div>
              <SideNav />
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="MyCalendar" element={<MyCalendar />} />
                <Route path="/doctor/:id" element={<DoctorProfile />} />
                <Route path="Prescription" element={<Prescription />} />
                <Route path="ListTable" element={<ListTable />} />
                <Route
                  path="PrescriptionTable"
                  element={<PrescriptionTable />}
                />
                <Route path="/ViewPatient/:id" element={<ViewPatient />} />
              </Routes>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Routerdoctor;
