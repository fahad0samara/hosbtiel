//@ts-nocheck
import { useState } from 'react'
import { BsInfoCircle } from 'react-icons/bs'
import { useLogIN } from '../../ContextLog'
import { FaInfoCircle } from 'react-icons/fa'

const Alert = () => {
 const { dark } = useLogIN()
 const [isVisible, setIsVisible] = useState(true)

 const handleDismiss = () => {
  setIsVisible(false)
 }

 return (
  isVisible && (
   <div
    className={`fixed top-0 left-0 w-full h-full flex items-center justify-center ${
     dark ? 'bg-gray-800' : 'bg-gray-100'
    }`}
   >
    <div
     style={{ maxWidth: '80vw' }}
     className="p-4 mb-4   ml-16 text-yellow-300 border
          
          bg-black
           border-yellow-300 rounded-lg "
     role="alert"
    >
     <div className="flex items-center mx-12">
      <FaInfoCircle
       className={`${dark ? 'text-yellow-300' : 'text-yellow-300'} fill-current w-6 h-6
                animate-pulse
               mr-4`}
      />
      <span className="sr-only">Info</span>
      <h3 className="text-lg font-medium">This is a warning alert</h3>
     </div>
     <div className="mt-2 mb-4 text-sm">To display all the information, we advise you to use a larger screen</div>
     <div className="flex justify-center">
      <button
       type="button"
       className="text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
       onClick={handleDismiss}
      >
       Dismiss
      </button>
     </div>
    </div>
   </div>
  )
 )
}

export default Alert
