import "../styling/Build.css";
import dots from "../imgs/dots.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createAProduct } from "../features/buildSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllProductsQuery } from "../features/productsApi";

export default function Build() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const build = useSelector((state) => state.build);
  const auth = useSelector((state) => state.auth);
  const { data } = useGetAllProductsQuery();
  const [checking, setChecking] = useState([])

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

  const currentFlavors = [];
  data?.map((item) => currentFlavors.push(item.name))

  function handleProductSubmit(e) {
    e.preventDefault();

    if(newFlavor.name == ""){
      alert('you must make a name!')
    } else if(newFlavor.name.length > 15) {
      alert('name cannot exceed 15 characters!')
    } else if(currentFlavors.includes(newFlavor.name)){
      alert("sorry this name is taken!")
    } else if(newFlavor.toppings == "") {
      alert('you must choose a topping!')
    } else {
      try {
          dispatch(createAProduct(newFlavor));
          navigate(`/profile`)
          navigate(0)
      } catch (error) {
        alert(error);
      }
    }
  }

  const theToppings = ['sprinkles', 'double scoop', 'maraschino cherries', 'cake', 'caramel sauce',
    'whipped cream', 'strawberry sauce', 'crushed oreos', 'banana slices',
    'chili oil', 'hot fudge', 'raspberries', "s'mores", 'blueberries', 'pretzels', 'almonds'
  ];

  const theFlavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Combination']


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
                      {theFlavors.map((flav) => (
                      <option className="baseFlavorOptions" value={flav} key={flav}>
                        {flav}
                      </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="buildToppings col-6">
                  <h5 className="toppingsTitle">Choose your toppings:</h5>
                  <div className="toppingsContainer">
                    {theToppings.map((top) => (
                    <label className="container" key={top}>
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setChecking([...checking, e.target.value])
                          } else if (!e.target.checked) {
                            setChecking(checking.filter((unchecked) => unchecked !== e.target.value))
                          }
                          setNewFlavor({
                            ...newFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${newFlavor.flavor} base, this custom includes${checking.length >= 2 ? ` ${checking[0]}, ${checking[1]}, and...` : checking.length == 1 ? ` ${checking[0]} and...` : "..."} well, we don't wanna ruin all the mystery! Try it today!`,
                          })
                        }}
                        name="checkboxButtons"
                        value={top}
                      />
                      {top}
                    </label>
                  ))}
                  </div>
                </div>
              </div>
              <p>{build.createPError}</p>
              <button className="buildSubmitButton">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
