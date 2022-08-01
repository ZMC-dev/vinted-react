import { useState } from "react";
import "./App.css";
import Cookies from "js-cookie";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

function App() {

  const [token, setToken] = useState(Cookies.get("userToken") || null);

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
      <Header token={token} setUser={setUser}/>
        <Routes>
          <Route path="/signup" element={<Signup setUser={setUser}/>} />
          <Route path="/login" element={<Login setUser={setUser}/>} />
          <Route path="/publish" element={<Publish setUser={setUser} token={token}/>} />
          <Route path="/" element={<Home />} />
          <Route path="/offer/:offerId" element={<Offer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
