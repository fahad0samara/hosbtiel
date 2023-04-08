import { FcOvertime } from 'react-icons/fc'
import Calendar from './Calendar'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
import { useLogIN } from '../../../../ContextLog'
import moment from 'moment-timezone'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineDocumentAdd } from 'react-icons/hi'
import axios from 'axios'
const List = () => {
 const {
  logPatient,

  Profile,
  setProfile,
  Patient,

  dark,
  setEvents,
  Events,
  setdark,
 } = useLogIN()

 const fetchEvents = useCallback(async () => {
  setLoading(true)
  if (!Patient) {
   return
  }
  try {
   const response = await axios.get(`http://localhost:3000/Event/get-event-patient/${Patient._id}`)

   const eventsData = response.data.events.map((event) => ({
    start: moment(event.start).toDate(),
    end: moment(event.end).toDate(),
    title: event.title,
   }))
   setEvents(eventsData)

   setLoading(false)
  } catch (error) {
   console.error(error)
  }
  setLoading(false)
 }, [Patient, setEvents])

 useEffect(() => {
  fetchEvents()
 }, [fetchEvents])

 const [showAllEvents, setShowAllEvents] = useState(false)
 const [loading, setLoading] = useState(false)
 const numEventsToShow = showAllEvents ? Events.length : 2
 //loading the Events

 return (
  <div className="">
   <h1 className="md:text-2xl sm:text-xl text-lg  font-bold text-cyan-300 mt-4 mb-4">List of appointments</h1>
   <div className="hidden lg:block   ">
    <Calendar />
   </div>

   <div>
    {Events.length > 0 ? (
     <ul className="list-disc space-y-8 mt-16">
      {loading ? (
       <p>Loading...</p>
      ) : (
       Events.slice(0, numEventsToShow).map((event, index) => (
        <>
         <>
          <div
           style={{
            backgroundColor: dark ? '#000' : '#dbe6e7',
            color: dark ? 'white' : 'black',
            boxShadow: dark ? '0px 0px 5px 0px #ccc' : '0px 0px 10px 0px #ccc',
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
              {moment(event.start).format('MMM DD, YYYY')} to {moment(event.end).format('MMM DD, YYYY')}
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
             <Link to="/patient/MyCalendar">
              <IoIosArrowDroprightCircle className="text-2xl text-red-500" />
             </Link>
            </div>
           </div>
          </div>
         </>
        </>
       ))
      )}
     </ul>
    ) : (
     // your no events found code here
     <div className="flex flex-col items-center justify-center mt-14">
      <h1 className="text-xl font-bold text-cyan-300 mt-4 ml-6">you don't have any Events</h1>
      <h1 className="text-lg italic ">add an event</h1>
      <Link
       className="
           
                
                "
       to="/patient/MyCalendar"
      >
       {' '}
       <HiOutlineDocumentAdd
        className="text-2xl
                text-cyan-400
              "
       />
      </Link>
     </div>
    )}

    {!showAllEvents && Events.length > 1 && (
     <>
      <div className="flex items-center justify-center my-5 ">
       <Link
        to="/patient/MyCalendar"
        className="
                bg-cyan-400
                hover:bg-cyan-500
                text-white
                font-bold
                py-2
                px-4
                rounded-2xl
                focus:outline-none
                focus:shadow-outline
                transition duration-500
                ease-in-out
                "
       >
        Show all events
       </Link>
      </div>
     </>
    )}
   </div>
   <div>
    <div></div>
    <div></div>
   </div>
  </div>
 )
}

export default List
