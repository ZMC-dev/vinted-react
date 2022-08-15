import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img//vinted_logo.png";
//import Search from './Search'



const Header = ({ token, setUser, setSearch }) => {
  const navigate = useNavigate();

  //à mettre sur onChange de la search
  const onChange = event => {setSearch(event.target.value)}

  return (
    <header className="header-links">
      {token === null ? (
        <>
          <img className="logo" src={logo} alt="" onClick={()=>{
            navigate("/")
          }}></img> 

{/* Search Bar */}
    <div>
      <input  
      type="text" 
      className="search-bar" 
      placeholder="search.......something"
      onChange={onChange}/>
    </div>  
        
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