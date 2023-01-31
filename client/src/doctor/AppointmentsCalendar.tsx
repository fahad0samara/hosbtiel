import React, {useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Appointment {
  date: Date;
  patientName: string;
  type: "appointment" | "holiday" | "meeting";
}

const appointments: Appointment[] = [
  {date: new Date(2023, 1, 1), type: "holiday", patientName: ""},
  {date: new Date(2023, 1, 15), type: "appointment", patientName: "John Doe"},
  {date: new Date(2023, 1, 20), type: "meeting", patientName: "Jane Doe"},
];

const App = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const handleClick = (date: Date) => setSelectedDate(date);

  const appointmentForSelectedDate = appointments.find(
    appointment =>
      appointment.date.toDateString() === selectedDate?.toDateString()
  );

  return (
    <div>
      <Calendar
        onClickDay={handleClick}
        value={selectedDate}
        tileContent={({date, view}) => {
          const appointment = appointments.find(
            appointment =>
              appointment.date.toDateString() === date.toDateString()
          );

          if (!appointment) {
            return null;
          }

          switch (appointment.type) {
            case "appointment":
              return (
                <div style={{backgroundColor: "yellow", height: "100%"}}>
                  <p>{appointment.patientName}</p>
                </div>
              );
            case "holiday":
              return <span style={{backgroundColor: "red"}}>H</span>;
            case "meeting":
              return <span style={{backgroundColor: "blue"}}>M</span>;
            default:
              return null;
          }
        }}
      />
      {appointmentForSelectedDate && (
        <div>
          <p>Selected date: {selectedDate?.toDateString()}</p>
          <p>Type: {appointmentForSelectedDate.type}</p>
          <p>Patient Name: {appointmentForSelectedDate.patientName}</p>
        </div>
      )}
    </div>
  );
};

export default App;
