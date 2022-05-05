import { AlbumExportData } from "../Cards/AlbumCards";
import "./PageSetup.css";

export const AlbumPage = (
  LoadinggAlbum,
  albumss,
  CurrentArtistName,
  getPrevAlbums,
  getNextAlbums
) => {
  return (
    <div>
      <div className="albumsHeader">
        <h1> {CurrentArtistName} </h1>
        <p className="subtext">Albums</p>
      </div>

      <div>
        {LoadinggAlbum === false ? (
          <AlbumExportData AlbumData={albumss} />
        ) : (
          <div className="loader"></div>
        )}
      </div>

      {(albumss == undefined || albumss?.length === 0 || LoadinggAlbum==true) ? null : (
        <div>
          <br></br>
          <br></br>
          <button color="inherit" className="previous" onClick={getPrevAlbums}>
            {" "}
            Previous{" "}
          </button>
          <button color="inherit" className="next" onClick={getNextAlbums}>
            {" "}
            Next{" "}
          </button>
        </div>
      )}
    </div>
  );
};
