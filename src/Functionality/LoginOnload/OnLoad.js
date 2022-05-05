import React, { useState, useEffect, useCallback } from "react";

export function login() {
  var client_id = "e0edfae095bf44b399edb93af13f80a9";
  var redirect_uri = "http://localhost:3000/authorized/";
  var state = "abc";
  //localStorage.setItem(stateKey, state);
  var scope = "user-read-private user-read-email";
  var url = "https://accounts.spotify.com/authorize";
  url += "?response_type=token";
  url += "&client_id=" + encodeURIComponent(client_id);
  url += "&scope=" + encodeURIComponent(scope);
  url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
  url += "&state=" + encodeURIComponent(state);

  window.location = url + "/url";
}

export const TokenLoad = () => {
  let [token, settoken] = useState([localStorage.getItem("accessToken")]);
  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      // if (token=="" || token==undefined || token==null){console.log("I am empty"); settoken(access_token);}
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
      //   localStorage.clear();
    }
  });
};

export function getTokenFromUrl() {
  if (window.location.hash) {
    const { access_token, expires_in, token_type } =
      getReturnedParamsFromSpotifyAuth(window.location.hash);
    localStorage.clear();
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("tokenType", token_type);
    localStorage.setItem("expiresIn", expires_in);
    return access_token;
  } else {
    return localStorage.getItem("accessToken");
  }
}

export const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater;
  }, {});

  return paramsSplitUp;
};
