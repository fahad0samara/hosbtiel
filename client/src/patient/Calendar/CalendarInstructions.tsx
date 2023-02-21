import React, {useState, useEffect} from "react";

const CalendarInstructions = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const hasSeenInstructions = localStorage.getItem("hasSeenInstructions");
    if (!hasSeenInstructions) {
      setShowInstructions(true);
      localStorage.setItem("hasSeenInstructions", JSON.stringify(true));
    }
  }, []);

  return (
    // <div>
    //   <h2>Calendar Instructions</h2>
    //   <p>Welcome to the calendar! Here are some instructions:</p>
    //   <ul>
    //     <li>Select a date to view appointments for that day.</li>
    //     <li>Click on an appointment to view details.</li>
    //     <li>You can reschedule or cancel appointments.</li>
    //   </ul>
    //   </div>

    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full ml-3"
              onClick={() => {
                setShowInstructions(false);
              }}
            >
              Close
            </button>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Instructions
            </h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <p className="text-gray-700">
              Here are the instructions for using the calendar:
            </p>
            <ul className="list-disc pl-5 mt-3 text-gray-700">
              <li>Step 1</li>
              <li>Step 2</li>
              <li>Step 3</li>
            </ul>
          </div>
        </div>
      </div>
      <button onClick={handleOpenInstructionsModal}>View instructions</button>
      {instructionsModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span
              className="close"
              onClick={() => setInstructionsModalOpen(false)}
            >
              &times;
            </span>
            <h2>Instructions for using the calendar</h2>
            <ul>
              <li>
                Click on a day to view the appointments scheduled for that day.
              </li>
              <li>
                Click on an appointment to view its details or to cancel it.
              </li>
              <li>
                Use the arrows at the top of the calendar to navigate between
                months.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarInstructions;
