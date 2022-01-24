import React from "react";
import Products from "../../components/Products/Products";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import axios from "axios";
import SearchBar from "../Search/SearchBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import Product from "./Product";

//import { appBarClasses } from "@mui/material";

const ProductsAll = () => {
  const [products, setProducts] = useState([]);
  const [appState, setAppState] = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8001/api/products")
      .then((res) => {
        // console.log(res.data.products);
        setProducts(res.data.products);
        setIsLoading(false);
        setAppState((prev) => {
          return { ...prev, auth: res.data.auth };
        });
      })
      .catch((err) => console.log(err.message));
  }, []);
  const handleSearchChange = (e) => {
    // console.log(e.target.value);
    setFilter(e.target.value);
  };

  const getFilteredProducts = () => {
    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.category.toLowerCase().includes(filter.toLowerCase())
      );
    });
  };

  return isLoading ? (
    <div />
  ) : (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          m: 1,
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Search"
          variant="standard"
          sx={{ pb: 2, width: "30ch" }}
          onChange={handleSearchChange}
        />
        <SearchSharpIcon />
      </Box>
      <Products products={getFilteredProducts()} />;
    </>
  );
};

export default ProductsAll;
