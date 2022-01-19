import React from "react";
import Products from "../components/Products";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductsAll = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    Promise.all([axios.get("http://localhost:8001/api/products")])
      .then((all) => {
        // console.log(res.data.products);
        setProducts(all[0].data.products);
        console.log(all[0].data);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return <Products products={products} />;
};

export default ProductsAll;
