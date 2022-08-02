
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";


const Offer = () => {
  const { offerId } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  //   console.log(offerId);

  useEffect(() => {
    const fetchOffer = async () => {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offer/${offerId}`
      );
      //   console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchOffer();
  }, [offerId]);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="item-page">

    <div >
      <img className="item-page-img"src={data.product_image.secure_url} alt="">
      </img>
    </div>

    <div className="item-page-info">
        <p> {data.product_price} € </p>
      
      <div>{data.product_details.map((item , index) => {
          //   console.log(Object.keys(item));
          const keys = Object.keys(item);
          return (
            <p key={index}>
              {keys[0]} : {item[keys[0]]}
            </p>
          );
        })}
        </div>
      {/* Bouton pour le paiment*/}
      
      </div>

      <Link to="/payment" state={{ title: "toto", price: "12" }}>Acheter</Link>

    </div>
  );
};

export default Offer;
