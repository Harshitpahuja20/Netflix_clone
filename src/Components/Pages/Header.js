import React from 'react'
import { useNavigate } from 'react-router-dom';
import Netflix_logo from "../../Images/Netflix_logo.png"
import "../Pages/Pages.css"

const Header = ({login}) => {
  const navigate = useNavigate();
  return (
    <div className='header'>
      <div className="logo">
        <img src={Netflix_logo} alt="" />
      </div>
      <div className="btn">
        <button type='button' onClick={()=>navigate(login ? "/login" : "/signup")}>{login? "Log in" : "Sign up"}</button>
      </div>
    </div>
  )
}

export default Header
