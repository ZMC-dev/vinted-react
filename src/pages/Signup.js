import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({setUser}) => {


    //state variables form
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [newsletter, setNewsletter] = useState(false);

    const navigate = useNavigate();


    const handleEmailChange = event => {
      const value = event.target.value;
      setEmail(value);
    };
  
  const handleNameChange = event => {
      const value = event.target.value;
      setName(value);
    };
    const handlePasswordChange = event => {
      const value = event.target.value;
      setPassword(value);
    };

    const handleNewsletterChange = event => {
    const value = event.target.checked;
    setNewsletter(value);
    }
  
    const handleSubmit = async (event) => {
    console.log("voilà les infos ===> " + email, name, password, newsletter);
     try {
      event.preventDefault();

      const data = {
        username: name ,
        email: email ,
        password: password ,
        newsletter: newsletter
      };


      const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/signup", data);
      console.log("response.data = " + response.data);


      if (response.data) {
        console.log("Your account has been created");
        setUser(response.data.token);
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  };
    return (
      <div className="form-container">
        <form className="form-sign" onSubmit={handleSubmit}>
        <h2>S'inscrire</h2>
            <input
          placeholder="Nom"
          type="text"
          name="email"
          value={email}
          onChange={handleEmailChange}
             />
        
            <input
          placeholder="Email"
          type="text"
          name="name"
          value={name}
          onChange={handleNameChange}
              />
           <input
          placeholder="Mot de passe"
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
              />
            <input
          label="Abbone-toi à la newsletter Vinted"
          type="checkbox"
          name="isNewsletterOk"
          value={newsletter}
          onChange={handleNewsletterChange}
              /> <p>S'inscrire à notre newsletter</p>
            <input className="submitInput" type="submit" value="S'inscrire" />
          </form>
        </div>

    );
  };

export default Signup;