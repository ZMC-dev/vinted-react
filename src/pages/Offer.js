
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

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
      
      <div>{data.product_details.map((item) => {
          //   console.log(Object.keys(item));
          const keys = Object.keys(item);
          return (
            <p>
              {keys[0]} : {item[keys[0]]}
            </p>
          );
        })}
      </div>

    </div>
     


    </div>
  );
};

export default Offer;
