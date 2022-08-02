import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img//vinted_logo.png";


const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return (
    <header className="header-links">
      {token === null ? (
        <>
          <img className="logo" src={logo} alt="" onClick={()=>{
            navigate("/")
          }}></img> 
          <input id="search" type="text" className="input" placeholder="search..."/>
        
          <Link to="/signup">S'inscrire</Link>
          <Link to="/login">Se connecter</Link>{" "} 
          <Link id="sellItems" to="/publish"> Vendre ses articles</Link>
        
        </>
      ) : (
        <button id="logout-btn" onClick={() => {
            setUser(null);
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      )}

    </header>
  );
};

export default Header;