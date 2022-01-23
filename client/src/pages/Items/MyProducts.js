import React from "react";
import Products from "../../components/Products/Products";
import { useState, useEffect } from "react";
import { useOutletContext, useNavigate } from "react-router";
import axios from "axios";

import CreateItem from "../../components/Modals/CreateItem";
// STRETCH
const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    axios
      .get("http://localhost:8001/api/users/myproducts")
      .then((res) => {
        // console.log(res.data.products);
        setProducts(res.data.myProducts);
        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);

  const handleSubmit = (itemInfo) => {
    // event.preventDefault();
    axios
      .post("/user", {
        category: itemInfo.category,
        name: itemInfo.name,
        price_per_day_cents: Number(itemInfo.price) * 100,
        description: itemInfo.description,
        deposit_amount_cents: Number(itemInfo.deposit) * 100,
        image: itemInfo.img,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate("/my-products");
  };
  // console.log(appState);
  return (
    <>
      <h1>My Products</h1>

      <CreateItem
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        // handleClose={handleClose}
        open={open}
      ></CreateItem>
      <Products products={products} isMyProducts={true} />
    </>
  );
};

export default MyProducts;
