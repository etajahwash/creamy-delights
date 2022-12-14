import "../styling/About.css";
import underline from "../imgs/underline.png";
import icecreambg from "../imgs/aboutbg3.jpg";

export default function About() {
  return (
    <div
      className="aboutSection"
      style={{
        backgroundImage: `url(${icecreambg})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="aboutBigContainer">
        <div className="headerContainer">
          <h2 className="ourHistory">Our History</h2>
          <img src={underline} className="underline" alt="underline" />
        </div>
        <div className="aboutText">
          <p className="innerText">
            <span className="f">F</span>rom humble beginnings in a small town
            just outside of Lake Michigan, to being sold everywhere
            nationwide,&nbsp;
            <span className="cd">Creamy Delights</span> has come a long way!
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <div className="aboutOutline"></div>
        <div className="aboutSolid"></div>
      </div>
    </div>
  );
}
