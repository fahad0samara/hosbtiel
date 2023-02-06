// // import axios from "axios";

// // const Ediet = () => {
// //   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem("token");
// //     if (!token) {
// //       console.log("Token not found in local storage");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const response = await axios.post(
// //         `http://localhost:3000/doctor/doctors/${Doctor._id}/working-hours`,
// //         {
// //           availableDays,
// //           startTime: workingHours.start,
// //           endTime: workingHours.end,
// //         },

// //         {
// //           headers: {
// //             Authorization: `Bearer ${localStorage.getItem("token")}`,
// //           },
// //         }
// //       );

// //       setLoading(false);
// //     } catch (error) {
// //       console.log("error", error);
// //       setLoading(false);
// //     }
// //   };
// //   return (
// //     <div>
// //       <form onSubmit={handleSubmit}>
// //         <div className="form-group">
// //           <label>Available Days:</label>
// //           <div>
// //             <input type="checkbox" value="Monday" onChange={handleDayChange} />
// //             Monday
// //           </div>
// //           <div>
// //             <input type="checkbox" value="Tuesday" onChange={handleDayChange} />
// //             Tuesday
// //           </div>
// //           <div>
// //             <input
// //               type="checkbox"
// //               value="Wednesday"
// //               onChange={handleDayChange}
// //             />
// //             Wednesday
// //           </div>
// //           <div>
// //             <input
// //               type="checkbox"
// //               value="Thursday"
// //               onChange={handleDayChange}
// //             />
// //             Thursday
// //           </div>
// //           <div>
// //             <input type="checkbox" value="Friday" onChange={handleDayChange} />
// //             Friday
// //           </div>
// //           <div>
// //             <input
// //               type="checkbox"
// //               value="Saturday"
// //               onChange={handleDayChange}
// //             />
// //             Saturday
// //           </div>
// //           <div>
// //             <input type="checkbox" value="Sunday" onChange={handleDayChange} />
// //             Sunday
// //           </div>
// //         </div>
// //         <div className="form-group">
// //           <label>Start Time:</label>
// //           <input
// //             type="time"
// //             name="start"
// //             onChange={handleTimeChange}
// //             value={workingHours.start}
// //           />
// //         </div>
// //         <div className="form-group">
// //           <label>End Time:</label>
// //           <input
// //             type="time"
// //             name="end"
// //             onChange={handleTimeChange}
// //             value={workingHours.end}
// //           />
// //         </div>
// //         <button type="submit">Save</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Ediet;

// import React, {useState} from "react";

// const DoctorAvailabilityForm = () => {
//   const [selectedDay, setSelectedDay] = useState("");
//   const [selectedTime, setSelectedTime] = useState("");
//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];
//   const times = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//   ];

//   const handleDayChange = event => {
//     setSelectedDay(event.target.value);
//   };

//   const handleTimeChange = event => {
//     setSelectedTime(event.target.value);
//   };

//   return (
//     <form>
//       <div>
//         <label>Available Days:</label>
//         <select value={selectedDay} onChange={handleDayChange}>
//           <option value="">-- Select a Day --</option>
//           {days.map(day => (
//             <option key={day} value={day}>
//               {day}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label>Available Time:</label>
//         <select
//           value={selectedTime}
//           onChange={handleTimeChange}
//           disabled={!selectedDay}
//         >
//           <option value="">-- Select a Time --</option>
//           {times.map(time => (
//             <option key={time} value={time}>
//               {time}
//             </option>
//           ))}
//         </select>
//       </div>
//     </form>
//   );
// };

// export default DoctorAvailabilityForm;

// import React, {useState} from "react";

// const DoctorAvailability = () => {
//   const [selectedDays, setSelectedDays] = useState([]);

//   const handleDaySelection = day => {
//     if (selectedDays.includes(day)) {
//       setSelectedDays(selectedDays.filter(d => d !== day));
//     } else {
//       setSelectedDays([...selectedDays, day]);
//     }
//   };

//   const handleTimeSelection = (day, startTime, endTime) => {
//     setSelectedDays(
//       selectedDays.map(selectedDay => {
//         if (selectedDay.day === day) {
//           return {...selectedDay, startTime, endTime};
//         }
//         return selectedDay;
//       })
//     );
//   };

//   const days = [
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//     "Sunday",
//   ];

//   const times = [
//     "9:00 AM",
//     "10:00 AM",
//     "11:00 AM",
//     "12:00 PM",
//     "1:00 PM",
//     "2:00 PM",
//     "3:00 PM",
//     "4:00 PM",
//     "5:00 PM",
//   ];

//   return (
//     <div>
//       <h2>Select Days</h2>
//       <div>
//         <input
//           type="checkbox"
//           value="Monday"
//           checked={selectedDays.includes("Monday")}
//           onChange={() => handleDaySelection("Monday")}
//         />
//         Monday
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           value="Tuesday"
//           checked={selectedDays.includes("Tuesday")}
//           onChange={() => handleDaySelection("Tuesday")}
//         />
//         Tuesday
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           value="Wednesday"
//           checked={selectedDays.includes("Wednesday")}
//           onChange={() => handleDaySelection("Wednesday")}
//         />
//         Wednesday
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           value="Thursday"
//           checked={selectedDays.includes("Thursday")}
//           onChange={() => handleDaySelection("Thursday")}
//         />
//         Thursday
//       </div>
//       <div>
//         <input
//           type="checkbox"
//           value="Friday"
//           checked={selectedDays.includes("Friday")}
//           onChange={() => handleDaySelection("Friday")}
//         />
//         Friday
//       </div>
//       {selectedDays.map(selectedDay => (
//         <div key={selectedDay.day}>
//           <h3>{selectedDay.day}</h3>
//           <div>
//             Start Time:{" "}
//             <input
//               type="time"
//               value={selectedDay.startTime}
//               onChange={e =>
//                 handleTimeSelection(
//                   selectedDay.day,
//                   e.target.value,
//                   selectedDay.endTime
//                 )
//               }
//             />
//           </div>
//           <div>
//             End Time:{" "}
//             <input
//               type="time"
//               value={selectedDay.endTime}
//               onChange={e =>
//                 handleTimeSelection(
//                   selectedDay.day,
//                   selectedDay.startTime,
//                   e.target.value
//                 )
//               }
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DoctorAvailability;

import React, {useState} from "react";
import axios from "axios";
import {useLogIN} from "../../ContextLog";

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
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          workingHours,
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
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      onSubmit={handleSubmit}
    >
      {workingHours.map((workingHour, index) => (
        <div key={index}>
          <label>Day:</label>
          <select
            value={workingHour.day}
            onChange={e => handleDayChange(e, index)}
          >
            <option value="">Select a day</option>
            {days.map(day => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
          <label>Start Time:</label>
          <select
            value={workingHour.startTime}
            onChange={e => handleStartTimeChange(e, index)}
          >
            <option value="">Select a start time</option>
            {times.map(time => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <label>End Time:</label>
          <select
            value={workingHour.endTime}
            onChange={e => handleEndTimeChange(e, index)}
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
      <button type="button" onClick={handleAddWorkingHours}>
        Add another day
      </button>
      <button type="submit">Save</button>
    </form>
  );
};

export default WorkingHours;

//           <label>
//             Start Time:
//             <input
//               type="text"
//               value={workingHour.startTime}
//               onChange={e => handleStartTimeChange(e, index)}
//             />
//           </label>
//           <label>
//             End Time:
//             <input
//               type="text"
//               value={workingHour.endTime}
//               onChange={e => handleEndTimeChange(e, index)}
//             />
//           </label>
//         </div>
//       ))}
//       <button type="button" onClick={handleAddWorkingHours}>
//         Add another day
//       </button>
//       <button type="submit">Save</button>
//     </form>
//   );
// };

// export default WorkingHours;
