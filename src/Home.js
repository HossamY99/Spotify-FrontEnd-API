import './App.css';

  export const home= ()=>{
    return(
        <button color="inherit" className='loginbutton' onClick={() => { login(); } }>
        <div class="buttonwrapper">
            <span class="text">Login</span>
            <span class="icon">  <i className="fa fa-spotify fa-3x"></i> </span>
        </div>
        </button>
    );

  };



  function login(){
    var client_id = 'e0edfae095bf44b399edb93af13f80a9';
    var redirect_uri = 'http://localhost:3000/authorized';
    var state = "abc";
    //localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email';
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location =url+"/url";
  }

  export const getReturnedParamsFromSpotifyAuth = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
     // console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };





