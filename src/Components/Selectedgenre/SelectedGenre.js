import React from "react";
import { useDispatch } from "react-redux";
import { fetchmoviesbygenres } from "../../Store";
import "../Selectedgenre/SelectedGenre.css"

const SelectedGenre = ({ genres, type }) => {
  const dispatch = useDispatch();

  return (
        <select
          onChange={(e) =>{
            dispatch(fetchmoviesbygenres({ genre: e.target.value , type}))
        }
          }
        >
          {genres.map((genre) => {
            return (
              <option value={genre.id} key={genre.id}>
                {genre.name}
              </option>
            );
          })}
        </select>
  );
};

export default SelectedGenre;
