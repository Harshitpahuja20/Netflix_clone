import React, { useState } from "react";
import "../card_slider/CardSlider.css";
import Wednesday_video from "../../Images/Wednesday_video.mp4";
import {
  AiFillLike,
  AiOutlinePlus,
  AiFillDislike,
  AiFillPlayCircle,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const MovieCard = ({ Movie }) => {
  const [hovered, setHovered] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked(true);
    setDisliked(false);
if(liked){
  setLiked(false)
}
  };
  const handleDislike = () => {
    setLiked(false);
    setDisliked(true);
    if(disliked){
      setDisliked(false)
    }
  };

  return (
    <div
      className={`MovieCard ${hovered ? "inc-height" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/${Movie.type}/${Movie.id}`}>
        <div className="movie-images">
          {!hovered ? (
            <img
              className="movie-image"
              src={`https://image.tmdb.org/t/p/w500${Movie.image}`}
              alt="Image"
              style={{ width: "200px", height: "200px" }}
            />
          ) : (
            <video
              className="movie-video"
              src={Wednesday_video}
              autoPlay
              muted
            />
          )}
        </div>
      </Link>
      {hovered && (
        <div className="details">
          <p>{Movie.name}</p>
          <div className="icons">
            <Link to={`/${Movie.id}`}>
              <AiFillPlayCircle title="Play" />
            </Link>
            <AiFillLike
              title={`${liked ? "Unlike" : "Like"}`}
              className={`${liked ? "icon-color" : ""}`}
              onClick={()=>handleLike()}
            />
            <AiFillDislike
              title={`${disliked ? "Remove Dislike" : "Dislike"}`}
              className={`${disliked ? "icon-color" : ""}`}
              onClick={()=>handleDislike()}
            />
            <AiOutlinePlus title="Add to list" />
          </div>
          <div>
            <ul>
              {Movie.genres.slice(0, 2).map((genre) => {
                return <li key={genre}>{genre}</li>;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
