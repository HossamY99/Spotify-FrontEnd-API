import React, { useState, useEffect, useCallback, useRef } from "react";
import { get_Token_From_Url } from "../LoginOnload/OnLoad";

export const Artist_Code = () => {
  let [ArtistName, setArtistName] = useState("");
  let [Artists, setArtists] = useState([]);
  let [NoResults, setNoResults] = useState("");
  let [Loadingg, setLoadingg] = useState(false);
  let [Offset, setOffset] = useState(0);
  let [token, settoken] = useState(load_the_token);

  function load_the_token() {
    if (
      localStorage.getItem("accessToken") == "" ||
      localStorage.getItem("accessToken") == null
    )
      return get_Token_From_Url();
    else return localStorage.getItem("accessToken");
  }

  const oldText = useRef("");
  useEffect(multiple, [ArtistName]);

  oldText.current = ArtistName;
  function multiple() {
    if (ArtistName != "" && ArtistName.length % 4 == 0) get_Artists();
    else stopped_typing();
  }

  function stopped_typing() {
    setTimeout(function () {
      if (oldText.current == ArtistName && ArtistName != "") get_Artists();
    }, 2000);
  }

  function get_Artists(offset) {
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

  function get_Next_Artists() {
    if (Artists.length < 20) {
      alert("No more results");
    } else {
      get_Artists(Offset + 10);
      setOffset(Offset + 10);
    }
  }

  function get_Prev_Artists() {
    if (Offset === 0) {
      alert("No Previous Pages");
    } else {
      get_Artists(Offset - 10);
      setOffset(Offset - 10);
    }
  }

  return {
    ArtistName,
    setArtistName,
    Artists,
    Loadingg,
    get_Prev_Artists,
    get_Next_Artists,
    NoResults,
  };
};
