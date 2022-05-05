import "./Button.css";
import { login_P } from "../../Functionality/LoginOnload/OnLoad";

export const Buttonlogin = () => {
  return (
    <button
      color="inherit"
      className="loginbutton"
      onClick={() => {
        login_P();
      }}
    >
      <div class="buttonwrapper">
        <span class="text">Login</span>
        <span class="icon">
          {" "}
          <i className="fa fa-spotify fa-3x"></i>{" "}
        </span>
      </div>
    </button>
  );
};
