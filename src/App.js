import React from "react";
import { buttonlogin } from "./UI/LoginButton/ButtonLogin";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ArtistAndAlbum } from "./Functionality/ArtistAlbumRoutes";
import { SpotHeader } from "./UI/Header/Header";

function App() {
  return (
    <>
      <SpotHeader />
      <div className="App">
        <Routes>
          <Route exact path="/" element={buttonlogin()}></Route>
          <Route exact path="/authorized*" element={ArtistAndAlbum()}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
