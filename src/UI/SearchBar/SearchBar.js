import "./SearchBar.css";
export const Searchbar = (props) => (
  <div style={{ textAlign: "center", paddingTop: "30vh" }}>
    <form className="nosubmit">
      <input
        className="nosubmit"
        type="search"
        value={props.ArtistName}
        onChange={(e) => {
          props.setArtistName(e.target.value);
        }}
        placeholder="Search for an Artist!"
      />
    </form>
  </div>
);
