import { Show_Artist_Data } from "../Cards/ArtistCards";
import { Searchbar } from "../SearchBar/SearchBar";
import "./PageSetup.css";

export const ArtistPage = (
  ArtistName,
  setArtistName,
  Artists,
  Loadingg,
  get_Prev_Artists,
  get_Next_Artists,
  Get_Albums,
  NoResults
) => {
  return (
    <>
      <Searchbar ArtistName={ArtistName} setArtistName={setArtistName} />

      <div>
        {Loadingg === false ? (
          <Show_Artist_Data ArtistData={Artists} getalbums={Get_Albums} />
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
              onClick={get_Prev_Artists}
            >
              {" "}
              Previous{" "}
            </button>
            <button color="inherit" className="next" onClick={get_Next_Artists}>
              {" "}
              Next{" "}
            </button>
          </div>
        )}
      </div>
    </>
  );
};
