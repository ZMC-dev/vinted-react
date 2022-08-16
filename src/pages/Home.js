import { useState, useEffect } from "react";
import axios from "axios";

import hero from "../assets/img/hero.jpg";

import { Link } from "react-router-dom";


const Home = ({search, check}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    try {
      const fetchOffers = async () => {

        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offers?title=${search}&sort=${check ? "price-desc":"price-asc"}`);

        setData(response.data);

        setIsLoading(false);
      };
      fetchOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, [search, check]);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div>
        <div className="hero-div">
          <img id="hero-img" src={hero} alt=""></img>
        </div>

      <section className="offer-section">
        {data.offers.map((offer) => {
  
        console.log(offer.owner.account.username)
        console.log(offer.product_details[0].MARQUE)
        console.log(offer.product_details[1].TAILLE)

        return (
          <div className="offer-card">

              
              <div>
                {/* mettre l'avatar ici */}
                <p id="seller-details">{offer.owner.account.username}</p>
              </div>

          <Link to={`/offer/${offer._id}`}>
              <img className="offer-img-card"
                //style={{ height: "150px" }}
                src={offer.product_image.secure_url}
                alt=""/>
          </Link>

           <div className="offer-info-under-card">
             <h3>{offer.product_price} € </h3>
              <p>{offer.product_details[0].MARQUE}</p>
              <p>{offer.product_details[1].TAILLE}</p>
           </div>

          </div>
        );
      })}
      </section>

    </div>
  );
};

export default Home;
