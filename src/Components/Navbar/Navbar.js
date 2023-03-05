import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Netflix_logo from "../../Images/Netflix_logo.png";
import "../Navbar/Navbar.css";
import { AiOutlinePoweroff, AiOutlineClose } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireBaseauth } from "../../Constants/Firebase-config";

const Navbar = ({ isScrolled }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const links = [
    { name: "Home", link: "/" },
    { name: "Movies", link: "/movies" },
    { name: "TV Shows", link: "/shows" },
    { name: "My List", link: "/list" },
  ];
  onAuthStateChanged(fireBaseauth, (currentUSer) => {
    if (!currentUSer) {
      navigate("/login");
    }
  });
  const responsive = () => {
    document.querySelector(".navbar").classList.toggle("background");
    document.querySelector(".nav-ul").classList.toggle("active");
    document.querySelector(".search-out").classList.toggle("active2");
    document.querySelector(".search-input").classList.toggle("visible");
    setIsHovered(isHovered === true ? false : true);
  };
  return (
    <div className={`navbar ${isScrolled ? "bg-black" : "bg-transparent"}`}>
      <div className="logo-list">
        <Link to="/">
          <img src={Netflix_logo} alt="" />
        </Link>
        <div className="hamburger" onClick={responsive}>
         {!isHovered ?  <><div className="line"></div>
          <div className="line"></div>
          <div className="line"></div></> : <AiOutlineClose/>}
        </div>
        <ul className="nav-ul">
          {links.map(({ name, link }) => {
            return (
              <li key={name} onClick={() => responsive()}>
                <Link to={link}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={`search-out`}>
        <div className="search">
          <input
            type="text"
            className={`${isHovered} search-input`}
            placeholder="Search"
            onBlur={() => setIsHovered("d-none")}
          />
          <button type="button" className="search-btn">
            <BiSearch onClick={() => setIsHovered("d-block")} />
          </button>
        </div>
        <button type="button" className="out-btn">
          <AiOutlinePoweroff title="Log Out" onClick={() => signOut(fireBaseauth)} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
