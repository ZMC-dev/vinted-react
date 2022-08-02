import { useLocation } from "react-router-dom";

//  ==> stripe pour frontend
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP");

const Payment = () => {
  const location = useLocation();

  const { title } = location.state;
  const { price } = location.state
 
  console.log(title);
  console.log(price);

  return (
    <Elements stripe={stripePromise} title={title} price={price}>
      <CheckoutForm />
    </Elements>
  );

}

export default Payment;