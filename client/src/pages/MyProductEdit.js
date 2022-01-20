import React from "react";
import Products from "../components/Products";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";

const MyProductEdit = () => {
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    Promise.all([axios.get("http://localhost:8001/api/users/myproducts")])
      .then((all) => {
        // console.log(res.data.products);
        console.log("all[0].data.products");
        console.log(all[0].data.myProducts);
        setProducts(all[0].data.myProducts);
        setAppState((prev) => {
          return { ...prev, auth: all[0].data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <h1>My Products</h1>
      <Products products={products} />
    </>
  );
};

export default MyProductEdit;
