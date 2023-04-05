import React, { useState, useEffect, useCallback } from 'react'
import { useLogIN } from '../../../ContextLog'
import axios from 'axios'

const EventForm = () => {
 const [Loading, setLoading] = useState(false)
 const { Patient, dark, Events, setEvents } = useLogIN()
 const [title, setTitle] = useState('')
 const [start, setStart] = useState('')
 const [end, setEnd] = useState('')
 const [EventAdded, setEventAdded] = useState(false)

 const handleCreateEvent = async (e: { preventDefault: () => void }) => {
  e.preventDefault()
  setLoading(true)
  try {
   await axios.post(`http://localhost:3000/Event/add-event-patient`, {
    title,
    start,
    end,
    patient: Patient._id,
   })
   setLoading(false)
   setEvents(
    // Update the events state to include the new event
    Events.concat({
     title,
     start,
     end,
    })
   )

   setEventAdded(true) // Set a state variable to true to indicate that the event has been added
   setTimeout(() => {
    setEventAdded(false) // Set the state variable back to false after a delay
   }, 3000)
  } catch (error) {
   //@ts-ignore
   console.error(error.response.data)
   setLoading(false)
  }
 }

 return (
  <div className="ml-12">
   {Loading && (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-white bg-opacity-75 z-50">
     Loading...
    </div>
   )}
   {EventAdded && (
    <div className="flex items-center justify-center w-full h-full fixed top-0 left-0 bg-white bg-opacity-75 z-50">
     Event added successfully!
    </div>
   )}
   <form onSubmit={handleCreateEvent}>
    <div className=" lg:grid-cols-3 grid lg:gap-20 grid-cols-1 gap-7 md:mx-12 mx-auto">
     <div className="mb-4">
      <label htmlFor="start_date" className="block  font-bold mb-2">
       Event Title
      </label>
      <input
       className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight mt-1 focus:outline-none"
       id="title"
       placeholder="Event Title"
       type="text"
       name="title"
       value={title}
       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
       required
      />
     </div>
     <div className="mb-4">
      <label htmlFor="start_date" className="block  font-bold mb-2">
       Start Date
      </label>
      <input
       className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
       type="datetime-local"
       name="start_date"
       id="start_date"
       value={start}
       onChange={(e) => setStart(e.target.value)}
       required
      />
     </div>
     <div className="mb-4">
      <label htmlFor="end_date" className="block  font-bold mb-2">
       End Date
      </label>
      <input
       className="appearance-none bg-transparent  border-b-2 border-cyan-400 w-full  mr-3 py-1 px-2 leading-tight focus:outline-none"
       type="datetime-local"
       name="end_date"
       id="end_date"
       onChange={(e) => setEnd(e.target.value)}
       required
       value={end}
      />
     </div>
    </div>

    <div className="flex items-center justify-center -ml-36 my-4">
     {Loading ? (
      <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6 mb-4"></div>
     ) : (
      <button
       type="submit"
       className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
       Create Event
      </button>
     )}
     {Loading ? <p className="text-gray-500 text-sm">Loading...</p> : null}
    </div>
   </form>
  </div>
 )
}

export default EventForm
