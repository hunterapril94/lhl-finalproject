import React from "react";
import Products from "../../components/Products/Products";
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";

import CreateItem from "../../components/Modals/CreateItem";
import { Button, Typography, Box } from "@mui/material";
// STRETCH
const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  //const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/myproducts")
      .then((res) => {
        //console.log(res.data.myProducts);
        setProducts(res.data.myProducts);
        setIsLoading(false);
        setAppState((prev) => {
          return {
            ...prev,
            auth: res.data.auth,
            snackBar: {
              isShown: res.data.isShown,
              severity: res.data.severity,
              message: res.data.message,
            },
          };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = (itemInfo) => {
    const object1 = {
      category: itemInfo.category,
      name: itemInfo.name,
      price_per_day_cents: Number(itemInfo.price) * 100,
      description: itemInfo.description,
      deposit_amount_cents: Number(itemInfo.deposit) * 100,
      image: itemInfo.imageUrl,
    };
    axios
      .post("http://localhost:8001/api/products/", object1)
      .then((res) => {
        // console.log(res);
        setAppState((prev) => {
          return {
            ...prev,
            snackBar: {
              isShown: res.data.isShown,
              severity: res.data.severity,
              message: res.data.message,
            },
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate("/my-products");
  };
  // console.log(appState);
  return (
    <>
      <Typography variant="h4" sx={{ mt: 2 }}>
        My Products
      </Typography>
      <Box sx={{ textAlign: "center" }}>
        <Button
          sx={{ textAlign: "center" }}
          onClick={handleOpen}
          size="large"
          color="primary"
          variant="outlined"
        >
          Create item
          <AddIcon />
        </Button>
        <CreateItem
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          open={open}
        ></CreateItem>
      </Box>
      {isLoading ? <></> : <Products products={products} isMyProducts={true} />}
    </>
  );
};

export default MyProducts;
