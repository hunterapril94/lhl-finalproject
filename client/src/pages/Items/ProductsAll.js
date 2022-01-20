import React from "react";
import Products from "../../components/Products/Products";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import { appBarClasses } from "@mui/material";

const ProductsAll = () => {
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();

  console.log("current auth status:" + appState.auth);

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/products")
      .then((res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);
  return <Products products={products} />;
};

export default ProductsAll;
