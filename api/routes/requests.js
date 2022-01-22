const express = require("express");
const router = express.Router();
const calculateDifferenceInDays = require("../helpers/calculateDifferenceInDays");

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

    Promise.all([
      db.getPendingLendRequestsByUserId(userID),
      db.getBorrowRequestsByUserId(userID),
    ])
      .then((values) => {
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
    let requestsPending;
    let differenceInDaysForLendRequest;
    db.getPendingLendRequestsByUserId(userID)
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
          requestsPending = requests;
          return db.updateProductTransactionStatus(
            req.params.id,
            req.params.action
          );
        }
      })
      .then((transaction) => {
        //add money to user account

        if (req.params.action === "activate") {
          differenceInDaysForLendRequest = calculateDifferenceInDays(
            transaction.start_time,
            transaction.end_time
          );

          const filteredTransaction = requestsPending.filter(
            (requestPending) =>
              requestPending.products_transactions_id === transaction.id
          );

          totalTransactionCost =
            filteredTransaction[0].price_per_day_cents *
            differenceInDaysForLendRequest;
          return db.updateBalance(userID, totalTransactionCost, false);
        }

        return db.getUserById(userID);
      })
      .then((userProfile) => {
        return res.json({
          auth: true,
          message: `updated transaction to be ${req.params.action}`,
          userProfile,
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

    let outGoingRequest;
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
          outGoingRequest = filteredByParam;
          return db.updateProductTransactionStatus(
            req.params.id,
            req.params.action
          );
        }
      })
      .then(() => {
        //add money back to user account -- put back to other user
        if (req.params.action === "cancel") {
          //console.log(outGoingRequest);
          const differenceInDaysForLendRequest = calculateDifferenceInDays(
            outGoingRequest[0].start_time,
            outGoingRequest[0].end_time
          );

          totalTransactionCost =
            outGoingRequest[0].price_per_day_cents *
            differenceInDaysForLendRequest;

          return db.updateBalance(userID, totalTransactionCost, false);
          //console.log(outGoingRequest);
        }
        return;
      })
      .then((newBalance) => {
        return res.json({
          auth: true,
          message: `updated transaction to be ${req.params.action}`,
          newBalance,
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

    let newBalance;
    let oldBalance;

    db.getAllProducts()
      .then((products) => {
        const result = products.filter((product) =>
          itemsId.includes(product.id)
        );
        // console.log("result" + JSON.stringify(result));
        let isOwnIdIncluded = false;
        result.forEach((res) => {
          if (res.user_id === userID) {
            isOwnIdIncluded = true;
          }
          transaction.subtotal += res.price_per_day_cents;
          transaction.deposit_total += res.deposit_amount_cents;
        });

        if (isOwnIdIncluded) {
          return Promise.reject("you cant request to rent out your own items");
        }

        return db.getBalanceByUserID(userID);
      })
      .then((dbBalance) => {
        //reject if the balance is not enough to cover the cost
        const totalTransactionCost =
          transaction.subtotal + transaction.deposit_total;
        oldBalance = dbBalance.cash_balance_cents;
        newBalance = dbBalance.cash_balance_cents - totalTransactionCost;

        if (totalTransactionCost > dbBalance.cash_balance_cents) {
          return Promise.reject("insufficient balance");
        }

        return db.updateBalance(userID, totalTransactionCost, true);
      })
      .then(() => {
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
        return res.json({
          auth: true,
          message: "successfully submited pending request",
          success: true,
          newBalance,
        });
      })
      .catch((err) => {
        return res.json({
          auth: true,
          message: err,
          success: false,
          newBalance: oldBalance,
        });
      });
  });
  return router;
};
