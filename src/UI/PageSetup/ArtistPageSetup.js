import { ShowArtistData } from "../Cards/ArtistCards";
import { Searchbar } from "../SearchBar/SearchBar";
import "./PageSetup.css";

export const artistPage = (
  ArtistName,
  setArtistName,
  Artists,
  Loadingg,
  getPrevArtists,
  getNextArtists,
  GetAlbums,
  NoResults
) => {
  return (
    <>
      <Searchbar ArtistName={ArtistName} setArtistName={setArtistName} />

      <div>
        {Loadingg === false ? (
          <ShowArtistData ArtistData={Artists} getalbums={GetAlbums} />
        ) : (
          <div className="loader"></div>
        )}
      </div>
      <h1 className="Noresults">{NoResults}</h1>
      <div>
        {Artists.length === 0 ? null : (
          <div>
            <br></br>
            <br></br>
            <button
              color="inherit"
              className="previous"
              onClick={getPrevArtists}
            >
              {" "}
              Previous{" "}
            </button>
            <button color="inherit" className="next" onClick={getNextArtists}>
              {" "}
              Next{" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
