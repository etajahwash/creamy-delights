import "../styling/checkoutSuccess.css";
import { useNavigate } from "react-router-dom";
import scobg from "../imgs/profilebg2.jpg";

export default function CheckoutSuccess() {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
    window.location.reload();
  };
  return (
    <div
      className="checkedOutContainer"
      style={{
        backgroundImage: `url(${scobg})`,
        height: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <div className="checkedOutWrapper">
        <div className="checkedOutOverlay">
          <h1>You've checked out successfully!</h1>
          <button onClick={handleReturn}>Return to Home Page</button>
        </div>
      </div>
    </div>
  );
}
