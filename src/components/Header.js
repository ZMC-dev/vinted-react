import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img//vinted_logo.png";
//import Search from './Search'



const Header = ({ token, setUser, setSearch, setCheck, check}) => {
  const navigate = useNavigate();

  //changements de la search bar
  const onChange = event => {setSearch(event.target.value)}
    //changements de la check box
  const OnCheck = event => {setCheck(event.target.checked)};

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


    <div>
      <label htmlFor="check-sort">Trier par prix :</label>
      <input  
      type="checkbox" 
      className="checkbox-sort" 
      onChange={OnCheck}/>
    </div>

    </header>
  );
};

export default Header;