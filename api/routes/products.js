const express = require("express");
const router = express.Router();
//const isUserLoggedIn = require("./helpers/isUserLoggedIn");
//const fakeUser = require("../fake-data/user.json");

module.exports = (db) => {
  //-----------------------------------------------------------------
  // GET /api/products/
  //-----------------------------------------------------------------

  router.get("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }
    //if user is logged in proceed with getting all pins from db
    db.getAllProducts()
      .then((products) => {
        res.json({
          auth: true,
          message: "successfully got all products",
          products,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: false,
          message: "internal server error",
        });
      });
  });

  return router;
};
