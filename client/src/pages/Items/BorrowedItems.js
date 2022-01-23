import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Items from "./components/Items";
// import { makeStyles } from "@mui/styles";

// THIS IS STRETCH

// const useStyle = makeStyles({
//   color: "red",
// });

export default function BorrrowedItems() {
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded, setExpanded] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/my-borrowed-products")
      .then((res) => {
        setProducts(res.data.myBorrowedProducts);

        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <main>
        <Typography variant="h2"> Borrowed Items</Typography>
        <Items items={products} setProducts={setProducts}></Items>
      </main>
    </>
  );
}
