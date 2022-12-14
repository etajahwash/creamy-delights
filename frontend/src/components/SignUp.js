import "../styling/SignUp.css";
import loginbg from "../imgs/loginbg.jpg";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
  };

  useEffect(() => {
    if (auth._id) {
      navigate("/");
    }

    console.log(user);
  }, [auth._id, navigate, user]);
  return (
    <div
      className="signUpContainer"
      style={{
        backgroundImage: `url(${loginbg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="signUpWrap">
        <div className="signUpSection">
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <hr className="suHr" />
            <div className="suName">
              <label className="createName">Enter your name:</label>
              <input
                type="text"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                className="suNameText"
                placeholder="Name"
              />
            </div>
            <div className="suEmail">
              <label className="createEmail">Enter your email:</label>
              <input
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="suEmailText"
                placeholder="Email"
              />
            </div>
            <div className="suPassword">
              <label className="createPassword">Create a password:</label>
              <input
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="suPasswordText"
                placeholder="Password"
              />
            </div>
            <button className="suSubmitButton">
              {auth.registerStatus === "pending" ? "Submitting" : "Submit"}
            </button>

            {auth.registerStatus === "rejected" ? (
              <p className="authUserExist">{auth.registerError}</p>
            ) : null}
          </form>
          <Link to="/login" className="suBack">
            <ArrowBackIosNewIcon fontSize="small" />
            <h5 className="suBackText">Back</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
