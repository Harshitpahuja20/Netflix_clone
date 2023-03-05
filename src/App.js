import "./App.css";
import Login from "./Components/Pages/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Netflix from "./Components/netflix/Netflix";
import SignUp from "./Components/Pages/SignUp";
import Player from "./Components/Player/Player";
import Movies from "./Components/Movies/Movies";
import Show from "./Components/Shows/Show";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Netflix />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/shows" element={<Show />} />
          <Route exact path="/list" element={<Netflix/>} />
          <Route exact path="/:type/:id" element={<Player />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
