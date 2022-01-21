import React from "react";
import Products from "../../components/Products/Products";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
// THIS IS STRETCH
const LentItems = () => {
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/myproducts")
      .then((res) => {
        setProducts(res.data.myProducts);
        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <>
      <h1>My Loaned out items//still needs correct data see route</h1>
      <Products products={products} />
    </>
  );
};

export default LentItems;
