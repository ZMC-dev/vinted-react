import { useLocation } from "react-router-dom";

//  ==> stripe pour frontend
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP");

const Payment = ({token}) => {
const location = useLocation();

const { title , price } = location.state;

  return (

    <div>
      <h3>{title}</h3>
      <h3>{price}</h3>
      <Elements stripe={stripePromise} >
      <CheckoutForm  title={title} price={price}/>
      </Elements>
    </div>
  );

};

export default Payment;