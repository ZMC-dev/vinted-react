import { useState } from "react";
import "./App.css";
import Cookies from "js-cookie";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//  ==> stripe pour frontend
//import { loadStripe } from "@stripe/stripe-js";
//import { Elements } from "@stripe/react-stripe-js";
//import CheckoutForm from "./components/CheckoutForm";

//const stripePromise = loadStripe("pk_test_51HCObyDVswqktOkX6VVcoA7V2sjOJCUB4FBt3EOiAdSz5vWudpWxwcSY8z2feWXBq6lwMgAb5IVZZ1p84ntLq03H00LDVc2RwP");

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {

  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [search, setSearch] = useState("");

  const setUser = (tokenToCheck) => {
    if (tokenToCheck !== null) {
      //Action de connexion
      console.log("Cookie userToken created");
      Cookies.set("userToken", tokenToCheck);
    } else {
      //action de déconnexion
      console.log("Cookie userTOken deleted");
      Cookies.remove("userToken");
    }
    setToken(tokenToCheck);
  };

  return (
    <div className="container">
     
      <Router>
      <Header token={token} setUser={setUser} setSearch={setSearch}/>
        <Routes>
          <Route path="/signup" element={<Signup setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/publish" element={<Publish token={token}/>} />
          <Route path="/offer/:offerId" element={<Offer />} />
          <Route path="/" element={<Home search={search} />} />

          <Route path="/payment" element= {<Payment />}/>
          
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
