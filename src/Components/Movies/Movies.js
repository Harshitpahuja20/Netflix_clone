import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchmoviesbygenres, fetchtrendinglist, getGenres } from "../../Store";
import "../Movies/Movies.css";
import Navbar from "../Navbar/Navbar";
import SelectedGenre from "../Selectedgenre/SelectedGenre";
import Slider from "../card_slider/Slider";

const Movies = () => {
  const [isScrolled, setIsScrolled] = useState(false);  
  const [loader, setLoader] = useState(false)
  const generesLoaded = useSelector((state) => state.netflix.generesLoaded);
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset > 50 ? true : false);
    return () => {
      window.onscroll = null;
    };
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchmoviesbygenres({ genre: 28 , type : "movie"}));
  }, [generesLoaded]);
  useEffect(() => {
    dispatch(getGenres());
  }, [generesLoaded]);
  useEffect(() => {
    setLoader(true)
    if (generesLoaded) dispatch(fetchtrendinglist({ type: "movie" }));
    setLoader(false)
  },[generesLoaded]);
  return (
    <div className="Movies">
      <div className="navbar">
        <Navbar isScrolled={isScrolled} />
      </div>
      <div className="Mmovies">
        <SelectedGenre genres={genres} type="movie" />
        
        {movies.length ? <Slider movies={movies}/> : <h1 className="not_found">Not Available...</h1>}
      </div>
    </div>
  );
};

export default Movies;
