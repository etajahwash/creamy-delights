import "../styling/LoggingIn.css";
import loginbg from "../imgs/loginbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { toast } from "react-toastify";

export default function LoggingIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  console.log(auth);

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }

    console.log(auth._id);
  }, [auth._id, navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(user));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="loggingInContainer"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="loggingInWrap">
        <div className="loggingInSection">
          <form onSubmit={handleLoginSubmit}>
            <h1>Login</h1>
            <hr className="liHr" />
            <div className="liEmail">
              <label className="liEmailLabel">Enter Email:</label>
              <input
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="liEmailText"
                placeholder="Email"
              />
            </div>
            <div className="liPassword">
              <label className="liPasswordLabel">Enter password:</label>
              <input
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="liPasswordText"
                placeholder="Password"
              />
            </div>
            <button
              onClick={
                auth.loginStatus === "success"
                  ? toast(`➡️ You have logged in.`, {
                      position: "bottom-left",
                      theme: "light",
                      autoClose: 3500,
                    })
                  : null
              }
              className="liSubmitButton"
            >
              {auth.loginStatus === "pending" ? "Logging In" : "Login"}
            </button>

            {auth.loginStatus === "rejected" ? (
              <p className="loginUserExist">{auth.loginError}</p>
            ) : null}
          </form>
          <Link to="/login" className="liBack">
            <ArrowBackIosNewIcon fontSize="small" />
            <h5 className="liBackText">Back</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
