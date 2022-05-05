import { ArtistCode } from "./ArtistAlbumFunctions/CodeArtist";
import React from "react";
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { artistPage } from "../UI/PageSetup/ArtistPageSetup";
import { albumPage } from "../UI/PageSetup/AlbumPageSetup";
import { TokenLoad } from "./LoginOnload/OnLoad";
import { Albumcode } from "./ArtistAlbumFunctions/CodeAlbum";


export const ArtistAndAlbum=()=>{
    TokenLoad();
    const {ArtistName,setArtistName,Artists,Loadingg,getPrevArtists,getNextArtists,NoResults}=ArtistCode();    
    const {GetAlbums,albumss,CurrentArtistName,getPrevAlbums,getNextAlbums,LoadinggAlbum}=Albumcode();
    return (
        <div>
        <Routes>
        <Route exact path="/" element={artistPage(ArtistName,setArtistName,Artists,Loadingg,getPrevArtists,getNextArtists,GetAlbums,NoResults)}>  </Route>
        <Route exact path="/albums" element={albumPage(LoadinggAlbum,albumss,CurrentArtistName,getPrevAlbums,getNextAlbums)}>  </Route>
      </Routes>
      </div>  
    )

};


