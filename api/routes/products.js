const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // GET /api/products/
  //-----------------------------------------------------------------

  router.get("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    // if (!isLoggedIn) {
    //   return res.json({
    //     auth: false,
    //     message: "not logged in",
    //   });
    // }

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
    console.log(req.params.id);
    db.getProducyById(req.params.id)
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
          message: "internal server error",
        });
      });
  });
  return router;
};
