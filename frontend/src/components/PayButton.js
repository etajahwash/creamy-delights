import '../styling/PayButton.css'
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
const backendPayAPI = process.env.REACT_APP_API_URL;


const PayButton = ({ cartItems }) => {
  const user = useSelector((state) => state.auth);
  const [ payText, setPayText ] = useState(false)

  const handleCheckout = () => {
    setPayText(true)
    axios
      .post(`${backendPayAPI}/checkout/create-checkout-session`, {
        cartItems,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error.message));
      console.log(cartItems)
  };

  return (
    <>
      <button className="payButton" onClick={() => handleCheckout()}>
        {payText === false ? 'Pay' : (
            <p className='payP'>Pay <span className="payOne">.</span>
            <span className="payTwo">.</span><span className="payThree">.</span>
            </p>)
        }
      </button>
    </>
  );
};

export default PayButton;
