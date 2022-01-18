import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/products/${id}`).then((res) => {
      console.log(product);
      setProduct(res.data.product);
    });
  }, []);
  const {
    image,
    name,
    category,
    deposit_amount_cents,
    description,
    price_per_day_cents,
  } = product;
  return (
    <>
      <img src={image} height="300" width="300" />
      <h2>{name}</h2>
      <h3>{category}</h3>
      <h3>Price: ${price_per_day_cents / 100}</h3>
      <h3>Deposit Amount: ${deposit_amount_cents / 100}</h3>
      <h3>Description: {description}</h3>
    </>
  );
};

export default ProductDetail;
