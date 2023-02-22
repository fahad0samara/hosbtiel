import React, {useState, useCallback} from "react";

const EventForm = ({handleCreateEvent}) => {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const handleTitleChange = useCallback(e => {
    setNewEventTitle(e.target.value);
  }, []);

  const handleStartDateChange = useCallback(e => {
    setSelectedStartDate(new Date(e.target.value));
  }, []);

  const handleEndDateChange = useCallback(e => {
    setSelectedEndDate(new Date(e.target.value));
  }, []);

  return (
    <form onSubmit={handleCreateEvent} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Event Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={newEventTitle}
          onChange={handleTitleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="start_date"
          className="block text-gray-700 font-bold mb-2"
        >
          Start Date
        </label>
        <input
          type="datetime-local"
          name="start_date"
          id="start_date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleStartDateChange}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="end_date"
          className="block text-gray-700 font-bold mb-2"
        >
          End Date
        </label>
        <input
          type="datetime-local"
          name="end_date"
          id="end_date"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          onChange={handleEndDateChange}
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create Event
        </button>
      </div>
    </form>
  );
};

export default EventForm;
