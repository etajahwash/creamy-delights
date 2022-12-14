import "../styling/Build.css";
import dots from "../imgs/dots.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createAProduct } from "../features/buildSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Build() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const build = useSelector((state) => state.build);
  const auth = useSelector((state) => state.auth);

  const [newFlavor, setNewFlavor] = useState({
    name: "",
    price: "3.99",
    flavor: "Vanilla",
    toppings: "",
    description: "",
    imgUrl:
      "https://lh3.googleusercontent.com/b1-j6VMqeNHiBKz9rcQvGh47lsu2YZDLFh6cEJLrwu5nLk_nMNMZ71Yk1dbBxrFot3y9iORQIsqWAZwU_EQ6i1uf9mgdHZLQTmbCO3hEF3wYWa-onvBOXoeksd--PluV3TiQGGy8QQ=w2400",
    matchId: `${auth._id ? auth._id : 0}`,
  });

  function handleProductSubmit(e) {
    e.preventDefault();
    try {
      dispatch(createAProduct(newFlavor));
      if (newFlavor.name !== "" && newFlavor.toppings !== "") {
        navigate(`/profile`);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(newFlavor);
  }, [newFlavor]);

  return (
    <div
      className="buildSection"
      style={{
        backgroundImage: `url(${dots})`,
        backgroundColor: "lavenderblush",
        objectFit: "cover",
      }}
    >
      <div className="buildWrapper">
        <div className="buildTitle">
          <span className="buildEmoji">🛠️</span>Build Your Own Ice Cream!
        </div>
        <div className="buildFlex">
          <div className="buildLeft col-6">
            <div className="buildImgContainerSection col-6">
              <div
                className="buildImgContainer"
                style={{
                  backgroundImage: `url(${newFlavor.imgUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "70% 80%",
                  objectFit: "contain",
                }}
              >
                <Link to="/menu" className="buildBackContainer">
                  <ArrowBackIosNewIcon fontSize="small" />
                  <h5 className="buildBack">Back</h5>
                </Link>
              </div>
            </div>
          </div>
          <div className="buildRight col-6">
            <form
              action="/menu:id"
              method="POST"
              className="buildForm"
              onSubmit={handleProductSubmit}
            >
              <div className="creationSection">
                <div className="buildFlavor col-6">
                  <div className="buildNameSection col-6">
                    <label htmlFor="giveName" className="buildNameLabel">
                      Give it a Name:{" "}
                    </label>
                    <br />
                    <input
                      type="text"
                      name="giveName"
                      onChange={(e) =>
                        setNewFlavor({ ...newFlavor, name: e.target.value })
                      }
                      placeholder="ice cream's name"
                      className="buildNameInput"
                    />
                  </div>
                  <div className="baseFlavor">
                    <label htmlFor="name" className="baseFlavorName">
                      Choose a base flavor:
                    </label>
                    <br />
                    <select
                      className="baseFlavorSelect"
                      onChange={(e) =>
                        setNewFlavor({ ...newFlavor, flavor: e.target.value })
                      }
                    >
                      <option className="baseFlavorOptions" value="Vanilla">
                        Vanilla
                      </option>
                      <option className="baseFlavorOptions" value="Chocolate">
                        Chocolate
                      </option>
                      <option className="baseFlavorOptions" value="Strawberry">
                        Strawberry
                      </option>
                      <option className="baseFlavorOptions" value="Combination">
                        Combination
                      </option>
                    </select>
                  </div>
                </div>
                <div className="buildToppings col-6">
                  <h5 className="toppingsTitle">Choose your toppings:</h5>
                  <div className="toppingsContainer">
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="sprinkles"
                      />
                      sprinkles
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="caramel sauce"
                      />
                      caramel sauce
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="double scoop"
                      />
                      double scoop
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="maraschino cherries"
                      />
                      maraschino cherries
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="cake"
                      />
                      cake
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="whipped cream"
                      />
                      whipped cream
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="strawberry sauce"
                      />
                      strawberry sauce
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="crushed oreos"
                      />
                      crushed oreos
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="banana slices"
                      />
                      banana slices
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="chili oil"
                      />
                      chili oil
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="hot fudge"
                      />
                      hot fudge
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="raspberries"
                      />
                      raspberries
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="s'mores"
                      />
                      s'mores
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="blueberries"
                      />
                      blueberries
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="pretzels"
                      />
                      pretzels
                    </label>
                    <label className="container">
                      <input
                        type="checkbox"
                        className="checkboxes"
                        onChange={(e) =>
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                          })
                        }
                        name="checkboxButtons"
                        value="almonds"
                      />
                      almonds
                    </label>
                  </div>
                </div>
              </div>
              <p>{build.createPError}</p>
              <button className="buildSubmitButton">Submit</button>
            </form>
            <div
              onChange={(e) =>
                setNewFlavor({
                  ...newFlavor,
                  description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
                })
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
