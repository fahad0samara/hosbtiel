import { useNavigate } from 'react-router-dom'
import { useLogIN } from '../ContextLog'
import img from './assets/404.png'
const NotFound = () => {
 const { dark } = useLogIN()
 const navigator = useNavigate()
 return (
  <section
   style={{
    background: dark ? '#000' : '#fff',
    color: dark ? '#fff' : '#000',
   }}
   className="flex items-center justify-center min-h-screen "
  >
   <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
    <div className="wf-ull lg:w-1/2 ml-12">
     <p className="text-xl  text-cyan-300">404 error</p>
     <h1 className="mt-3 text-2xl font-semibold  md:text-3xl">Page not found</h1>
     <p className="mt-4 ">Sorry, the page you are looking for doesn't exist:</p>

     <div className="flex items-center mt-6 gap-x-3">
      <button
       onClick={() => navigator('/')}
       className="flex items-center justify-center w-1/2 px-5 py-2 text-sm transition-colors duration-200 bg-cyan-300 border rounded-lg gap-x-2 sm:w-auto "
      >
       <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-5 h-5 rtl:rotate-180"
       >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
       </svg>

       <span> Take me home</span>
      </button>
     </div>
    </div>

    <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
     <img src={img} alt="" />
    </div>
   </div>
  </section>
 )
}

export default NotFound
