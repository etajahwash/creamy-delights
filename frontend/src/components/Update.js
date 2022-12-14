import "../styling/Update.css";
import dots from "../imgs/dots.png";
import mystery from "../imgs/mystery.png";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../features/productIdApi";
import { useParams } from "react-router-dom";
import { url } from "../features/api";
import axios from "axios";

export default function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const update = useSelector((state) => state.update);

  const { data, isLoading, error } = useGetProductByIdQuery(id);

  const [updateFlavor, setUpdateFlavor] = useState({
    name: "",
    flavor: "Vanilla",
    toppings: "",
    description: "",
  });

  function handleProductSubmit(e) {
    e.preventDefault();
    if (updateFlavor.toppings !== "") {
      navigate(`/menu/${id}`);
      window.location.reload();
    }
  }

  function submitUpdate(id) {
    axios.put(`${url}/products/update/${id}`, {
      id: id,
      name: updateFlavor.name,
      flavor: updateFlavor.flavor,
      toppings: updateFlavor.toppings,
      description: updateFlavor.description,
    });
  }

  return (
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
              ? (updateFlavor.name = `${data.name}`)
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
                  onSubmit={handleProductSubmit}
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
                          placeholder={data.name}
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
                          <option className="baseFlavorOptions" value="Vanilla">
                            Vanilla
                          </option>
                          <option
                            className="baseFlavorOptions"
                            value="Chocolate"
                          >
                            Chocolate
                          </option>
                          <option
                            className="baseFlavorOptions"
                            value="Strawberry"
                          >
                            Strawberry
                          </option>
                          <option
                            className="baseFlavorOptions"
                            value="Combination"
                          >
                            Combination
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="updateToppings col-6">
                      <h5 className="toppingsTitle">Choose your toppings:</h5>
                      <div className="toppingsContainer">
                        <label className="container">
                          <input
                            type="checkbox"
                            className="checkboxes"
                            onChange={(e) =>
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${setUpdateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                              setUpdateFlavor({
                                ...updateFlavor,
                                toppings: e.target.value,
                                description: `Enjoy this mystery, creamy customer classic! With a delicious ${updateFlavor.flavor} base, this custom includes: ${e.target.value} and... well, we don't wanna ruin the mystery! Try it today!`,
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
                  <p>{update.updatePError}</p>
                  <button
                    onClick={() => submitUpdate(data._id)}
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
  );
}
