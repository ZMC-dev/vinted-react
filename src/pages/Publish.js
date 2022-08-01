import { useState } from "react";
import axios from "axios";


function App({setUser, token}) {
  const [picture, setPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const [data, setData] = useState("");
  const [isItemSending, setIsItemSending] = useState(false);

  //functions gestion changements form
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



  const handlePublishItemToSell = async (event) => {
    event.preventDefault();
    setIsItemSending(true);
    
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("condition", condition);
    formData.append("price", price);

    //je viens transmettre mon formData au serveur express
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
      formData,
      {
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);
    setData(response.data);
    setIsItemSending(false);
  };
  return (
    <div className="App">
      <form onSubmit={handlePublishItemToSell}>
        <input
          onChange={(event) => {
            //console.log(event.target.files[0]);
            setPicture(event.target.files[0]);
          }}
          type="file" />

        <input
          label="Titre"
          placeholder="ex. Chemise neuve"
          type="text"
          name="title"
          value={title}
          onChange={handleTitleChange} />

          <input
          label="Description"
          placeholder="ex. Excellent état, très peu portée"
          type="text"
          name="description"
          value={description}
          onChange={handleDescriptionChange} />

          <input
          label="Marque"
          placeholder="Ex. Zara"
          type="text"
          name="brand"
          value={brand}
          onChange={handleBrandChange} />

          <input
          label="État"
          placeholder="Ex. bon état"
          type="text"
          name="condition"
          value={condition}
          onChange={handleConditionChange} />

          <input
          label="Prix"
          placeholder="Ex. 20 €"
          type="text"
          name="price"
          value={price}
          onChange={handlePriceChange} />

<input
          label="Emplacement"
          placeholder="Ex. Paris"
          type="text"
          name="city"
          value={city}
          onChange={handleCityChange} />

<input
          label="Taille"
          placeholder="Ex. Taille L"
          type="text"
          name="size"
          value={size}
          onChange={handleSizeChange} />

<input
          label="Couleur"
          placeholder="Ex. Jaune"
          type="text"
          name="color"
          value={color}
          onChange={handleColorChange} />

        
        <input type="submit" value="Publier votre article" />

        {isItemSending === true ? (
          <h1>Image en cours d'uplaod</h1>
        ) : (
          data && (
            <img src={data.secure_url} style={{ width: "200px" }} alt="" />
          )
        )}
      </form>
    </div>
  );
}

export default App;
