import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Pages/CheckoutForm";
import "../style.css";
// import "./styles.css";
// import CheckoutForm from "./CheckoutForm";

function Payment() {
  useEffect(() => {
    window.scrollTo(0, 0);
    <></>;
  }, []);
  const stripePromise = loadStripe(
    "pk_test_51O9TGCDVpf7iVXUBkI4r8Zrpy3rpJIWWBXsUH9DhUDPy3L9xMFmSWQmJRBWW0zybEp9qOPwD0TvsegC9BvKWqTZY00c5DPbju1"
  );
  
  return (
    <>
    
      <div className="product" >
        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

    export default Payment;
