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
    // console.log(req.body)
    const lineItems = req.body.products_transactions;

    itemsId = lineItems.map((item) => {
      return item.product_id;
    });

    const transaction = {
      subtotal: null,
      deposit_total: null,
      user_id: userID,
    };

    db.getAllProducts()
      .then((products) => {
        const result = products.filter((product) =>
          itemsId.includes(product.id)
        );
        result.forEach((res) => {
          transaction.subtotal += res.price_per_day_cents;
          transaction.deposit_total += res.deposit_amount_cents;
        });
        console.log("transaction", transaction);
        return db.createTransaction(transaction);
      })
      .then((res) => {
        txID = res.id;
        console.log(lineItems);
        console.log("txid:" + txID);
        const lineItemsWithID = lineItems.map((item) => {
          return { ...item, transaction_id: txID };
        });

        return db.createPendingProductTransaction(lineItemsWithID);
      })
      .then((res) => {
        return res.json({
          auth: true,
          message: "successfully submited pending request",
        });
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("should happen last");

    res.json({ auth: isLoggedIn });
    // console.log(lineItems);
  });
  return router;
};
