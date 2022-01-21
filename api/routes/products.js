const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // GET /api/products/
  //-----------------------------------------------------------------

  router.get("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    db.getAllProducts()
      .then((products) => {
        res.json({
          auth: isLoggedIn,
          message: "successfully got all products",
          products,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: isLoggedIn,
          message: "internal server error",
        });
      });
  });

  //-----------------------------------------------------------------
  // GET /api/products/:id
  //-----------------------------------------------------------------

  router.get("/:id", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    db.getProductById(req.params.id)
      .then((product) => {
        res.json({
          auth: isLoggedIn,
          message: "successfully got product",
          product,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: isLoggedIn,
          message: "hellooooo internal server error",
        });
      });
  });
  //-----------------------------------------------------------------
  // post /api/products/search
  //-----------------------------------------------------------------

  router.post("/search", (req, res) => {
    const { isLoggedIn } = req; //gets this from middleware

    console.log("search param", req.body.search);

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
        products: null,
      });
    }

    db.getProductsBySearchTerm(req.body.search)
      .then((products) => {
        res.json({
          auth: true,
          message: "successful search",
          products,
        });
      })
      .catch((products) => {
        res.json({
          auth: true,
          message: "not successful in search",
          products: null,
        });
      });
  });

  return router;
};

//-----------------------------------------------------------------
// POST /api/products/catagory/:name
//-----------------------------------------------------------------
