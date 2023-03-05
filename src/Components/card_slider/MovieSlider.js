import React, { useRef, useState } from "react";
import "../card_slider/CardSlider.css"
import MovieCard from "./MovieCard";
import {HiOutlineArrowSmLeft , HiOutlineArrowSmRight} from "react-icons/hi"

const MovieSlider = ({heading , data}) => {
  const [sliderpos, setsliderpos] = useState(0)
  const DistRef = useRef();
  const Slide = (type) => {
    let distance = DistRef.current.getBoundingClientRect().x - 70;
    if(type === "right" && distance > -2700){
      DistRef.current.style.transform = `translateX(${distance - 250}px)`
      setsliderpos(sliderpos + 1)
    }
    if(type === "left" && distance < 5){
      DistRef.current.style.transform = `translateX(${distance + 250}px)`
      setsliderpos(sliderpos - 1)
      if(sliderpos === 1){
        DistRef.current.style.transform = `translateX(${5}px)`
      }
    }
  }
  return (
    <div className="Movieslider">
      <div className="heading">
        <h1>{heading}</h1>
      </div>
      <div className="handleMovies">
        <button onClick={()=>{Slide("left")}}><HiOutlineArrowSmLeft/></button>
      <div className="Movies_row" ref={DistRef}>
       { data.map((movie , index)=>{
          return <MovieCard key={movie.id} Movie={movie} index={index}/>
        })}
      </div>
      <button onClick={()=>{Slide("right")}}><HiOutlineArrowSmRight/></button>
      </div>
    </div>
  );
};

export default MovieSlider;
