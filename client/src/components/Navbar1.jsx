import { useNavigate } from "react-router-dom";
import React from 'react'

const Navbar1 = () => {
  const navigate = useNavigate();
  return (
    <div className='flex justify-between align-center mt-3'>
      <div className='div1 m-2 font-bold font text-4xl mx-20'>Life Vault</div>
      <div className='div2 m-2 mx-10'>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          onClick={()=>{navigate("/signup")}}
      >
          Login
      </button>
      </div>
    </div>
  )
}

export default Navbar1