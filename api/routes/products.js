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
  return router;
};

//-----------------------------------------------------------------
// POST /api/products/catagory/:name
//-----------------------------------------------------------------
