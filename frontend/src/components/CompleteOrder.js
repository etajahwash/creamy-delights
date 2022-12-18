import "../styling/completeOrder.css";
import { useDispatch } from "react-redux";
import { clearCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CompleteOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.addEventListener("load", orderComplete);
 
  function orderComplete() {
    dispatch(clearCart())
    setTimeout(() => {
      navigate('/checkoutSuccess')
    }, "5000");
  }

  return (
    <div className="coContainer">
      <div className="coOutline">
        <h2 className="coComplete">
          Completing Order<span className="coFirst">.</span>
          <span className="coSecond">.</span>
          <span className="coThird">.</span>
        </h2>
        <h3 className="coTitle">Please do not leave the page</h3>
        <h6 className="coRedirect">You will be redirected shortly</h6>
      </div>
    </div>
  );
}
