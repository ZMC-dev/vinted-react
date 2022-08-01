import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

//https://lereacteur-vinted-api.herokuapp.com/offers

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchOffers = async () => {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="offer-section">
      {data.offers.map((offer) => {
        console.log(offer._id);
        return (
          <div className="offer-card">
          <Link to={`/offer/${offer._id}`}>
              <p className="offer-title">{offer.product_name}</p>
              <img className="offer-img"
                //style={{ height: "150px" }}
                src={offer.product_image.secure_url}
                alt=""
              />
          </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
