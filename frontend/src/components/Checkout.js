import "../styling/Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  decreaseCart,
  increaseCart,
  cartQuantity,
  clearCart,
  getTotals,
} from "../features/cartSlice";
import cbg from "../imgs/cobg3.jpg";
import { Link } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect } from "react";
import PayButton from "./PayButton";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  };

  const handleDecreaseCart = (cartItem) => {
    dispatch(decreaseCart(cartItem));
  };

  const handleIncreaseCart = (cartItem) => {
    dispatch(increaseCart(cartItem));
    dispatch(cartQuantity(cartItem));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div
      className="checkoutSection"
      style={{
        backgroundImage: `url(${cbg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        objectFit: "cover",
        backgroundPosition: "center center",
      }}
    >
      {cart.cartItems.length === 0 ? (
        <div className="cartEmptyContainer">
          <p className="cartEmptyText"> Your cart is empty</p>
          <div className="coStartShopping">
            <Link to="/menu">
              <h3 className="coStartShoppingText"> Start shopping</h3>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <>
            <div className="coLeft col-lg-8 col-md-6">
              <h1 className="yourCart"> Your Cart</h1>
              <div className="actualCart">
                <div className="actualCartWrapper">
                  <div className="cartMiniTitle">
                    <div className="cartItem cmt col-6">Item</div>
                    <div className="cartPrice cmt col-2">Price</div>
                    <div className="cartQuantity cmt col-2">Qty</div>
                    <div className="cartTotal cmt col-2">Total</div>
                  </div>
                  {cart.cartItems?.map((cartItem) => (
                    <div key={cartItem.price}>
                      <div>
                        <hr className="coHr" />
                      </div>
                      <div className="cartMiniItems">
                        <div className="coItem col-6">
                          <div
                            className="coItemImg"
                            style={{
                              backgroundImage: `url(${cartItem.imgUrl})`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center center",
                              backgroundSize: "cover",
                            }}
                          ></div>
                          <div className="coItemTitle">{cartItem.name}</div>
                        </div>
                        <div className="coPrice col-2 coBigger">
                          ${cartItem.price}
                        </div>
                        <div className="coQuantity col-2">
                          <div className="addSection">
                            <RemoveCircleIcon
                              className="coRemove"
                              fontSize="large"
                              onClick={() => handleDecreaseCart(cartItem)}
                            />
                            <h1 className="coAddNumber">
                              {cartItem.cartQuantity}
                            </h1>
                            <AddCircleIcon
                              className="coAdd"
                              fontSize="large"
                              onClick={() => handleIncreaseCart(cartItem)}
                            />
                          </div>
                        </div>
                        <div className="coTotal col-2 coBigger">
                          ${(cartItem.price * cartItem.cartQuantity).toFixed(2)}
                          <div className="coRemoveSection">
                            <DeleteIcon
                              className="coDeleteIcon"
                              fontSize="small"
                              onClick={() => handleRemoveFromCart(cartItem)}
                            />
                            <h5
                              className="coRemoveText"
                              onClick={() => handleRemoveFromCart(cartItem)}
                            >
                              Remove
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="coEndSection">
                <div className="coEnd">
                  <Link to="/menu" className="coMenuLink">
                    <ArrowBackIosNewIcon className="coArrowBack " />
                    <h3 className="coContinueShopping">CONTINUE SHOPPING</h3>
                  </Link>
                </div>
                <div
                  className="coClearSection"
                  onClick={() => handleClearCart()}
                >
                  <ClearIcon fontSize="small" className="coClearIcon" />
                  <h3 className="coClear">Clear Cart</h3>
                </div>
              </div>
            </div>
            <div className="coRight col-lg-4 col-md-6">
              <div className="finalCoSection">
                <h2 className="finalSummary">Summary</h2>
                <hr className="finalHr" />
                <h5 className="coSubtotal">
                  Order subtotal: ${cart.cartTotalAmount.toFixed(2)}
                </h5>
                <h5 className="coTax">
                  tax: ${(cart.cartTotalAmount.toFixed(2) / 13).toFixed(2)}
                </h5>
                <h4 className="coFinalTotal">
                  Total: <br /> $
                  {(
                    Number(cart.cartTotalAmount.toFixed(2)) +
                    Number((cart.cartTotalAmount.toFixed(2) / 13).toFixed(2))
                  ).toFixed(2)}
                </h4>
                <PayButton cartItems={cart.cartItems} />
              </div>
            </div>
          </>
        </>
      )}
    </div>
  );
}
