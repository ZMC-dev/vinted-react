import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({title, price}) => {
  
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    try {
    event.preventDefault();

    const cardElement = elements.getElement(CardElement);

    const stripeResponse = await stripe.createToken(cardElement)

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
      setCompleted(true);
    }
  } catch (error) {
  // Si la réponse du serveur est négative, la transaction n'a pas lieu
    console.error({message : "Payment not succeeded"})
  }
};
  return (
    <div>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit">Valider</button>
        </form>
      ) : (
        <span>Paiement effectué !</span>
      )}
    </div>
  );
};

export default CheckoutForm;