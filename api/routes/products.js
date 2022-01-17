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
          message: "successfully got all pins",
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

  //-----------------------------------------------------------------
  // POST /api/pins/ --  add new pin
  //-----------------------------------------------------------------

  return router;
};
