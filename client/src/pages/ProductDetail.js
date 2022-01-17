import { useEffect, useState } from "react";
import axios from "axios";

function ProductDetail(props) {
  const { id } = props.match;
  const [product, setProduct] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:8001/api/products/${id}`).then((product) => {
      setProduct(product);
    });
  }, []);
  console.log("from inside of product details:", product);
  return (
    <>
      <h1>{product.name}</h1>
    </>
  );
}

export default ProductDetail;
