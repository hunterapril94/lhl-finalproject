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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Items from "./components/Items";

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
        console.log("Borrowed producst", res.data.myBorrowedProducts);
        setProducts(res.data.myBorrowedProducts);

        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  console.log(products);
  return (
    <>
      <main>
        <Typography> Borrowed Items</Typography>
        <Items items={products} setProducts={setProducts}></Items>
      </main>
    </>
  );
}
