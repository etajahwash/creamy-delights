import "../styling/Login.css";
import loginbg from "../imgs/loginbg.jpg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className="loginSection"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <h1 className="loginTitle">
        Don't be on the out. <br /> Be in the in.
        <br />
        <br />
        <br />
        <span className="sut">Sign up today!</span>
      </h1>
      <div className="liBundle">
        <Link to="/signup">
          <button className="signUpButton lps">Sign Up</button>
        </Link>
        <h3 className="already">Already a member?</h3>
        <Link to="/loggingin">
          <button className="loginButton lps">Login</button>
        </Link>
      </div>
    </div>
  );
}
