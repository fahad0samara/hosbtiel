import React, {useState} from "react";
import axios from "axios";
import {useLogIN} from "../../../ContextLog";

const WorkingHours = () => {
  const {Doctor, dark} = useLogIN();
  const [workingHours, setWorkingHours] = useState([
    {day: "", startTime: "", endTime: ""},
  ]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(null);

  const [selectedDays, setSelectedDays] = useState([]);

  const handleAddWorkingHours = () => {
    if (workingHours.length < 7) {
      setWorkingHours([...workingHours, {day: "", startTime: "", endTime: ""}]);
    }
  };

  const handleDayChange = (e, index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].day = e.target.value;

    if (selectedDays.includes(e.target.value)) {
      setError("This day has already been selected, please choose another day");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      setSelectedDays([...selectedDays, e.target.value]);
      setWorkingHours(newWorkingHours);
    }
  };

  const handleStartTimeChange = (e, index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].startTime = e.target.value;
    setWorkingHours(newWorkingHours);
  };

  const handleEndTimeChange = (e, index) => {
    const newWorkingHours = [...workingHours];
    const startTime = newWorkingHours[index].startTime;
    const endTime = e.target.value;

    if (times.indexOf(endTime) <= times.indexOf(startTime)) {
      setError("End time must be after start time");
      setTimeout(() => {
        setError(null);
      }, 3000);
    } else {
      setError(null);
    }

    newWorkingHours[index].endTime = endTime;
    setWorkingHours(newWorkingHours);
  };
  const handleSubmit = async e => {
    e.preventDefault();

    let isValid = true;
    workingHours.forEach(dayAndHour => {
      if (
        dayAndHour.day === "" ||
        dayAndHour.startTime === "" ||
        dayAndHour.endTime === ""
      ) {
        isValid = false;
      }
      if (
        times.indexOf(dayAndHour.endTime) <= times.indexOf(dayAndHour.startTime)
      ) {
        isValid = false;
      }
    });
    const days = workingHours.map(dayAndHour => dayAndHour.day);
    if (new Set(days).size !== days.length) {
      isValid = false;

      setError("You can't select the same day twice");
      setTimeout(() => {
        setError(null);
      }, 3000);
      return;
    }

    if (isValid) {
      setLoading(true);

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
        setSuccess("Your working hours have been added successfully");
        setLoading(false);

        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setLoading(false);

        setTimeout(() => {
          setError(null);
        }, 3000);
      }
    } else {
      setError(
        "Please fill all the fields correctly and make sure the end time is after the start time."
      );

      setTimeout(() => {
        setError(null);
      }, 3000);
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
    <div
      className={`${dark ? "bg-black" : "bg-gray-100"}
      ${dark ? "text-white" : "text-black"} 
      grid-cols-3
      my-10
      grid

   
      
      
       `}
    >
      <div>
        <h1
          className={`${dark ? "text-white" : "text-black "} text-xl font-bold
              text-center
          
            `}
        >
          Add your working hours and days
        </h1>
        <h4
          className="
        text-center
    
        text-gray-500

    
        "
        >
          Please select your working days and hours
        </h4>
      </div>

      <div className=" my-8 ml-28  ">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          {workingHours.map((workingHour, index) => (
            <div key={index} className="flex my-3">
              <select
                className={`${dark ? "bg-black" : "bg-gray-100"}
      ${dark ? "text-white" : "text-black"} 
      border border-gray-400 rounded p-2 mr-3`}
                value={workingHour.day}
                onChange={e => handleDayChange(e, index)}
              >
                <option value="" disabled>
                  Select day
                </option>
                {days.map(day => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>

              <select
                className={`${dark ? "bg-black" : "bg-gray-100"}
      ${dark ? "text-white" : "text-black"} 
      border border-gray-400 rounded p-2 mr-3`}
                value={workingHour.startTime}
                onChange={e => handleStartTimeChange(e, index)}
              >
                <option value="" disabled>
                  Start Time
                </option>
                {times.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <select
                className={`${dark ? "bg-black" : "bg-gray-100"}
      ${dark ? "text-white" : "text-black"} 
      border border-gray-400 rounded p-2 mr-3`}
                value={workingHour.endTime}
                onChange={e => handleEndTimeChange(e, index)}
              >
                <option value="" disabled>
                  End Time
                </option>
                {times.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div
            className={`${dark ? "bg-black" : "bg-gray-100"} 
            ${dark ? "text-white" : "text-black"}
            flex flex-col mt-3
            `}
          >
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() =>
                setWorkingHours(
                  workingHours.filter(
                    // clear until 1
                    (workingHour, i) => i !== workingHours.length - 1
                  )
                )
              }
            >
              Clear
            </button>

            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
              type="button"
              onClick={handleAddWorkingHours}
            >
              Add more days
            </button>

            {
              //if there erorr dibibld the btn
              error && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                  type="submit"
                  disabled
                >
                  Submit
                </button>
              )
            }
            {
              //if there is no error and loading is false
              !error && !loading && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                  type="submit"
                >
                  Submit
                </button>
              )
            }
          </div>
        </form>
      </div>
      <div
        className="px-2 py-2 border-b
        
               text-center"
      >
        {workingHours.length === 0 && (
          <p className="text-red-500 text-2xl font-bold">
            Please add at least one day
          </p>
        )}
        {error && (
          <p className="text-red-500 text-2xl font-bold">
            {
              // error
              error
            }
          </p>
        )}
        {
          // loading
          loading && (
            <p className="text-green-500 text-2xl font-bold">
              {
                // loading
                loading
              }
            </p>
          )
        }

        {
          // if there erorr dont show the workings
          !error &&
            workingHours.length > 0 &&
            workingHours.map((workingHour, index) => (
              <p key={index}>
                {workingHour.day} {workingHour.startTime} {workingHour.endTime}
              </p>
            ))
        }

        {
          // success
          !error && workingHours.length > 0 && (
            <p className="text-green-500 text-2xl font-bold">
              {
                // success
                success
              }
            </p>
          )
        }
      </div>
    </div>
  );
};

export default WorkingHours;