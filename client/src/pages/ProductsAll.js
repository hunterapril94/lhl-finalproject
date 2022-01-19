import React from "react";
import Products from "../components/Products";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import { appBarClasses } from "@mui/material";

const ProductsAll = () => {
  const [products, setProducts] = useState([]);
  const [auth, setAuth] = useOutletContext();

  console.log("current auth status:" + auth);

  useEffect(() => {
    Promise.all([axios.get("http://localhost:8001/api/products")])
      .then((all) => {
        // console.log(res.data.products);
        setProducts(all[0].data.products);
        setAuth(all[0].data.auth);
      })
      .catch((err) => console.log(err.message));
  }, []);
  return <Products products={products} />;
};

export default ProductsAll;
