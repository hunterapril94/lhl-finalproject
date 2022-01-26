const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //   //-----------------------------------------------------------------
  //   // /api/users/auth
  //   //-----------------------------------------------------------------

  //   router.get("/auth", (req, res) => {
  //     const { isLoggedIn } = req; //gets this from middleware

  //     if (!isLoggedIn) {
  //       return res.json({
  //         auth: false,
  //         message: "not logged in",
  //       });
  //     }

  //     return res.json({
  //       auth: isLoggedIn,
  //       message: "user is logged in",
  //     });
  //   });

  //   //-----------------------------------------------------------------
  //   // /api/users/info
  //   //-----------------------------------------------------------------

  router.get("/profile", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.getUserById(userID)
      .then((userProfile) => {
        return res.json({
          auth: true,
          message: "successful in getting user info",
          userProfile,
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
  // GET /api/users/transaction-history
  //-----------------------------------------------------------------

  router.get("/transaction-history", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.getTransactionHistoryByUserID(userID)
      .then((transactionHistory) => {
        return res.json({
          auth: true,
          message: "successfully got my products",
          transactionHistory,
        });
      })
      .catch(() => {
        res.status(500).json({
          auth: true,
          message: "internal server error",
        });
      });
  });

  //-----------------------------------------------------------------
  // GET /api/users/myBorrowedProducts
  //-----------------------------------------------------------------

  router.get("/my-borrowed-products", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.getBorrowedProductsByUserId(userID)
      .then((myBorrowedProducts) => {
        return res.json({
          auth: true,
          message: "successfully got my products",
          myBorrowedProducts,
        });
      })
      .catch(() => {
        res.status(500).json({
          auth: true,
          message: "internal server error",
        });
      });
  });

  //-----------------------------------------------------------------
  // GET /api/users/myproducts
  //-----------------------------------------------------------------

  router.get("/myproducts", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    db.getProductsByUserId(userID)
      .then((myProducts) => {
        return res.json({
          auth: true,
          message: "successfully got my products",
          myProducts,
        });
      })
      .catch(() => {
        res.status(500).json({
          auth: true,
          message: "internal server error",
        });
      });
  });

  //   //-----------------------------------------------------------------
  //   // POST /api/users/login
  //   //-----------------------------------------------------------------

  router.post("/login", (req, res) => {
    const { isLoggedIn } = req; //gets this from middleware

    // user is not logged in

    db.getUserByEmail(req.body.email)
      .then((user) => {
        if (!user) {
          //user does not exist in db as per email

          return res.json({
            auth: false,
            message: "User information is incorrect",
            severity: "error",
            isShown: true,
          });
        }
        if (isLoggedIn) {
          return res.json({
            auth: true,
            message: "already logged in",
            userProfile: user,
            severity: "error",
            isShown: true,
          });
        }
        if (req.body.password !== user.password) {
          //check the user password vs the form password

          return res.json({
            auth: false,
            message: "User information is incorrect",
            severity: "error",
            isShown: true,
          });
        }

        req.session.user_id = user.id;
        //sets the cookie for the client

        // console.log(user);

        res.json({
          auth: true,
          message: "successfully logged in!",
          userProfile: user,
          severity: "success",
          isShown: true,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: false,
          message: "internal server error",
          severity: "error",
          isShown: true,
        });
      });
  });

  //-----------------------------------------------------------------
  // POST /api/users/logout
  //-----------------------------------------------------------------

  router.post("/logout", (req, res) => {
    req.session = null; //deletes user cookies
    res.json({
      auth: false,
      message: "Goodbye!",
      severity: "success",
      isShown: true,
    });
  });

  //-----------------------------------------------------------------
  // /api/users/signup
  //-----------------------------------------------------------------

  router.post("/signup", (req, res) => {
    const user = {
      first_name: req.body.FirstName,
      last_name: req.body.LastName,
      address: req.body.address,
      neighborhood: req.body.neighborhood,
      borrower: false, //not sent by axios
      lender: false, //not sent by axios
      email: req.body.email,
      cash_balance_cents: 0, //not sent along  by axios
      phone: req.body.phone,
      password: req.body.password,
    };

    //makes sure the sign up form is complete

    if (
      !(
        user.first_name &&
        user.last_name &&
        user.email &&
        user.password &&
        user.neighborhood &&
        user.address &&
        user.phone
      )
    ) {
      return res.json({
        auth: false,
        message: "Please fill in all required fields",
        isShown: true,
        severity: "error",
      });
    }

    //second thing is to check if the user is already logged in

    const { isLoggedIn } = req; //gets this from middleware

    if (isLoggedIn) {
      return res.json({
        auth: true,
        message: "already logged in",
      });
    }

    //if they arent logged in we can then go about creating a user

    db.addUser(user)
      .then((result) => {
        if (!result) {
          return res.json({
            auth: false,
            message: "Email already in use",
            isShown: true,
            severity: "error",
          });
        }

        req.session.user_id = result.id; //set the cookie according to the userid returned from the database

        res.json({
          auth: true,
          message: "succesful registration",
          profile: result,
          isShown: true,
          severity: "success",
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: false,
          message: "internal server error",
          isShown: true,
          severity: "error",
        });
      });
  });

  //-----------------------------------------------------------------
  // /api/users/edit
  //-----------------------------------------------------------------

  router.post("/edit", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware'

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
      });
    }

    const userInfo = {
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      address: req.body.address,
      neighborhood: req.body.neighborhood,
      email: req.body.email,
      phone: req.body.phone,
      lender: req.body.lender,
      borrower: req.body.borrower,
    };

    //makes sure the edit form is complete

    if (
      !(
        userInfo.first_name &&
        userInfo.last_name &&
        userInfo.email &&
        userInfo.neighborhood &&
        userInfo.address &&
        userInfo.phone &&
        userInfo.lender &&
        userInfo.borrower
      )
    ) {
      return res.json({
        auth: false,
        message: "Please fill in all required fields",
        severity: "error",
        isShown: true,
      });
    }

    db.updateUserInfo(userID, userInfo)
      .then((result) => {
        if (!result) {
          return res.json({
            auth: true,
            message: "unable to update profile",
            severity: "error",
            isShown: true,
          });
        }
        console.log("success in updating");
        res.json({
          userProfile: result,
          auth: true,
          message: "succesful update of user info",
          severity: "success",
          isShown: true,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: false,
          message: "internal server error",
          severity: "error",
          isShown: true,
        });
      });
  });

  //-----------------------------------------------------------------
  // GET /api/users/balance
  //-----------------------------------------------------------------

  router.get("/balance", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
        balance: null,
      });
    }

    db.getBalanceByUserID(userID)
      .then((balance) => {
        res.json({
          auth: true,
          message: "succesful in getting balance from server",
          balance,
        });
      })
      .catch(() => {
        return res.status(500).json({
          auth: true,
          message: "internal server error",
          balance: null,
        });
      });
  });

  //-----------------------------------------------------------------
  // api/users/my-lent-products
  //-----------------------------------------------------------------

  router.get("/my-lent-products", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
      });
    }

    db.getLentProducstByUserId(userID)
      .then((myLentProducts) => {
        res.json({
          auth: true,
          message: "succesful in getting all my lent products",
          myLentProducts,
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: false,
          message: "internal server error",
        });
      });
  });

  //   //-----------------------------------------------------------------
  //   // /api/users/:id/edit
  //   //-----------------------------------------------------------------

  //   router.post("/edit", (req, res) => {
  //     const user = {
  //       first_name: req.body.FirstName,
  //       last_name: req.body.LastName,
  //       email: req.body.email,
  //       password: req.body.password,
  //     };

  //     //makes sure the edit form is completenpm star

  //     const { isLoggedIn, userID } = req; //gets this from middleware

  //     if (!isLoggedIn) {
  //       return res.json({
  //         auth: false,
  //         message: "not logged in to edit",
  //         formError: null,
  //       });
  //     }

  //     if (!(user.first_name || user.last_name || user.email || user.password)) {
  //       return res.json({
  //         auth: true,
  //         message: "Please fill in all required fields",
  //         formError: true,
  //       });
  //     }

  //     //if the user is logged in add to the database

  //     db.updateUserInfo(userID, user)
  //       .then((result) => {
  //         if (!result) {
  //           return res.json({
  //             auth: true,
  //             message: "not successful in changing user details",
  //             formError: false,
  //           });
  //         }
  //         res.json({
  //           auth: true,
  //           message: "successful in changing user details",
  //           formError: false,
  //         });
  //       })
  //       .catch((err) => {
  //
  //         res.status(500).json({
  //           auth: true,
  //           message: "internal server error",
  //           formError: null,
  //         });
  //       });
  //   });

  return router;
};
