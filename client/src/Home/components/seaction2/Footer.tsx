import React from 'react'
import { useLogIN } from '../../../../ContextLog'
import img from '../../../assets/miracle0.svg'
import { Link } from 'react-router-dom'

const Footer = () => {
 const { dark } = useLogIN()
 return (
  <footer
   style={{
    backgroundColor: `${dark ? '#000' : '#fff'}`,
    color: `${dark ? '#fff' : '#000'}`,
   }}
   className="relative px-4 pt-20"
  >
   <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4  p-2">
    <img className="h-full object-contain" src={img} alt="" />
   </div>
   <nav
    aria-label="Footer Navigation"
    className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
   >
    <Link to="/about" className="font-medium text-cyan-300">
     About
    </Link>
    <Link to="/contact" className="font-medium text-cyan-300">
     Support
    </Link>
    <Link to="/contact" className="font-medium text-cyan-300">
     Privacy Policy
    </Link>
    <Link to="/contact" className="font-medium text-cyan-300">
     Terms & Conditions
    </Link>
   </nav>
   <p className="py-10 text-center ">
    © 2023
    <span className="font-bold">miracle Hospital</span>. All rights reserved
   </p>
  </footer>
 )
}

export default Footer
