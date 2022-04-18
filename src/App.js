import React,{ useState,useEffect, useCallback } from "react";
import { ShowArtistData } from "./ArtistCards";
import { home, getReturnedParamsFromSpotifyAuth } from "./Home";
import './App.css';
import { BrowserRouter as Router, Routes ,Route, useNavigate } from 'react-router-dom';

import { AlbumExportData } from './AlbumCards';

function App() {

  
  let [ArtistName, setArtistName] = useState("");
  let [Artists, setArtists] = useState([]);
  let [Offset, setOffset] = useState(0);
  let [AlbumOffset, setAlbumOffset] = useState(0);
  let [CurrentArtistId, setCurrentArtistId] = useState(undefined);
  let [CurrentArtistName, setCurrentArtistName] = useState(undefined);



  let [Albums, setAlbums] = useState([]);
  let [token, settoken] = useState([localStorage.getItem("accessToken")]);

  let [NoResults, setNoResults] = useState("");


  useEffect(getArtists,[ArtistName]);
  let [Loading, setLoading] = useState(false);


  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash);
        localStorage.clear();
        localStorage.setItem("accessToken", access_token);
        if (token==""){settoken(access_token);}
        localStorage.setItem("tokenType", token_type);
        localStorage.setItem("expiresIn", expires_in);
    }
  });
  let navigate = useNavigate();
  var url="";




  const artistPage= ()=>{
        return(
          <div>
              <div style={{ textAlign: 'center', paddingTop: '30vh' }}>
              <form className="nosubmit">
                <input className="nosubmit" type="search" value={ArtistName} onChange={(e) => { setArtistName(e.target.value);} } placeholder='Search for an Artist!'/>  
              </form>
            </div>
        
            <div>
              {(Loading===false) ? (<ShowArtistData ArtistData={Artists} getalbums={GetAlbums} /> ) : (
                <div className="loader"></div> )}
            </div>
                  <h1 className='Noresults'>{NoResults}</h1>
            <div>
                  {(Artists.length===0) ? (null ) : (
                        <div>
                                <br></br><br></br>
                            <button color="inherit" className='previous' onClick={getPrevArtists}> Previous </button>
                            <button color="inherit" className='next' onClick={getNextArtists}> Next  </button>  
                          </div>
                          )}
              </div>
        </div>
        
        );};


  const albumPage= ()=>{
    return(
      <div>
      <div className='albumsHeader'>
       <h1> {CurrentArtistName} </h1>
       <p className='subtext'>Albums</p>
      </div>

      <div>
            {(Loading===false) ? (<AlbumExportData AlbumData={Albums} />) : (
               <div className="loader"></div> )}
      </div>
      
      {(Albums.length===0) ? (null) : (
        <div>
        <br></br><br></br>
      <button color="inherit" className='previous' onClick={getPrevAlbums}> Previous  </button>
      <button color="inherit" className='next' onClick={getNextAlbums}> Next  </button>  
      </div>
      )}
      </div>
    );
  };


  return (
    <>
       <div className="spotheader">   
              <h2 className='inspotheader'>Spotify Artist Search</h2>
        </div>  
    <div className="App">
    <Routes>
      <Route exact path="/" element={home()}> </Route>

      <Route exact path="/authorized" element={artistPage()}>   </Route>

      <Route exact path="/albums" element={albumPage()}>  </Route>

  </Routes>

    </div>
    </>
  );


  
 
  function getArtists(offset){
   if (offset===undefined)
   {
     offset=0;
   }
  if (ArtistName!="")
  {
   setLoading(true);
    url="https://api.spotify.com/v1/search?q=artist:"+ArtistName+"&type=artist&limit=20&offset="+offset;   
    fetch(`${url}`, {
      method: 'Get', 
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    }) .then(response => response.json())
      .then(data => {
        setArtists(data.artists.items);
        setLoading(false);
        if(data.artists.items.length!= undefined && data.artists.items.length===0)
        {
          setNoResults("No Results");
        }
        else{
          setNoResults("");
        }
    })
    .catch((error) => {
      console.log('error: ' + error);
      setLoading(false);
      setNoResults("No Results - Check if You have Access");
      
    });
   
  }
  }


 
  

  function GetAlbums(ArtistId,offset,name){
      if (offset===undefined)
      {
        offset=0;
      }
      if (name!=undefined)
      {
        setCurrentArtistName(name);
      }
      if (ArtistId!=null)
      {
       setCurrentArtistId(ArtistId);
       setLoading(true);
       url="https://api.spotify.com/v1/artists/"+ArtistId+"/albums?offset="+offset;

        fetch(`${url}`, {
          method: 'Get', 
          headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }) .then(response => response.json())
          .then(data => {
            setAlbums(data.items);
            setLoading(false);
            navigate("/albums");
        })
        .catch((error) => {
          console.log('error: ' + error);
        });
       
      }
      }
    

  function getNextArtists()
  {
    if(Artists.length<20)
    { 
        alert("No more results");

    }
    else{
      getArtists(Offset+10);
      setOffset(Offset+10);
    }
  }

  function getPrevArtists()
  {
    if (Offset===0)
    {
      alert("No Previous Pages");
    }
    else{
        getArtists(Offset-10);
        setOffset(Offset-10);
    }
  }



  function getNextAlbums()
  {
    
    if(Albums.length<20)
    { 
        alert("No more results");
    }
    else{
      GetAlbums(CurrentArtistId, AlbumOffset+10);
      setAlbumOffset(AlbumOffset+10);
    }
  }

  function getPrevAlbums()
  {
    if (AlbumOffset===0)
    {
      alert("No Previous Pages");
    }
    else{
        GetAlbums(CurrentArtistId, AlbumOffset-10);
        setAlbumOffset(AlbumOffset-10);
    }
  }

}

export default App;
