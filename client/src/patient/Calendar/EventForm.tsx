import React, {useState, useEffect, useCallback} from "react";
import {useLogIN} from "../../../ContextLog";
import axios from "axios";
import moment from "moment-timezone";

const EventForm = () => {
  const [Loading, setLoading] = useState(false);
  const {Patient, dark} = useLogIN();
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleCreateEvent = async (e: {preventDefault: () => void}) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3000/Event/add-event`, {
        title,
        start,
        end,
        patient: Patient._id,
      });

      console.log("====================================");
      console.log("newEvent");
      console.log("====================================");
    } catch (error) {
      //@ts-ignore
      console.error(error.response.data);
    }
  };

  return (
    <div className="ml-12">
      <form onSubmit={handleCreateEvent}>
        <div className=" grid-cols-3 grid gap-20">
          <div className="mb-4">
            <label
              htmlFor="start_date"
              className="block text-gray-700 font-bold mb-2"
            >
              Event Title
            </label>
            <input
              className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight mt-1 focus:outline-none"
              id="title"
              placeholder="Event Title"
              type="text"
              name="title"
              value={title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
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
              className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="datetime-local"
              name="start_date"
              id="start_date"
              value={start}
              onChange={e => setStart(e.target.value)}
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
              className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
              type="datetime-local"
              name="end_date"
              id="end_date"
              onChange={e => setEnd(e.target.value)}
              required
              value={end}
            />
          </div>
        </div>

        <div className="flex items-center justify-center -ml-36 my-4">
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
