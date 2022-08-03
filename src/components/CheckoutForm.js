import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({title, price}) => {
  
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState("");

  const handleSubmit = async (event) => {
    try {
    event.preventDefault();

    const cardElements = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElements)
    console.log(stripeResponse);
    const stripeToken = stripeResponse.token.id;
    const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
      stripeToken,

      //PRIX ET TITRE DE L'ITEM
      title: title,
      amount: price * 100,
      
    });
    console.log(response.data);
    // Si la réponse du serveur est favorable, la transaction a eu lieu
    if (response.data.status === "succeeded") {
      console.log("Payment succeeded!!");
      setCompleted("Valid payment");
    }
  } catch (error) {
  // Si la réponse du serveur est négative, la transaction n'a pas lieu
    console.error({message : "Payment not valid"})
  }
};
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      <h1>{completed}</h1>
    </div>
  );
};

export default CheckoutForm;