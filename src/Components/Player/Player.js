import React, { useEffect } from "react";
import "../Player/Player.css";
import { BsArrowLeft } from "react-icons/bs";
import Wednesday_video from "../../Images/Wednesday_video.mp4";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieortvData, removemovieortvData } from "../../Store";

const Player = () => {
  const selectedMovie = useSelector((state) => state.netflix.selectedMovie);
  const selectedMovieLoaded = useSelector(
    (state) => state.netflix.selectedMovieLoaded
  );
  const navigate = useNavigate();
  let { type, id } = useParams();

  const {
    original_name,
    original_title,
    overview,
    adult,
    runtime,
    release_date,
    first_air_date,
    genres,
    spoken_languages,
    production_companies,
    episode_run_time,
  } = selectedMovie;
  console.log(
    original_name,
    original_title,
    overview,
    adult,
    runtime,
    release_date,
    first_air_date,
    genres,
    spoken_languages,
    production_companies
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(movieortvData({ type: type, id: id }));

    return () => {
      dispatch(removemovieortvData());
    };
  }, []);

  return (
    <div className="player">
      <div className="back">
        <BsArrowLeft onClick={() => navigate(-1)} />
      </div>
      <div>
        <video src={Wednesday_video} autoPlay controls muted></video>
      </div>
      {selectedMovieLoaded && (
        <div className="Selected_details">
          <div className="selected_heading">
            <h1>{original_title ? original_title : original_name}</h1>
          </div>
          <div className="type_row">
            <ul className="fs">
              <li>{type === "movie" ? "Movie" : "Series"}</li>
              <li>{release_date ? release_date : first_air_date}</li>
              <li>
                {runtime ? runtime + " mins" : episode_run_time + " mins/ep."}
              </li>
              <li>U/A{adult ? " 18+" : " 13+"}</li>
            </ul>
          </div>
          <div className="selected_desc">
            <p className="fs">{overview}</p>
          </div>
          <div className="genres fs">
            <ul>
              Genres :
              {genres.map(({ name }) => {
                return <li className="fs" key={name}>{name}</li>;
              })}
            </ul>
          </div>
          <div className="audio fs">
            <ul>
              Audio Language :{" "}
              {spoken_languages.map(({ english_name }) => {
                return <li className="fs" key={english_name}>{english_name}</li>;
              })}
            </ul>
          </div>
          <div className="company fs">
            Production Companies :
            <ul>
              {production_companies.map(({ name }) => {
                return <li className="fs" key={name}>{name}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player;
