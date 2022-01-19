const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // GET  /api/requests/pending
  //-----------------------------------------------------------------
  router.get("/pending", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
      });
    }
    console.log(
      "#############userid for  GET /api/requests/pending: " + userID
    );
    db.getPendingLendRequestsByUserId(userID)
      .then((requests) => {
        res.json({
          auth: isLoggedIn,
          message: "successfully got all requests for user: " + userID,
          requests,
        });
      })
      .catch((err) => {
        console.log("db error", err);
        res.status(500).json({
          auth: isLoggedIn,
          message: "internal server error",
        });
      });
  });
  return router;
};
