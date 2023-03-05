import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import axios from "axios";
import { api_key, base_url } from "../Constants/Api";

const initialState = {
  movies: [],
  genres: [],
  genresLoaded: false,
  selectedMovie: "",
  selectedMovieLoaded: false,
};

const CreateRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
        type: !movie.original_name ? "movie" : "tv",
      });
  });
};

//fetching movies
const getRawData = async (api, genres, paging) => {
  const moviesArray = [];
  for (let i = 1; moviesArray.length < 120 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
    CreateRawData(results, moviesArray, genres);
  }
  return moviesArray;
};
export const fetchtrendinglist = createAsyncThunk(
  "netflix/fetchtrendinglist",
  async ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return await getRawData(
      `${base_url}trending/${type}/week?api_key=${api_key}`,
      genres,
      true
    );
  }
);

//fetching Genres
export const getGenres = createAsyncThunk("netflix/getGenres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${base_url}genre/movie/list?api_key=${api_key}`);
  return genres;
});

// movies by genres
export const fetchmoviesbygenres = createAsyncThunk(
  "netflix/fetchmoviesbygenres",
  async ({ type, genre }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    return await getRawData(
      `${base_url}discover/${type}?api_key=${api_key}&with_genres=${genre}`,
      genres,
      true
    );
  }
);

// selected movie or show

export const movieortvData = createAsyncThunk(
  "netflix/movieortvData",
  async ({ type, id }) => {
    const { data } = await axios.get(
      `${base_url}${type}/${id}?api_key=${api_key}`
    );
    console.log(data);
    return data;
  }
);
export const removemovieortvData = createAsyncThunk(
  "netflix/removemovieortvData",
  async () => {
    return ;
  }
);

// slice and store

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchtrendinglist.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchmoviesbygenres.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(movieortvData.fulfilled, (state, action) => {
      state.selectedMovie = action.payload;
      state.selectedMovieLoaded = true;
    });
    builder.addCase(removemovieortvData.fulfilled, (state, action) => {
      state.selectedMovie = "";
      state.selectedMovieLoaded = false;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
