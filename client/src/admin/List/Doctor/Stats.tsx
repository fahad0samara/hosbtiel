import {useEffect, useState} from "react";

import axios from "axios";
import {useLogIN} from "../../../../ContextLog";
import {useParams} from "react-router-dom";

const Stats = () => {
  const {id} = useParams();
  const {Doctor, dark} = useLogIN();
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
        const res = await axios.get(`http://localhost:3000/admin/stats/${id}`);
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
  }, [id]);

  return (
    <div
      className={
        "grid lg:grid-cols-4  text-center order-last md:order-first mt-20 md:mt-0"
      }
    >
      {" "}
      <div>
        <p className="font-bold  text-xl">
          {lastPrescriptionDate ? (
            loading ? (
              "Loading..."
            ) : (
              <span className="    text-lg">{lastPrescriptionDate}</span>
            )
          ) : (
            <span>0</span>
          )}
        </p>{" "}
        <p className="text-gray-400">lastPrescription</p>{" "}
      </div>{" "}
      <div>
        {" "}
        <p className="font-bold  text-xl">
          {lastAppointmentDate ? (
            loading ? (
              "Loading..."
            ) : (
              <span className="    text-lg">{lastAppointmentDate}</span>
            )
          ) : (
            <span>0</span>
          )}
        </p>{" "}
        <p className="text-gray-400">lastAppointment</p>{" "}
      </div>{" "}
      <div>
        {" "}
        <p className="font-bold  text-xl">
          {prescriptions ? (
            loading ? (
              "Loading..."
            ) : (
              <span>{prescriptions}</span>
            )
          ) : (
            <span>0</span>
          )}
        </p>{" "}
        <p className="text-gray-400">Prescriptions</p>{" "}
      </div>
      <div>
        {" "}
        <p className="font-bold  text-xl">
          {appointment ? (
            loading ? (
              "Loading..."
            ) : (
              <span className="    text-lg">{appointment}</span>
            )
          ) : (
            <span>0</span>
          )}
        </p>{" "}
        <p className="text-gray-400">Appointment</p>{" "}
      </div>{" "}
    </div>
  );
};

export default Stats;
