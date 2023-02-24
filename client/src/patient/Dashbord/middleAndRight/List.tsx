import {FcOvertime} from "react-icons/fc";
import Calendar from "./Calendar";
import {IoIosArrowDroprightCircle} from "react-icons/io";
import { useLogIN } from "../../../../ContextLog";
import moment from "moment-timezone";
import {useState} from "react";
import {Link} from "react-router-dom";
const List = () => {
  const {
    logPatient,

    Profile,
    setProfile,
    Patient,

    dark,
    Events,
    setdark,
  } = useLogIN();
  const [showAllEvents, setShowAllEvents] = useState(false);
  const numEventsToShow = showAllEvents ? Events.length : 2;
  return (
    <div>
      <h1 className="text-2xl font-bold text-cyan-300 mt-4 mb-4">
        List of appointments
      </h1>
      <Calendar />

      <div>
        {Events.length > 0 ? (
          <ul className="list-disc space-y-8">
            {Events.slice(0, numEventsToShow).map((event, index) => (
              <>
                <div
                  style={{
                    backgroundColor: dark ? "#000" : "#dbe6e7",
                    color: dark ? "white" : "black",
                    boxShadow: dark
                      ? "0px 0px 5px 0px #ccc"
                      : "0px 0px 10px 0px #ccc",
                  }}
                  className="bg-gray-200/60 
                border-l-2
                border-amber-400
                mx-2
                mt-1
                rounded-b-3xl
                p-3"
                >
                  <div className="flex f items-center justify-between">
                    <div className="text-center">
                      <h1 className="ml-1 italic">{event.title}</h1>
                      <h3 className="text-sm italic">
                        {moment(event.start).format("MMM DD, YYYY")} to{" "}
                        {moment(event.end).format("MMM DD, YYYY")}
                      </h3>
                    </div>
                    <div
                      className="
                      bg-white
                      rounded-full
                      h-8
                      ml-7
                      w-10
                      flex
                      flex-row
                      justify-center
                      items-center
                    "
                    >
                      <IoIosArrowDroprightCircle className="text-2xl text-red-500" />
                    </div>
                  </div>
                </div>
              </>
            ))}
          </ul>
        ) : (
          <p className="text-gray-700">No events found.</p>
        )}
        {!showAllEvents && Events.length > 3 && (
          <>
            <Link
              to="/patient/calendar"
              className="text-cyan-400 hover:text-cyan-500"
            >
              Show all events
            </Link>
          </>
        )}
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default List;
