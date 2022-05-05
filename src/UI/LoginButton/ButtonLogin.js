import "./Button.css";
import { login } from "../../Functionality/LoginOnload/OnLoad";

export const buttonlogin = () => {
  return (
    <button
      color="inherit"
      className="loginbutton"
      onClick={() => {
        login();
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
