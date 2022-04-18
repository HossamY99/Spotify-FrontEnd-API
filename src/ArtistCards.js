import './Cards.css';
import React,{ useState,useEffect, useCallback } from "react";

var NoimageLink="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";


export const ShowArtistData= (props)=> {
    
    
    if (props.ArtistData!=null )
    {        
    return (
        <>
        <br></br><br></br>
            <div className="wrapper">
            {props.ArtistData.map(artist =>
               <Card
                        img={ artist.images.length==0? NoimageLink : artist.images[0].url}
                        title={artist.name}
                        popularity={artist.popularity}
                        id={artist.id}
                        function={props.getalbums}
                        followers={artist.followers.total}
                    />
                    )
                }
            </div>
        </>
    );
    }
    else{
        return (<h1>AAA</h1>)
    }        
};




function Card(props) {
    
    return (
      <div className="card" onClick={()=>{props.function(props.id,0,props.title);  }}>
        <div className="card__body">
          <img src={props.img} className="card__image" />      
          <h2 className="card__title">{props.title}</h2>
          <p className="card__description">{props.followers.toLocaleString('en-US')} followers</p>
        </div>
        <br></br> <br></br>
        <div className='rating'>
        {stars(props.popularity)}
        </div>
        <br></br>
      </div>
    );
  }

  function stars(popularity){
    var i=1;
    const row = [];
    var numStars=Math.round(popularity/20);
    while (i<=5)
    {
       if (numStars>0)
       {
             row.push(<span className="fa fa-star checked"></span>);
             numStars-=1;
       }
       else{
            row.push(<span className='fa fa-star gray'></span>);
            }
       i=i+1;
    }
    return row;
      
  }
  
