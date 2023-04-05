import Router from './Router'
import { CiDark } from 'react-icons/ci'
import { FiSun } from 'react-icons/fi'
import { useLogIN } from '../ContextLog'
import Alert from './tools/Alert'
import useCallback from 'react'

const App = () => {
 const { dark, setdark } = useLogIN()

 return (
  <div>
   <div
    style={{
     position: 'fixed',
     bottom: '0',

     right: '0',
     margin: '1rem',
     zIndex: 100,
    }}
   >
    {dark ? (
     <FiSun
      size="2rem"
      style={{
       color: dark ? 'rgb(103 232 249)' : 'black',
      }}
      onClick={() => setdark(false)}
     />
    ) : (
     <CiDark
      size="2rem"
      style={{
       color: dark ? 'rgb(103 232 249)' : 'rgb(103 232 249)',
      }}
      onClick={() => setdark(true)}
     />
    )}
   </div>
   <div className={`md:hidden`}>
    <div className="w-full  bg-yellow-400">
     <div className="container flex items-center justify-between px-4 py-2 mx-auto">
      <div className="flex">
       {
        // show the masseg for the user if the screen smalee
       }
       <p className="mx-3 text-center ml-32">
        Please use
        <span className="font-bold ml-1">Desktop</span> or <span className="font-bold mx-1">Laptop</span>
        to display all information
       </p>
      </div>
     </div>
    </div>
   </div>

   <Router />
  </div>
 )
}

export default App
