import {useEffect, useState} from "react";
import {useLogIN} from "../../../ContextLog";
import axios from "axios";

const Stats = () => {
  const {Patient, dark} = useLogIN();
  const [loading, setLoading] = useState(false);
  const [appointment, setappointment] = useState();
  const [prescriptions, setprescriptions] = useState();
  const [events, setevents] = useState();
  const [lastPrescriptionDate, setlastPrescriptionDate] = useState();
  const [lastAppointmentDate, setlastAppointmentDate] = useState();

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/user/stats/${Patient._id}`
        );
        setappointment(res.data.appointments);
        setprescriptions(res.data.prescriptions);
        setevents(res.data.events);
        setlastPrescriptionDate(res.data.lastPrescriptionDate);
        setlastAppointmentDate(res.data.lastAppointmentDate);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, [Patient._id]);

  return (
    <div className="grid lg:grid-cols-4 gap-4 grid-cols-1 ">
      <div className="grid grid-cols-2 gap-3">
        <div className=" flex flex-col justify-center items-center p-1">
          <h1 className="font-bo italic text-center mb-2">lastPrescription</h1>
          <h2>
            {lastPrescriptionDate ? (
              loading ? (
                "Loading..."
              ) : (
                <span className="    text-lg">{lastPrescriptionDate}</span>
              )
            ) : (
              <span>0</span>
            )}
          </h2>
        </div>
        <div className=" flex flex-col justify-center items-center p-1">
          <h1 className="font-bo italic text-center mb-2">lastAppointment</h1>
          <h2>
            {lastAppointmentDate ? (
              loading ? (
                "Loading..."
              ) : (
                <span className="    text-lg">{lastAppointmentDate}</span>
              )
            ) : (
              <span>0</span>
            )}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className=" flex flex-col justify-center items-center p-1">
          <h1 className="font-bo italic text-center mb-2">Appointment</h1>
          <h2>
            {appointment ? (
              loading ? (
                "Loading..."
              ) : (
                <span className="    text-lg">{appointment}</span>
              )
            ) : (
              <span>0</span>
            )}
          </h2>
        </div>
        <div className=" flex flex-col justify-center items-center p-1">
          <h1 className="font-bo italic text-center mb-2">Prescriptions</h1>
          <h2>
            {prescriptions ? (
              loading ? (
                "Loading..."
              ) : (
                <span>{prescriptions}</span>
              )
            ) : (
              <span>0</span>
            )}
          </h2>
        </div>

        <div className=" flex flex-col justify-center items-center p-1">
          <h1 className="font-bo italic text-center mb-2">event</h1>
          <h2>
            {events ? (
              loading ? (
                "Loading..."
              ) : (
                <span>{events}</span>
              )
            ) : (
              <span>0</span>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Stats;
