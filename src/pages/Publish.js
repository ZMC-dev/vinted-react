import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router";



const Publish = ({token}) => {
  const [picture, setPicture] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  //functions gestion changements form

  const navigate = useNavigate();

  const handlePictureChange = event => {
    const value = event.target.files[0];
    setPicture(value);
  };

  const handleTitleChange = event => {
    const value = event.target.value;
    setTitle(value);
  };

  const handleDescriptionChange = event => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleBrandChange = event => {
    const value = event.target.value;
    setBrand(value);
  }

  const handleConditionChange = event => {
    const value = event.target.value;
    setCondition(value);
  }

  const handlePriceChange = event => {
    const value = event.target.value;
    setPrice(value);
  }

  const handleCityChange = event => {
    const value = event.target.value;
    setCity(value);
  }

  const handleSizeChange = event => {
    const value = event.target.value;
    setSize(value);
  }

  const handleColorChange = event => {
    const value = event.target.value;
    setColor(value);
  }


  const handlePublishOffer = async (event) => {
    try {
       event.preventDefault();
    
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("condition", condition);
    formData.append("price", price);
    formData.append("city", city);
    formData.append("size", size);
    formData.append("color", color);
    

      const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
      formData,
      {
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    alert(JSON.stringify(response.data));
    
    console.log(response.data);
    if (response.data._id) {
      //Je vais déclencher une redirection vers la page de l'offre que je viens de créer
      navigate(`/offer/${response.data._id}`);
     }

    } catch (err) {
      if (err.response.status === 500) {
        console.error("An error occurred");
      } else {
        console.error(err.response.data.msg);
      }
    }
  };

  return token ? (
    <section className="formSellerContainer">
      <form className="formSeller"
        onSubmit={handlePublishOffer}>
        
        <input
          type="file"
          onChange={
          //console.log(event.target.picture[0]);
          handlePictureChange} />

        <label htmlFor="name">Titre</label>
        <input
          label="Titre"
          placeholder="ex. Chemise neuve"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange} />

        <label htmlFor="name">Description</label>
        <input
          placeholder="ex. Excellent état, très peu portée"
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange} />

        <label htmlFor="Marque">Marque</label> 
        <input
          placeholder="Ex. Zara"
          type="text"
          name="brand"
          value={brand}
          onChange={handleBrandChange} />

        <label htmlFor="État">État</label> 
        <input
          placeholder="Ex. bon état"
          type="text"
          name="condition"
          value={condition}
          onChange={handleConditionChange} />

        <label htmlFor="Prix">Prix</label> 
          <input
          placeholder="Ex. 20 €"
          type="number"
          name="price"
          value={price}
          onChange={handlePriceChange} />

        <label htmlFor="Emplacemen">Emplacement</label> 
          <input
          placeholder="Ex. Paris"
          type="text"
          name="city"
          value={city}
          onChange={handleCityChange} />

        <label htmlFor="Taille">Taille</label> 
          <input
          placeholder="Ex. 40"
          type="number"
          name="size"
          value={size}
          onChange={handleSizeChange} />

          <label htmlFor="Couleur">Couleur</label> 
          <input
          placeholder="Ex. Jaune"
          type="text"
          name="color"
          value={color}
          onChange={handleColorChange} />
        <input className="submitInput" type="submit" value="Ajouter" />
      </form>
    </section>

  ) : (
    <Navigate to="/login" />
   );
};

export default Publish;
