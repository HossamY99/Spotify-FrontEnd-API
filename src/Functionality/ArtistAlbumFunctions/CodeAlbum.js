import React,{ useState,useEffect, useCallback,useRef } from "react";
import { getTokenFromUrl } from "../LoginOnload/OnLoad";
import { BrowserRouter as Router, Routes ,Route, useNavigate } from 'react-router-dom';


 export const Albumcode= ()=>{

    let navigate = useNavigate();

    let [token, settoken] = useState(loadthetoken);
    let [albumss, setAlbumss] = useState([]);
    let [AlbumOffset, setAlbumOffset] = useState(0);
    let [LoadinggAlbum, setLoadinggAlbum] = useState(false);

    let [CurrentArtistId, setCurrentArtistId] = useState(undefined);
    let [CurrentArtistName, setCurrentArtistName] = useState(undefined);

    function loadthetoken(){
        if (localStorage.getItem("accessToken")==""||localStorage.getItem("accessToken")==null )
          return (getTokenFromUrl());
        else
          return localStorage.getItem("accessToken"); 
      }

    function GetAlbums(ArtistId,offset,name){
        if (offset===undefined)
          offset=0;
        if (name!=undefined)
          setCurrentArtistName(name);
        if (ArtistId!=null)
        {
         setCurrentArtistId(ArtistId);
         setLoadinggAlbum(true);
         var url="https://api.spotify.com/v1/artists/"+ArtistId+"/albums?offset="+offset;
    
          fetch(`${url}`, {
            method: 'Get', 
            headers: {
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          }) .then(response => response.json())
            .then(data => {
            var abc=data.items;
              setAlbumss(abc);
              setLoadinggAlbum(false);
              navigate("/authorized/albums"); 
          })
          .catch((error) => {
            console.log('error: ' + error);
          });
        }
        }
         
      function getNextAlbums()
      {
        if(albumss.length<20)
            alert("No more results");
        else
          GetAlbums(CurrentArtistId, AlbumOffset+10);
          setAlbumOffset(AlbumOffset+10);
      }
    
      function getPrevAlbums()
      {
        if (AlbumOffset===0)
          alert("No Previous Pages");
        else
            GetAlbums(CurrentArtistId, AlbumOffset-10);
            setAlbumOffset(AlbumOffset-10);
      }
     


      return{GetAlbums,albumss,CurrentArtistName,getPrevAlbums,getNextAlbums,LoadinggAlbum};
 };