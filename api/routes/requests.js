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
  // POST  /api/requests/incomming/:product-transactions-id/:status
  //-----------------------------------------------------------------

  router.post("/incomming/:id/:action", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
        isApproved: false,
      });
    }
    if (!req.params.id) {
      return res.status(400).json({
        auth: false,
        message: "error: req params products_transactions_id not sent",
        isApproved: false,
      });
    }
    db.getPendingLendRequestsByUserId(userID)
      .then((requests) => {
        //checking to see if the request is pending and is owned by the current user
        const filteredByParam = requests.filter((request) => {
          return request.products_transactions_id == req.params.id;
        });

        console.log(filteredByParam);

        if (filteredByParam.length < 1) {
          return Promise.reject(
            "could not set, is either not pending, or not owned by user"
          );
        } else {
          return db.updateProductTransactionStatus(
            req.params.id,
            req.params.action
          );
        }
      })
      .then(() => {
        //add money to user account // take from other
        return res.json({
          auth: true,
          message: `updated transaction to be ${req.params.action}`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: true,
          message: err,
        });
      });
  });

  //-----------------------------------------------------------------
  // POST  /api/requests/outgoing/:product-transactions-id/:status
  //-----------------------------------------------------------------

  router.post("/outgoing/:id/:action", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
        isApproved: false,
      });
    }
    if (!req.params.id) {
      return res.status(400).json({
        auth: false,
        message: "error: req params products_transactions_id not sent",
        isApproved: false,
      });
    }

    db.getBorrowRequestsByUserId(userID)
      .then((requests) => {
        //checking to see if the request is pending and is owned by the current user
        const filteredByParam = requests.filter((request) => {
          return request.products_transactions_id == req.params.id;
        });

        if (filteredByParam.length < 1) {
          return Promise.reject(
            "could not set, is either not pending, or not owned by user"
          );
        } else {
          return db.updateProductTransactionStatus(
            req.params.id,
            req.params.action
          );
        }
      })
      .then(() => {
        //add money back to user account -- put back to other user
        return res.json({
          auth: true,
          message: `updated transaction to be ${req.params.action}`,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: true,
          message: err,
          isApproved: null,
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

    if (!lineItems || lineItems.length < 1) {
      return res.json({
        auth: true,
        message: "you need line items, cant leave blank",
        success: false,
      });
    }

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
        console.log("result" + JSON.stringify(result));
        let isOwnIdIncluded = false;
        result.forEach((res) => {
          if (res.user_id === userID) {
            isOwnIdIncluded = true;
          }
          transaction.subtotal += res.price_per_day_cents;
          transaction.deposit_total += res.deposit_amount_cents;
        });
        //check balance
        if (isOwnIdIncluded) {
          return Promise.reject("you cant request to rent out your own items");
        }

        return db.createTransaction(transaction);
      })
      .then((res) => {
        txID = res.id;

        const lineItemsWithID = lineItems.map((item) => {
          return { ...item, transaction_id: txID };
        });

        return db.createPendingProductTransaction(lineItemsWithID);
      })
      .then(() => {
        console.log("successfully added to db");
        return res.json({
          auth: true,
          message: "successfully submited pending request",
          success: true,
        });
      })
      .catch((err) => {
        return res.json({
          auth: true,
          message: err,
          success: false,
        });
      });

    // console.log(lineItems);
  });
  return router;
};
