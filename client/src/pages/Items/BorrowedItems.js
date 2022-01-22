import React from "react";
import Products from "../../components/Products/Products";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
// import { makeStyles } from "@mui/styles";
import { ClassNames } from "@emotion/react";

// THIS IS STRETCH

// const useStyle = makeStyles({
//   color: "red",
// });
const BorrowedItems = () => {
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
      <h1>My borrowed out items//still needs correct data see route</h1>
      <Products products={products} isBorrowedItems={true} />
    </>
  );
};

export default BorrowedItems;
