import "../styling/Update.css";
import dots from "../imgs/dots.png";
import mystery from "../imgs/mystery.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../features/productIdApi";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useParams } from "react-router-dom";
import axios from "axios";
const backendUpdAPI = process.env.REACT_APP_API_URL;


export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const update = useSelector((state) => state.update);
  const auth = useSelector((state) => state.auth);
  const allItems = useGetAllProductsQuery();
  const { data, isLoading, error } = useGetProductByIdQuery(id);
  const [checking, setChecking] = useState([])
  const [updateFlavor, setUpdateFlavor] = useState({
    name: "",
    flavor: "Vanilla",
    toppings: "",
    description: "",
  });

  const theToppings = ['sprinkles', 'double scoop', 'maraschino cherries', 'cake', 'caramel sauce',
    'whipped cream', 'strawberry sauce', 'crushed oreos', 'banana slices',
    'chili oil', 'hot fudge', 'raspberries', "s'mores", 'blueberries', 'pretzels', 'almonds'
  ];

  const theFlavors = ['Vanilla', 'Chocolate', 'Strawberry', 'Combination']

  const allFlavors = [];
    allItems.data?.map((item) => {
      if(item.name !== data?.name){
      return allFlavors.push(item.name)
      }
    })

  useEffect(() => {
    // if(data?.matchId !== auth._id) {
    //   navigate(`/`)
    // }
    console.log(updateFlavor)
  })


  function submitUpdate(e) {
    e.preventDefault();

    if(updateFlavor.name.length > 15) {
      alert('name cannot exceed 15 characters!')
    } else if(allFlavors.includes(updateFlavor.name)){
      alert("sorry this name is taken!")
    } else if(updateFlavor.toppings === "") {
      alert('you must choose a topping!')
    } else {
      try {
      axios.put(`${backendUpdAPI}/products/update/${id}`, {
      name: updateFlavor.name,
      // price: updateFlavor.price,
      flavor: updateFlavor.flavor,
      toppings: updateFlavor.toppings,
      description: updateFlavor.description,
      // imgUrl: updateFlavor.imgUrl,
      // matchId: updateFlavor.matchId
      })
      } catch (error) {
        alert(error)
      }

    // setTimeout(() => {
    //     navigate(`/menu/${id}`);
    //     window.location.reload();
    //  }, '1000')
    }
  }

  return (
    <>
    <div
      className="updateSection"
      style={{
        backgroundImage: `url(${dots})`,
        backgroundColor: "lavenderblush",
        objectFit: "cover",
      }}
    >
      {isLoading ? (
        <p className="loading">...Loading</p>
      ) : error ? (
        <p>An error occurred</p>
      ) : (
        <>
          {" "}
          <div className="theHidden">
            {updateFlavor.name === ""
              ? (updateFlavor.name = `${data?.name}`)
              : null}
          </div>
          <div className="updateWrapper">
            <div className="updateTitle">
              <span className="updateEmoji">⬆️</span>Update Your Ice Cream!
            </div>
            <div className="updateFlex">
              <div className="updateLeft col-6">
                <div className="updateImgContainerSection col-6">
                  <div
                    className="updateImgContainer"
                    style={{
                      backgroundImage: `url(${mystery})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "70% 80%",
                      objectFit: "contain",
                    }}
                  >
                    <Link to="/menu" className="updateBackContainer">
                      <ArrowBackIosNewIcon fontSize="small" />
                      <h5 className="updateBack">Back</h5>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="updateRight col-6">
                <form
                  action="/menu:id"
                  method="PUT"
                  className="updateForm"
                  onSubmit={submitUpdate}
                >
                  <div className="updateCreationSection">
                    <div className="updateFlavor col-6">
                      <div className="updateNameSection col-6">
                        <label htmlFor="giveName" className="updateNameLabel">
                          Give it a Name:{" "}
                        </label>
                        <br />
                        <input
                          type="text"
                          name="giveName"
                          onChange={(e) =>
                            setUpdateFlavor({
                              ...updateFlavor,
                              name: e.target.value,
                            })
                          }
                          placeholder={data?.name}
                          className="updateNameInput"
                        />
                      </div>
                      <div className="updateBaseFlavor">
                        <label htmlFor="name" className="updateBaseFlavorName">
                          Choose a base flavor:
                        </label>
                        <br />
                        <select
                          className="baseFlavorSelect"
                          onChange={(e) =>
                            setUpdateFlavor({
                              ...updateFlavor,
                              flavor: e.target.value,
                            })
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
                    <div className="updateToppings col-6">
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
                          setUpdateFlavor({
                            ...updateFlavor,
                            toppings: e.target.value,
                            description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes${checking.length >= 2 ? ` ${checking[0]}, ${checking[1]}, and...` : checking.length === 1 ? ` ${checking[0]} and...` : "..."} well, we don't wanna ruin all the mystery! Try it today!`,
                          })
                        }}
                        name="checkboxButtons"
                        value={top}
                      />
                      {top}
                    </label>
                  ))}                      </div>
                    </div>
                  </div>
                  <p>{update.updatePError}</p>
                  <button
                    className="updateSubmitButton"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}
