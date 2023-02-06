import axios from "axios";

const Ediet = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found in local storage");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:3000/doctor/doctors/${Doctor._id}/working-hours`,
        {
          availableDays,
          startTime: workingHours.start,
          endTime: workingHours.end,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLoading(false);
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Available Days:</label>
          <div>
            <input type="checkbox" value="Monday" onChange={handleDayChange} />
            Monday
          </div>
          <div>
            <input type="checkbox" value="Tuesday" onChange={handleDayChange} />
            Tuesday
          </div>
          <div>
            <input
              type="checkbox"
              value="Wednesday"
              onChange={handleDayChange}
            />
            Wednesday
          </div>
          <div>
            <input
              type="checkbox"
              value="Thursday"
              onChange={handleDayChange}
            />
            Thursday
          </div>
          <div>
            <input type="checkbox" value="Friday" onChange={handleDayChange} />
            Friday
          </div>
          <div>
            <input
              type="checkbox"
              value="Saturday"
              onChange={handleDayChange}
            />
            Saturday
          </div>
          <div>
            <input type="checkbox" value="Sunday" onChange={handleDayChange} />
            Sunday
          </div>
        </div>
        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            name="start"
            onChange={handleTimeChange}
            value={workingHours.start}
          />
        </div>
        <div className="form-group">
          <label>End Time:</label>
          <input
            type="time"
            name="end"
            onChange={handleTimeChange}
            value={workingHours.end}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Ediet;
