import React from 'react'
import "../card_slider/CardSlider.css"
import MovieSlider from './MovieSlider'

const Slider = ({movies}) => {
    const getMovies = (from , to) => {
        return movies.slice(from , to)
    }
  return (
    <div className='Slider'>
        <MovieSlider heading="Trending Now" data={getMovies(0,20)}/>
        {movies.length > 30 && <MovieSlider heading="Top 20" data={getMovies(20,40)}/>}
        {movies.length > 50 && <MovieSlider heading="BlockBusters" data={getMovies(40,60)}/>}
        {movies.length > 70 && <MovieSlider heading="New on Netflix" data={getMovies(60,80)}/>}
        {movies.length > 90 && <MovieSlider heading="Super Hits" data={getMovies(80,100)}/>}
        {movies.length > 110 && <MovieSlider heading="Amazing" data={getMovies(100,120)}/>}
    </div>
  )
}

export default Slider