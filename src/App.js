import React from "react";
import { Buttonlogin } from "./UI/LoginButton/ButtonLogin";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Artist_Album } from "./Functionality/ArtistAlbumRoutes";
import { SpotHeader } from "./UI/Header/Header";

function App() {
  return (
    <>
      <SpotHeader />
      <div className="App">
        <Routes>
          <Route exact path="/" element={Buttonlogin()}></Route>
          <Route exact path="/authorized*" element={Artist_Album()}></Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
