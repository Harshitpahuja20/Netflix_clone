import React, { useEffect, useState } from "react";
import "../netflix/Netflix.css"
import Navbar from "../Navbar/Navbar";
import Home from "../Home/Home";
import { useDispatch, useSelector } from "react-redux";
import {fetchtrendinglist, getGenres } from "../../Store";
import Slider from "../card_slider/Slider";

const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const genresLoaded = useSelector((state)=>state.netflix.genresLoaded)
  const movies = useSelector((state)=>state.netflix.movies)
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset > 50 ? true : false);
    return () => {
      window.onscroll = null;
    };
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGenres())
  }, [])
  useEffect(() => {
    if(genresLoaded){ dispatch(fetchtrendinglist({type : "all"}))}
  }, [genresLoaded])
  
  return (
    <div className="netflix">
      <Navbar isScrolled={isScrolled} />
      <Home/>
      <Slider movies={movies}/>
    </div>
  );
};

export default Netflix;
