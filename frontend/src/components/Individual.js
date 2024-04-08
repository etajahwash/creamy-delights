import "../styling/Individual.css";
import dots from "../imgs/dots.png";
import { useEffect } from "react";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Link, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../features/productIdApi";
import { useDispatch } from "react-redux";
import {
  addToCart,
  numIncrease,
  numDecrease,
  getTotals,
  removeFromCart,
} from "../features/cartSlice";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const backendIndAPI = process.env.REACT_APP_API_URL;

export default function Individual() {
  let cart = useSelector((state) => state.cart);
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetProductByIdQuery(id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (data) => {
    dispatch(addToCart(data));
  };

  const removingFromCart = (data) => {
    dispatch(removeFromCart(data));
  };

  const numsIncrease = function handleNumIncrease(data) {
    dispatch(numIncrease(data));
  };

  const numsDecrease = function handleNumIncrease(data) {
    dispatch(numDecrease(data));
  };

  const deleteProduct = () => {
    cart.cartItems?.map((item) => (item._id === id) ? removingFromCart(item) : null);
    axios.delete(`${backendIndAPI}/products/delete/${id}`)
      .then((res) => console.log(`Deleted ${data.name}`))
      .catch((error) => console.log(error));
    navigate(`/menu`);
    navigate(0)
    setTimeout(() => {
    toast(`You have deleted ${data.name}`, {
      position: "bottom-left",
      theme: "light",
      autoClose: 3500,
    })
  }, 3000)
  };

  function updateScreen() {
    navigate(`/menu/update/${id}`);
  }

  return (
    <div
      className="inContainer"
      style={{
        backgroundImage: `url(${dots})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundColor: "lavender",
      }}
    >
      {isLoading ? (
        <p className="loading">...Loading</p>
      ) : error ? (
        <>
        <p className="errorLoad">An error occurred</p>
        <p className="errorLoad smallerError">please refresh the page</p>
        </>
      ) : (
        <>
          <div className="inSectionOne">
            <div className="imgContainerSection col-lg-6 col-md-6 col-sm-12">
              <div
                className="imgContainer"
                style={{
                  backgroundImage: `url(${data?.imgUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "70% 80%",
                  objectFit: "contain",
                }}
              >
                <Link to="/menu" className="inBackContainer">
                  <ArrowBackIosNewIcon fontSize="small" />
                  <h5 className="inBack">Back</h5>
                </Link>
              </div>
            </div>
            <div className="inTextContainer col-lg-6 col-md-6 col-sm-12">
              <h1 className="inTitle">{data?.name}</h1>
              <div className="bigDiv">
                <div className="smallDiv">
                  <p
                    className={data?.matchId === "0" ? "descPara" : data?.matchId !== "0" && data?.description.length > 180 ? "customPara shrinkingText" : "customPara"}
                  >
                    {data?.description}
                  </p>
                </div>
              </div>
              <div className="middleContainer">
                <div className="priceSection">
                  <p className="price">${data?.price}</p>
                  <div className="addSection">
                    <RemoveCircleIcon
                      className="remove"
                      fontSize="large"
                      onClick={numsDecrease}
                    />
                    <h1 className="cartAdd">{cart.nums}</h1>
                    <AddCircleIcon
                      className="add"
                      fontSize="large"
                      onClick={numsIncrease}
                    />
                  </div>
                </div>
                <button
                  className="addToCart"
                  onClick={() => handleAddToCart(data)}
                >
                  Add to Cart
                </button>{" "}
                <br />
                {auth._id && data?.matchId === auth._id ? (
                  <div className="inBottomButtonsContainer">
                    <button className="inUpdateButton" onClick={updateScreen}>
                      Update
                    </button>
                    <button
                      className="inDeleteButton"
                      onClick={() => deleteProduct(data?._id)}
                    >
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="inSectionTwo">
            <div className="imgContainerSection col-lg-6 col-md-12 col-sm-12">
              <h1 className="inTitle">{data?.name}</h1>
              <div
                className="imgContainer"
                style={{
                  backgroundImage: `url(${data?.imgUrl})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "60% 70%",
                  objectFit: "contain",
                }}
              >
                <Link to="/menu" className="inBackContainer">
                  <ArrowBackIosNewIcon fontSize="small" />
                  <h5 className="inBack">Back</h5>
                </Link>
              </div>
              <div className="inHiddenBottom">
                <div className="smallDiv">
                  <p
                    className={data?.matchId === "0" ? "descPara" : "customPara"}
                  >
                    {data?.description}
                  </p>
                </div>
                <div className="priceSection">
                  <div className="firstPrice">
                    <div className="secondPrice">
                      <p className="price">${data?.price}</p>
                      <div className="addSection">
                        <RemoveCircleIcon
                          className="remove"
                          fontSize="large"
                          onClick={numsDecrease}
                        />
                        <h1 className="cartAdd">{cart.nums}</h1>
                        <AddCircleIcon
                          className="add"
                          fontSize="large"
                          onClick={numsIncrease}
                        />
                      </div>
                    </div>
                    <button
                      className="addToCart"
                      onClick={() => handleAddToCart(data)}
                    >
                      Add to Cart
                    </button>{" "}
                    <br />
                    {auth._id && data?.matchId === auth._id ? (
                      <div className="inBottomButtonsContainer">
                        <button
                          className="inUpdateButton"
                          onClick={updateScreen}
                        >
                          Update
                        </button>
                        <button
                          className="inDeleteButton"
                          onClick={() => deleteProduct(id)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
