import './Cards.css';
import React from "react";

var NoimageLink="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png";


export const AlbumExportData= (props)=> {
    if (props.AlbumData!=null )
    {
    return (
        <>
            <div className="wrapper">
            {props.AlbumData.map(album =>
               <Card
                        img={ album.images.length==0? NoimageLink : album.images[0].url}
                        title={album.name}
                        tracks={album.total_tracks}
                        artists={album.artists}
                        releaseDate={album.release_date}
                        link={album.external_urls.spotify}              
                    />
                    )
                }
            </div>
        </>
    );
    }
    else{
        return (null)
    }        
};




function Card(props) {
    return (
      <div className="card">
        <div className="card__body_album">
          <img src={props.img} className="card__image" />      
          <h2 className="card__title">{props.title}</h2>
          <div className='moreinfo'>
            <div className='separate'>
          {props.artists.map(artist=><div className='looped' ><p className='Partist'> {artist.name} </p><br></br></div> )}  
          </div>        
          <div className='bt'>
           <p >{props.releaseDate}</p>
            <p >{props.tracks} tracks</p>
            </div>
          </div>
        </div>
        <div className='rating'>
        </div>
        <div className="card__btn" >
        <a href={props.link}>Preview On Spotify</a>
        </div>
      </div>
    );
  }

  
