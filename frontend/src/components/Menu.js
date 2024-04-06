import "../styling/Menu.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../imgs/dots.png";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getTotals } from "../features/cartSlice";



export default function Menu() {
  const auth = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetAllProductsQuery();
  let cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // const navigate = useNavigate();


  function refresher() {
    window.reload();
  }

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div
      className="menuSection"
      style={{
        backgroundImage: `url(${bg})`,
        objectFit: "cover",
      }}
    >
      <div className="menuWrapper">
        {isLoading ? (
          <p className="loading">...Loading</p>
        ) : error ? (
          <p>An error occurred</p>
        ) : (
          <>
            <h3 className="menuTitle">Specials</h3>
            <p className="menuPara">
              Don't see your craving? Build it &nbsp;
              <Link to={auth._id ? "/build" : "/login"}>
                <span className="here">here!</span>
              </Link>
            </p>
            <div className="menuProducts">
              {data?.map((product) => (
                <div key={product._id} className="menuSpacer">
                  <Link
                    to={`/menu/${product._id}`}
                    className="cardWrapper"
                    onClick={refresher}
                  >
                    <div
                      className="card"
                      style={{
                        backgroundImage: `url(${product.imgUrl})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100% 150%",
                        backgroundPosition: "center center",
                        height: "13rem",
                        margin: "1rem",
                        backgroundColor: "transparent",
                        borderStyle: "none",
                      }}
                    >
                      <h3 className="productText">{product.name}</h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
