import React, { useState, useEffect, useCallback, useRef } from "react";
import { getTokenFromUrl } from "../LoginOnload/OnLoad";

export const ArtistCode = () => {
  let [ArtistName, setArtistName] = useState("");
  let [Artists, setArtists] = useState([]);
  let [NoResults, setNoResults] = useState("");
  let [Loadingg, setLoadingg] = useState(false);
  let [Offset, setOffset] = useState(0);
  let [token, settoken] = useState(loadthetoken);

  function loadthetoken() {
    if (
      localStorage.getItem("accessToken") == "" ||
      localStorage.getItem("accessToken") == null
    )
      return getTokenFromUrl();
    else return localStorage.getItem("accessToken");
  }

  const oldText = useRef("");
  useEffect(multiple, [ArtistName]);

  oldText.current = ArtistName;
  function multiple() {
    if (ArtistName != "" && ArtistName.length % 4 == 0) getArtists();
    else stoppedtyping();
  }

  function stoppedtyping() {
    setTimeout(function () {
      if (oldText.current == ArtistName && ArtistName != "") getArtists();
    }, 2000);
  }

  function getArtists(offset) {
    if (offset === undefined) {
      offset = 0;
    }

    if (ArtistName != "") {
      setLoadingg(true);
      var url =
        "https://api.spotify.com/v1/search?q=artist:" +
        ArtistName +
        "&type=artist&limit=20&offset=" +
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
          setArtists(data.artists.items);
          setLoadingg(false);
          if (
            data.artists.items.length != undefined &&
            data.artists.items.length === 0
          ) {
            setNoResults("No Results");
          } else {
            setNoResults("");
          }
        })
        .catch((error) => {
          console.log("error: " + error);
          setLoadingg(false);
          setNoResults("No Results - Check if You have Access");
        });
    }
  }

  function getNextArtists() {
    if (Artists.length < 20) {
      alert("No more results");
    } else {
      getArtists(Offset + 10);
      setOffset(Offset + 10);
    }
  }

  function getPrevArtists() {
    if (Offset === 0) {
      alert("No Previous Pages");
    } else {
      getArtists(Offset - 10);
      setOffset(Offset - 10);
    }
  }

  return {
    ArtistName,
    setArtistName,
    Artists,
    Loadingg,
    getPrevArtists,
    getNextArtists,
    NoResults,
  };
};
