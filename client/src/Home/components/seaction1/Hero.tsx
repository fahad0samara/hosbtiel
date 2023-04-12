import { Link } from 'react-router-dom'
import { useLogIN } from '../../../../ContextLog'

const Hero = () => {
 const { dark, logPatient, logAdmin } = useLogIN()

 return (
  <div className="">
   <header className="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-blue-900 md:mx-auto md:flex-row md:items-center">
    <a href="#" className="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black">
     <span className="mr-2 text-4xl text-blue-500">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       aria-hidden="true"
       role="img"
       width="1em"
       height="1em"
       preserveAspectRatio="xMidYMid meet"
       viewBox="0 0 24 24"
      >
       <path
        fill="currentColor"
        d="M6.925 16.875Q5.2 16.225 4.1 14.713Q3 13.2 3 11.25q0-1.975.938-3.513Q4.875 6.2 6 5.15q1.125-1.05 2.062-1.6L9 3v2.475q0 .625.45 1.062q.45.438 1.075.438q.35 0 .65-.15q.3-.15.5-.425L12 6q.95.55 1.625 1.35t1.025 1.8l-1.675 1.675q-.05-.6-.287-1.175q-.238-.575-.638-1.05q-.35.2-.738.287q-.387.088-.787.088q-1.1 0-1.987-.612Q7.65 7.75 7.25 6.725q-.95.925-1.6 2.062Q5 9.925 5 11.25q0 .775.275 1.462q.275.688.75 1.213q.05-.5.287-.938q.238-.437.588-.787L9 10.1l2.15 2.1q.05.05.1.125t.1.125l-1.425 1.425q-.05-.075-.087-.125q-.038-.05-.088-.1L9 12.925l-.7.7q-.125.125-.212.287q-.088.163-.088.363q0 .3.175.537q.175.238.45.363ZM9 10.1Zm0 0ZM7.4 22L6 20.6L19.6 7L21 8.4L17.4 12H21v2h-5.6l-.5.5l1.5 1.5H21v2h-2.6l2.1 2.1l-1.4 1.4l-2.1-2.1V22h-2v-4.6l-1.5-1.5l-.5.5V22h-2v-3.6Z"
       />
      </svg>
     </span>
     streamio
    </a>
    <input type="checkbox" className="peer hidden" id="navbar-open" />
    <label className="absolute top-5 right-7 cursor-pointer md:hidden" htmlFor="navbar-open">
     <span className="sr-only">Toggle Navigation</span>
     <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
     >
      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
     </svg>
    </label>
    <nav
     aria-label="Header Navigation"
     className="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start"
    >
     <ul className="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
      <li className="font-bold md:mr-12">
       <a href="#">Pricing</a>
      </li>
      <li className="md:mr-12">
       <a href="#">Features</a>
      </li>
      <li className="md:mr-12">
       <a href="#">Support</a>
      </li>
      <li className="md:mr-12">
       <div className="hidden lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
        <Link
         to="/Login"
         className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        >
         Log in
        </Link>
        <Link
         to="/Register"
         className="inline-block rounded-lg px-3 py-1.5 ml-3 text-sm font-semibold leading-6 text-white bg-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
        >
         Register
        </Link>
       </div>
      </li>
     </ul>
    </nav>
   </header>

   <div className="mx-auto h-full px-4 py-10 sm:max-w-xl md:max-w-full md:px-24 md:py-36 lg:max-w-screen-xl lg:px-8">
    <div className="flex flex-col items-center justify-between lg:flex-row">
     <div className="">
      <div className="lg:max-w-xl lg:pr-5">
       <h2 className="mb-6 max-w-lg text-5xl font-light leading-snug tracking-tight text-blue-600 sm:text-8xl">
        Drive sales <br />
        to
        <span className="my-1 inline-block border-b-8 border-blue-600 font-bold text-blue-600"> the sky </span>
       </h2>
       <p className="text-base text-gray-700">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque it.
       </p>
      </div>
      <div className="mt-10 flex flex-col items-center md:flex-row">
       <a
        href="/"
        className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-blue-700 px-6 font-medium tracking-wide text-white shadow-md transition duration-200 md:mr-4 md:mb-0 md:w-auto focus:outline-none hover:bg-blue-800"
       >
        Stream Now{' '}
       </a>
       <a
        href="/"
        aria-label=""
        className="underline-offset-2 inline-flex items-center font-semibold text-blue-600 underline transition-colors duration-200 hover:underline"
       >
        Watch how it works
       </a>
      </div>
      <div className="mt-12 flex flex-col space-y-3 divide-gray-300 text-sm text-gray-700 sm:flex-row sm:space-y-0 sm:divide-x">
       <div className="flex max-w-xs space-x-2 px-4">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-12 w-12 text-emerald-600"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         stroke-width="2"
        >
         <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
         />
        </svg>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
       </div>
       <div className="flex max-w-xs space-x-2 px-4">
        <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-12 w-12 text-orange-600"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         stroke-width="2"
        >
         <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
         />
        </svg>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
       </div>
      </div>
     </div>
     <div className="relative hidden lg:ml-32 lg:block lg:w-1/2">
      <svg
       xmlns="http://www.w3.org/2000/svg"
       className="mx-auto my-6 h-10 w-10 animate-bounce rounded-full bg-blue-50 p-2 lg:hidden"
       fill="none"
       viewBox="0 0 24 24"
       stroke="currentColor"
       stroke-width="2"
      >
       <path stroke-linecap="round" stroke-linejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
      </svg>
      <div className="w-fit rounded-[6rem] mx-auto overflow-hidden rounded-tl-none rounded-br-none bg-orange-400">
       <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-10 -top-20 h-28 w-28 rounded-xl bg-white text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
       >
        <path
         fill-rule="evenodd"
         d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
         clip-rule="evenodd"
        />
       </svg>
       <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 -bottom-20 h-28 w-28 rounded-xl bg-white text-yellow-400"
        viewBox="0 0 20 20"
        fill="currentColor"
       >
        <path
         fill-rule="evenodd"
         d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
         clip-rule="evenodd"
        />
       </svg>
       <img className="-mb-20" src="/images/2fugLKmm9JsRrFhS_F57Z.png" alt="" />
      </div>
     </div>
    </div>
   </div>
  </div>
 )
}

export default Hero
