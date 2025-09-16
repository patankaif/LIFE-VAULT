import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar2 = () => {
  // Function for active/inactive link styles
  const getLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-800 font-bold text-xl mx-16 transition"
      : "text-gray-700 hover:text-blue-600 font-bold text-xl mx-16 transition";

  return (
    <div className="flex justify-center items-center p-5 bg-blue-50 rounded-lg shadow-md mt-3">
      <NavLink to="/future" className={getLinkClass}>
        Future
      </NavLink>
      <NavLink to="/present" className={getLinkClass}>
        Present
      </NavLink>
      <NavLink to="/death" className={getLinkClass}>
        Death
      </NavLink>
    </div>
  )
}

export default Navbar2
