import "../styling/Menu.css";
import { Link } from "react-router-dom";
import bg from "../imgs/dots.png";
import { useGetAllProductsQuery } from "../features/productsApi";
import { useSelector } from "react-redux";

export default function Menu() {
  const auth = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetAllProductsQuery();

  function refresher() {
    window.reload();
  }
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
