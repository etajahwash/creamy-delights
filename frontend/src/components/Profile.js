import "../styling/Profile.css";
import profilebg from "../imgs/profilebg5.jpg";
import miniprofile from "../imgs/miniprofile.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/authSlice";
import { toast } from "react-toastify";
import { useGetAllProductsQuery } from "../features/productsApi";

export default function Profile() {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.auth);

  const { data, isLoading, error } = useGetAllProductsQuery();

  function handleAlert() {
    alert("confirm profile change");
  }
  return (
    <div
      className="profileSection"
      style={{
        backgroundImage: `url(${profilebg})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="profilePicContainer">
        <div className="profileUpperSection">
          <h2 className="profileWelcome">Welcome,</h2>
          <div className="profileWrapper">
            <div
              className="profilePic"
              style={{
                backgroundImage: `url(${miniprofile})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
              onClick={handleAlert}
            ></div>
            <Link to="/">
              <h5
                className="logOutText"
                onClick={() => {
                  dispatch(logoutUser(null));
                  toast(`⬅️ You have logged out.`, {
                    position: "bottom-left",
                    theme: "light",
                    autoClose: 3500,
                  });
                }}
              >
                log out
              </h5>
            </Link>
          </div>
          <h2 className="profileName">{loggedIn.name}</h2>
        </div>
        <div className="profileItemsSection">
          <div className="creationsSection">
            <h2 className="creationTitle">Your Creations</h2>
            <hr className="profileHr" />
            <div className="creationProductContainer">
              {isLoading ? (
                <p className="loading">...Loading</p>
              ) : error ? (
                <p>An error occurred</p>
              ) : (
                <>
                  {data?.map((customs) => (
                    <div key={customs._id} className="profileKey">
                      {customs.matchId === loggedIn._id ? (
                        <Link
                          to={`/menu/${customs._id}`}
                          className="cardWrapper"
                        >
                          <div
                            className="card creationList"
                            style={{
                              backgroundImage: `url(${customs.imgUrl})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "100% 150%",
                              backgroundPosition: "center center",
                              height: "13rem",
                              margin: "1rem",
                              backgroundColor: "transparent",
                              borderStyle: "none",
                            }}
                          >
                            <h3 className="productText">{customs.name}</h3>
                          </div>
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
          <div className="ordersSection">
            <Link to="/build">
              <h2 className="profileBuild profileTwin">BUILD</h2>
            </Link>
            <div>
              {/* <h1>{useGetAllOrdersQuery.data}</h1> */}
              {/* {useGetAllOrdersQuery.data.map(order => {
                                    <>
                                    <h1>{order._id}</h1>
                                    </>
                                })} */}
            </div>
            <div className="midWrapper">
              <hr className="profileHr" />
              <h6 className="midOr">or</h6>
              <hr className="profileHr" />
            </div>
            <Link to="/menu">
              <h2 className="profileShop profileTwin">SHOP</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
