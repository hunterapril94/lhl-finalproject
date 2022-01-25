import React from "react";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import Typography from "@mui/material/Typography";
import Items from "./components/Items";
// THIS IS STRETCH
const LentItems = () => {
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
      <Typography variant="h4" sx={{ mt: 2 }}>
        {" "}
        Lent Items
      </Typography>
      <Typography sx={{ textAlign: "center" }}>
        {products.length === 0 && "You have no lent items"}
      </Typography>
      <main>
        <Items items={products} setProducts={setProducts} lent={true}></Items>
      </main>
    </>
  );
};

export default LentItems;
