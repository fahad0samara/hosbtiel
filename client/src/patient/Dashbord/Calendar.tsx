import React, {useState} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./clander.css";

const Calendarr = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const holidays = [new Date(2021, 12, 25), new Date(2022, 1, 1)];

  const tileClassName = ({date, view}) => {
    if (view === "month" && holidays.includes(date)) {
    }

    if (date.getTime() === selectedDate.getTime()) {
      return "selected-date";
    }

    return "";
  };

  const dateClassName = ({date, view}) => {
    if (view === "month" && holidays.includes(date)) {
      return "holiday";
    }
  };
  const dateClass = ({date, view}) => {
    if (view === "month" && holidays.includes(date)) {
      return "holiday";
    }

    if (date.getTime() === selectedDate.getTime()) {
      return "selected-date";
    }
  };

  const dateFormat = ({date, view}) => {
    if (view === "month" && holidays.includes(date)) {
      return "holiday";
    }
    if (
      view === "month" &&
      holidays.includes(date) &&
      !holidays.includes(date)
    ) {
      return "selected-date";
    }
  };

  const dateFormatShort = ({date, view}) => {
    if (view === "month" && holidays.includes(date)) {
      return "holiday";
    }
    if (
      view === "month" &&
      holidays.includes(date) &&
      !holidays.includes(date)
    ) {
      return "selected-date";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
        {" "}
        list of appointment
      </h1>
      <div>
        <Calendar
          onViewChange={
            view => {
              console.log(view);
            }
            // (view) => {
          }
          onChange={date => setSelectedDate(date)}
          value={selectedDate}
          tileClassName={tileClassName}
          dateClassName={dateClassName}
          dateFormat={dateFormat}
          dateFormatShort={dateFormatShort}
          className="
          text-cyan-300
          bg-gray-500
     
          border-2
          border-cyan-300
          rounded-md
          h-96
         

          shadow-lg
          hover:shadow-xl
          transition-shadow
          duration-300
          ease-in-out
          focus:outline-none
          focus:ring-2
          focus:ring-cyan-300
          focus:ring-opacity-75
      
      

          focus:ring-opacity-75-hover

        

          "
        />
      </div>
    </div>
  );
};

export default Calendarr;
