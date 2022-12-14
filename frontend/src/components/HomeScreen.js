import "../styling/HomeScreen.css";
import bg2 from "../imgs/icecreambg3.jpg";
import wavie from "../imgs/wavie.png";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  return (
    <div className="homeScreenContainer">
      <div
        className="firstHalf col-sm-12 col-md-6 col-lg-8"
        style={{
          backgroundImage: `url(${bg2})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        <div className="leftText">
          <h3 className="tasty">
            Looking for a tasty treat? <br /> We've got just the thing!
          </h3>
          <br />
          <Link to="/menu">
            <button className="button">ORDER NOW</button>
          </Link>
        </div>
      </div>
      <div className="minis col-sm-12 col-md-6 col-lg-4">
        <div
          className="wavie"
          style={{
            backgroundImage: `url(${wavie})`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></div>
      </div>
    </div>
  );
}
