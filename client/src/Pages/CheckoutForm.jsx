import React,{useState} from "react";
import axios from "axios";
import { ElementsConsumer, CardElement } from "@stripe/react-stripe-js";
import { useCookies } from "react-cookie";
import CardSection from "./CardSection";

// import CardSection from "..";

const CheckoutForm = (props) => {
  const [cookies] = useCookies(['token']);
  const [authToken, setAuthToken] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { stripe, elements } = props;
    if (!stripe || !elements) {
      return;
    }


    const getCookie = (name) => {
      let cookieArray = document.cookie.split('; ');
      for (let cookie of cookieArray) {
        let [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    };
  
  
    const Token = getCookie("accessToken");
    // setAuthToken(Token);
  console.log(authToken);


    const card = elements.getElement(CardElement);
    const result = await stripe.createToken(card);
    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log(result.token);
      const token = cookies.token;

      try {
        const Token = getCookie("accessToken");
        setAuthToken(Token);
        const response = await axios.post(
          "http://localhost:3001/shoppingcart/checkout",{},
          {
            headers: {
              Authorization: ` ${authToken}`
              // Add other headers if needed
            },
        
          }
        );
        const sessionId = response.data.id;

        const { error } = await stripe.redirectToCheckout({
          sessionId: sessionId,
        });

        console.log("Response from backend:", response.data);
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };

  return (
    <div>
      <div className="product-info">
        <h3 className="product-title">Apple MacBook Pro</h3>
        <h4 className="product-price">$999</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <CardSection />
        <button disabled={!props.stripe} className="btn-pay">
          Buy Now
        </button>
      </form>
    </div>
  );
};

const InjectedCheckoutForm = () => {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CheckoutForm stripe={stripe} elements={elements} />
      )}
    </ElementsConsumer>
  );
};

export default InjectedCheckoutForm;