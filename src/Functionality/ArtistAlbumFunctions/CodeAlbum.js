import React, { useState, useEffect, useCallback, useRef } from "react";
import { get_Token_From_Url } from "../LoginOnload/OnLoad";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

export const Album_code = () => {
  let navigate = useNavigate();

  let [token, settoken] = useState(load_the_token);
  let [albumss, setAlbumss] = useState([]);
  let [AlbumOffset, setAlbumOffset] = useState(0);
  let [LoadinggAlbum, setLoadinggAlbum] = useState(false);

  let [CurrentArtistId, setCurrentArtistId] = useState(undefined);
  let [CurrentArtistName, setCurrentArtistName] = useState(undefined);

  function load_the_token() {
    if (
      localStorage.getItem("accessToken") == "" ||
      localStorage.getItem("accessToken") == null
    )
      return get_Token_From_Url();
    else return localStorage.getItem("accessToken");
  }

  function Get_Albums(ArtistId, offset, name) {
    if (offset === undefined) offset = 0;
    if (name != undefined) setCurrentArtistName(name);
    if (ArtistId != null) {
      setCurrentArtistId(ArtistId);
      setLoadinggAlbum(true);
      navigate("/authorized/albums");
      var url =
        "https://api.spotify.com/v1/artists/" +
        ArtistId +
        "/albums?offset=" +
        offset;


      fetch(`${url}`, {
        method: "Get",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          var abc = data.items;
          setAlbumss(abc);
          setLoadinggAlbum(false);
        })
        .catch((error) => {
          console.log("error: " + error);
        });
    }
  }

  function get_Next_Albums() {
    if (albumss.length < 20) alert("No more results");
    else Get_Albums(CurrentArtistId, AlbumOffset + 10);
    setAlbumOffset(AlbumOffset + 10);
  }

  function get_Prev_Albums() {
    if (AlbumOffset === 0) alert("No Previous Pages");
    else Get_Albums(CurrentArtistId, AlbumOffset - 10);
    setAlbumOffset(AlbumOffset - 10);
  }

  return {
    Get_Albums,
    albumss,
    CurrentArtistName,
    get_Prev_Albums,
    get_Next_Albums,
    LoadinggAlbum,
  };
};
