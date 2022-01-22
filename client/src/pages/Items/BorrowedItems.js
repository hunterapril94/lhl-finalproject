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

export default function BorrrowedItems() {
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [expanded, setExpanded] = React.useState(false);
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/myproducts")
      .then((res) => {
        //(res.data.myProducts);
        setProducts(res.data.myProducts);

        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);
  return (
    <div>
      {products.map((product) => (
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}></Typography>
            <Typography sx={{ color: "text.secondary" }}>
              {product.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{product.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
// const BorrowedItems = () => {
//   const [products, setProducts] = useState([]);
//   const [appState, setAppState] = useOutletContext();
//   useEffect(() => {
//     axios
//       .get("http://localhost:8001/api/users/myproducts")
//       .then((res) => {
//         setProducts(res.data.myProducts);
//         setAppState((prev) => {
//           return { ...prev, auth: res.data.auth };
//         });
//       })
//       .catch((err) => console.log(err.message));
//   }, []);
//   return (
//     <>
//       <h1>My borrowed out items//still needs correct data see route</h1>
//       <Products products={products} isBorrowedItems={true} />
//     </>
//   );
// };

// export default BorrowedItems;
