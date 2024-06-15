import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLogIN} from "../../ContextLog";
import {FaMinus, FaPlus} from "react-icons/fa";

const FirstTimeLogin = ({onContinue}) => {
  const [hoursSubmitted, setHoursSubmitted] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleContinue = () => {
    if (hoursSubmitted) {
      onContinue();
    }
  };
  const {Doctor, dark} = useLogIN();
  const [workingHours, setWorkingHours] = useState([
    {day: "", startTime: "", endTime: ""},
  ]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState<string>("");

  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleAddWorkingHours = () => {
    if (workingHours.length < 7) {
      setWorkingHours([...workingHours, {day: "", startTime: "", endTime: ""}]);
    }
  };

  const handleDayChange = (e, index) => {
    const newWorkingHours = [...workingHours];
    newWorkingHours[index].day = e.target.value;

    if (selectedDays.includes(e.target.value)) {
      setError("You can't select the same day twice");
      setTimeout(() => {
        setError("");
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
        setError("");
      }, 3000);
    } else {
      setError("");
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
        setError("");
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

        setHasError(false);
        setHoursSubmitted(true);
        setTimeout(() => {
          setSuccess("");
        }, 3000);
      } catch (error) {
        console.log(error);
        //@ts-ignore
        setError(error.response.data.message);
        setLoading(false);
        setHasError(true);
        setHoursSubmitted(false);

        setTimeout(() => {
          setError("");
        }, 3000);
      }
    } else {
      setError(
        "Please fill all the fields correctly and make sure the end time is after the start time."
      );

      setTimeout(() => {
        setError("");
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
      style={{
        backgroundColor: dark ? "#000" : "#FFF",
        color: dark ? "white" : "black",
      }}
      className="p-9
      h-screen
     
      "
    >
      <div
        className="flex
      flex-col
       justify-between items-center"
      >
        <h1 className="text-3xl">Welcome, Doctor!</h1>
        <p className="text-xl">
          This is your first time logging in.
          <br />
        </p>
        <p className="text-xl">Please add your working hours to continue.</p>
      </div>

      <div>
        <div className="md:flex flex-wrap">
          <form className="w-full flex-1" onSubmit={handleSubmit}>
            {workingHours.map((workingHour, index) => (
              <div key={index} className="my-4 flex flex-wrap items-center">
                <select
                  style={{
                    backgroundColor: dark ? "#000" : "#FFF",
                    color: dark ? "white" : "black",
                  }}
                  className="w-full md:w-1/4 rounded-md border-cyan-300 border p-2"
                  onChange={e => handleDayChange(e, index)}
                >
                  <option value="" disabled selected>
                    Select day
                  </option>
                  {days.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>

                <select
                  style={{
                    backgroundColor: dark ? "#000" : "#FFF",
                    color: dark ? "white" : "black",
                  }}
                  className="w-full md:w-1/4 mt-4 md:mt-0 md:mx-2 rounded-md border-cyan-400 border p-2"
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
                  style={{
                    backgroundColor: dark ? "#000" : "#FFF",
                    color: dark ? "white" : "black",
                  }}
                  className="w-full md:w-1/4 mt-4 md:mt-0 md:mx-2 rounded-md border-cyan-400 border p-2"
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
          </form>

          <div className="flex flex-wrap justify-center   items-center space-x-4">
            <button
              type="button"
              className="bg-red-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              onClick={() =>
                setWorkingHours(
                  workingHours.filter(
                    // clear until 1
                    (workingHour, i) => i !== workingHours.length - 1
                  )
                )
              }
            >
              <FaMinus className="inline-block mr-2" />
              Clear
            </button>

            <button
              type="button"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded"
              onClick={handleAddWorkingHours}
            >
              <FaPlus className="inline-block mr-2" />
              Add more days
            </button>
          </div>
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
          {success ? (
            <p className="text-green-500 text-xl font-bold italic">
              Working hours saved successfully!
            </p>
          ) : (
            <>
              {!error && workingHours.length > 0 && (
                <p className="text-xl font-bold italic flex flex-col justify-center">
                  Working hours:
                  {workingHours.map((workingHour, index) => (
                    <span key={index}>
                      {" "}
                      {workingHour.day} {workingHour.startTime} -{" "}
                      {workingHour.endTime}
                    </span>
                  ))}
                </p>
              )}
              {error ? (
                <button
                  type="submit"
                  className="bg-gray-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  disabled
                >
                  Submit
                </button>
              ) : !loading ? (
                <button
                  type="submit"
                  className="bg-cyan-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                  onClick={handleSubmit}
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center mt-3">
                  <p className="">Loading...</p>
                </div>
              )}
            </>
          )}

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
      {hoursSubmitted ? (
        <div
          className="flex
        flex-col  
         items-center justify-center mt-3"
        >
          <h1
            className={`text-2xl font-bold ${
              hoursSubmitted ? "text-green-500" : "text-red-500"
            }`}
          >
            {hoursSubmitted
              ? "You can now continue"
              : "Please submit your working hours"}
          </h1>
          <h2>
            {hoursSubmitted
              ? "You can change your working hours anytime in the calender"
              : "You can change your working hours anytime"}
          </h2>

          <button
            className={`bg-${
              hoursSubmitted ? "cyan-300 hover:bg-blue-700" : null
            }  text-white font-bold py-2 px-4 rounded-xl mt-3`}
            onClick={handleContinue}
            disabled={!hoursSubmitted || hasError}
          >
            Continue
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FirstTimeLogin;
