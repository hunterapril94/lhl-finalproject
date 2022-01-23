import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Items from "./components/Items";
// THIS IS STRETCH
const LentItems = () => {
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded, setExpanded] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/my-lent-products")
      .then((res) => {
        // console.log(res.data.myLentProducts);
        setProducts(res.data.myLentProducts);

        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      <main>
        <Typography variant="h2"> Lent Items</Typography>
        <Typography>
          {products.length === 0 && "You have no lent items"}
        </Typography>
        <Items items={products} setProducts={setProducts} lent={true}></Items>
      </main>
    </>
  );
};

export default LentItems;
