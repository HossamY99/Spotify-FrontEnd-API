import { Artist_Code } from "./ArtistAlbumFunctions/CodeArtist";
import React from "react";
import { BrowserRouter as Router, Routes ,Route } from 'react-router-dom';
import { ArtistPage } from "../UI/PageSetup/ArtistPageSetup";
import { AlbumPage } from "../UI/PageSetup/AlbumPageSetup";
import { Token_Load } from "./LoginOnload/OnLoad";
import { Album_code } from "./ArtistAlbumFunctions/CodeAlbum";


export const Artist_Album=()=>{
    Token_Load();
    const {ArtistName,setArtistName,Artists,Loadingg,get_Prev_Artists,get_Next_Artists,NoResults}=Artist_Code();    
    const {Get_Albums,albumss,CurrentArtistName,get_Prev_Albums,get_Next_Albums,LoadinggAlbum}=Album_code();
    return (
        <div>
        <Routes>
        <Route exact path="/" element={ArtistPage(ArtistName,setArtistName,Artists,Loadingg,get_Prev_Artists,get_Next_Artists,Get_Albums,NoResults)}>  </Route>
        <Route exact path="/albums" element={AlbumPage(LoadinggAlbum,albumss,CurrentArtistName,get_Prev_Albums,get_Next_Albums)}>  </Route>
      </Routes>
      </div>  
    )

};


