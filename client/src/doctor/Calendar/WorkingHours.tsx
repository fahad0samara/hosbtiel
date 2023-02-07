import React, {useState} from "react";
import axios from "axios";
import {useLogIN} from "../../../ContextLog";

const WorkingHours = () => {
  const {Doctor, dark} = useLogIN();
  const [workingHours, setWorkingHours] = useState([
    {day: "", startTime: "", endTime: ""},
  ]);

  const handleAddWorkingHours = () => {
    setWorkingHours([...workingHours, {day: "", startTime: "", endTime: ""}]);
  };

  const handleDayChange = (e, index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].day = e.target.value;
    setWorkingHours(newWorkingHours);
  };

  const handleStartTimeChange = (e, index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].startTime = e.target.value;
    setWorkingHours(newWorkingHours);
  };

  const handleEndTimeChange = (e, index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].endTime = e.target.value;
    setWorkingHours(newWorkingHours);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3000/doctor/doctors/${Doctor._id}/working-hours`,
        {availableDaysAndHours: workingHours},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
  ];

  return (
    <form className="w-full max-w-sm " onSubmit={handleSubmit}>
      {workingHours.map((workingHour, index) => (
        <div key={index} className="my-4">
          <label className="block font-bold mb-2">Day:</label>
          <select
            value={workingHour.day}
            onChange={e => handleDayChange(e, index)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Select a day</option>
            {days.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <label className="block font-bold mb-2">Start Time:</label>
          <select
            value={workingHour.startTime}
            onChange={e => handleStartTimeChange(e, index)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Select a start time</option>
            {times.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <label className="block font-bold mb-2">End Time:</label>
          <select
            value={workingHour.endTime}
            onChange={e => handleEndTimeChange(e, index)}
            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          >
            <option value="">Select an end time</option>
            {times.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddWorkingHours}
      >
        Add another day
      </button>
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Save
      </button>
    </form>
  );
};

export default WorkingHours;
