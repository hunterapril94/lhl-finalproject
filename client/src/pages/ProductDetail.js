import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/products/${id}`).then((product) => {
      setProduct(product);
    });
  }, []);
  return (
    <>
      <img src={product.image} height="300" width="300" />
      <h2>{product.name}</h2>
      <h3>{product.category}</h3>
      <h3>Price: ${product.price / 100}</h3>
      <h3>Deposit Amount: ${product.deposit_amount / 100}</h3>
      <h3>Description: {product.description}</h3>
    </>
  );
};

export default ProductDetail;
