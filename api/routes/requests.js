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

    // getBorrowRequestsByUserId --- requesting to borrow something
    // getPendingLendRequestsByUserId -- incomming request from someone

    Promise.all([
      db.getPendingLendRequestsByUserId(userID),
      db.getBorrowRequestsByUserId(userID),
    ])
      .then((values) => {
        console.log(values);
        if (!values[0] || !values[1]) {
          res.json({
            auth: true,
            message: "not successfull in getting users requests",
            pendingIncommingLendRequests: null,
            pendingOutgoingBorrowRequests: null,
          });
        }
        res.json({
          auth: true,
          message: "successfully retrieved user by ID",
          pendingIncommingLendRequests: values[0],
          pendingOutgoingBorrowRequests: values[1],
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: true,
          message: "internal server error",
          pendingIncommingLendRequests: null,
          pendingOutgoingBorrowRequests: null,
        });
      });
  });

  // 1. generate transaction  first
  // from the cart
  // {user_id known
  // subtotal + can calculate from all products
  // deposit total + can calculate from from all products
  // db [return the transaction id]

  // products_transactions : [ {transaction_id[from step1], product_id[from cart], start_time (cant be in past), end_time} , ... }}

  //-----------------------------------------------------------------
  // POST  /api/requests/
  //-----------------------------------------------------------------

  router.post("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
      });
    }

    const lineItems = req.body.products_transactions;
    console.log(lineItems);

    const transaction = { subTotal: 100, deposit_total: 1000, user_id: userID };

    db.getAllProducts().then((products) => {
      console.log(products);
    });

    console.log("should happen last");

    res.json({ auth: isLoggedIn });
    // console.log(lineItems);
  });
  return router;
};
