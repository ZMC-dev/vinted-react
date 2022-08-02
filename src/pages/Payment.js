import { useLocation } from "react-router-dom";

//  ==> stripe pour frontend
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP");

const Payment = () => {
const location = useLocation();

const { title , price } = location.state;

 
  console.log("C'est le title ==> " + title);
  console.log("C'est le price ==> "+ price);
  console.log("C'est le stripePromise ==> "+ stripePromise);

  return (
    <div>
      <h2>{title}</h2>
      <h2>{price}</h2>
      <Elements stripe={stripePromise} >
      <CheckoutForm  title={title} price={price}/>
      </Elements>
    </div>
  );

}

export default Payment;