import React from "react";
import "../Home/Home.css";
import Wednesday_bg from "../../Images/Wednesday_bg.webp";
import wednesday_logo from "../../Images/wednesday_logo.png";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillInfoCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home">
      <img src={Wednesday_bg} alt="" className="bg-image" />
      <div className="home-info">
        <img src={wednesday_logo} alt="" className="name-image" />
        <div className="buttons">
          <button type="button" className="play-btn">
           <Link to="/tv/119051"> <BsFillPlayFill /> Play</Link>
          </button>
          <button type="button" className="info-btn">
            <AiFillInfoCircle /> Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
