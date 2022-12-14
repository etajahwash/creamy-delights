import "../styling/Testimonies.css";
import fun from "../imgs/fun.jpg";

export default function Testimonies() {
  return (
    <div
      className="testimoniesContainer"
      style={{
        backgroundImage: `url(${fun})`,
        objectFit: "cover",
        backgroundSize: "100% 100%",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="testSection">
        <h1 className="testTitle">
          Don't take it from us, see what our customers have to say!
        </h1>
        <div className="testSectionWrap">
          <div className="secOne col-6">
            <div className="eren">
              <div className="erenText">
                <p>
                  <span className="initial">"H</span>onestly, after tasting
                  this, every other ice cream company might as well not exist."
                  <br /> <span className="sig">-Eren J. </span>
                </p>
              </div>
            </div>
            <div className="mikasa">
              <div className="mikasaText">
                <p>
                  <span className="initial">"T</span>he moment I laid eyes on
                  this ice cream I knew I would dedicate the rest of my life to
                  it." <br /> <span className="sig">-Mikasa A.</span>
                </p>
              </div>
            </div>
          </div>
          <div className="secTwo col-6">
            <div className="armin">
              <div className="arminText">
                <p>
                  <span className="initial">"T</span>his ice cream makes me feel
                  <br /> large and in charge! " <br />
                  <span className="sig">-Armin A.</span>
                </p>
              </div>
            </div>
            <div className="erwin">
              <div className="erwinText">
                <p>
                  <span className="initial">"I</span> would die for this ice
                  cream." <br /> <span className="sig">-Erwin S.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
