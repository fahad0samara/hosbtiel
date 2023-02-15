import React, {useState} from "react";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState({});

  const handleDayClick = day => {
    const dateStr = day.toISOString().slice(0, 10);
    const event = prompt("Enter an event for " + dateStr);
    if (event) {
      setEvents(prevEvents => {
        const prevEventsForDate = prevEvents[dateStr] || [];
        return {
          ...prevEvents,
          [dateStr]: [...prevEventsForDate, event],
        };
      });
    }
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      width: "300px",
      height: "400px",
      padding: "1rem",
    },
    month: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textShadow: "6px 6px 2px rgba(39, 244, 245, 0.8)",
    },
    weekdays: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 1fr)",
      marginBottom: "0.5rem",
      width: "100%",
      textAlign: "center",
      textShadow: "6px 6px 2px rgba(39, 244, 245, 0.8)",
    },
    weekday: {
      fontWeight: "bold",
    },
    days: {
      display: "grid",
      gridTemplateColumns: "repeat(7, 2fr)",
      gridTemplateRows: "repeat(6, 2fr)",
      width: "100%",
      height: "100%",

      gridGap: "0.5rem", // adjust the gap between cells he
    },
    day: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "2rem",
      margin: "0.5rem",

      fontSize: "0.8rem",
      fontWeight: "bold",
      borderRadius: "0.4rem",

      cursor: "pointer",

      boxShadow: "3px 3px 6px rgba(39, 244, 245, 0.8)",
    },
    today: {
      backgroundColor: "orange",
      color: "white",
      fontWeight: "bold",
      boxShadow:
        "0 0 0 2px white, 0 0 0 4px black, 0 0 0 5px white, 0 0 0 6px orange",
    },
    selected: {
      backgroundColor: "blue",
      color: "white",
    },
  };

  const sunday = {
    gridColumnStart: 1,
    gridColumnEnd: 2,
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',

    textAlign: "center",
    backgroundColor: "rgba(247, 0, 0, 0.8)",
    color: "white",
    boxShadow: "2px 3px 3px rgba(39, 244, 245, 00)",
  };

  const getDateRange = (month, year) => {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    const days = [];
    for (
      let date = startDate;
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      days.push(new Date(date));
    }
    return days;
  };

  const handleDayClickk = day => {
    setSelectedDate(day);
  };

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const dateRange = getDateRange(currentMonth, currentYear);

  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
        List of appointments
      </h1>
      <div
        className="


      "
      >
        {" "}
        <div style={styles.container}>
          <div style={styles.weekdays}>
            {days.map((day, index) => (
              <div key={index} style={styles.weekday}>
                {day}
              </div>
            ))}
          </div>
          <div style={styles.days}>
            {dateRange.map((day, index) => {
              const dateStr = day.toISOString().slice(0, 10);
              const eventsForDate = events[dateStr] || [];
              return (
                <div
                  key={index}
                  style={{
                    ...styles.day,
                    ...(day.getMonth() === currentMonth ? {} : {opacity: 0.5}),
                    ...(day.getDay() === 0 ? sunday : {}),
                    ...(day.toDateString() === today.toDateString()
                      ? styles.today
                      : {}),
                    ...(selectedDate &&
                    day.toDateString() === selectedDate.toDateString()
                      ? styles.selected
                      : {}),
                  }}
                  onClick={() => handleDayClick(day)}
                >
                  <div>{day.getDate()}</div>
                  {eventsForDate.length > 0 && (
                    <div style={styles.eventDot}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
