const express = require("express");
const router = express.Router();

module.exports = (db) => {
  //-----------------------------------------------------------------
  // GET /api/products/
  //-----------------------------------------------------------------

  router.get("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    if (isLoggedIn) {
      db.getAllProductsNotOwned(userID)
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
    } else {
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
    }
  });

  //-----------------------------------------------------------------
  // POST /api/products/
  //-----------------------------------------------------------------

  router.post("/", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    // createProduct;
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
        isApproved: false,
      });
    }
    console.log(req.body);

    const test = {
      category: "test",
      name: "blender",
      price_per_day_cents: 1000,
      description: "some thing",
      deposit_amount_cents: 1000,
      image: "",
    };

    newProduct = {
      userId: userID,
      category: req.body.category,
      name: req.body.name,
      price_per_day_cents: req.body.price_per_day_cents,
      description: req.body.description,
      deposit_amount_cents: req.body.deposit_amount_cents,
      image: req.body.image,
    };

    //  console.log(newProduct);

    db.createProduct(userID, newProduct)
      .then(() => {
        res.json({
          auth: isLoggedIn,
          message: "successfully added new product",
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
  // GET /api/products/reviews/:product-id
  //-----------------------------------------------------------------

  router.get("/reviews/:id", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware

    db.getReviewsByProductId(req.params.id)
      .then((reviews) => {
        res.json({
          auth: isLoggedIn,
          message: "successfully got reviews",
          reviews,
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
  // POST /api/products/:id/edit
  //-----------------------------------------------------------------

  router.post("/:id/edit", (req, res) => {
    const { isLoggedIn, userID } = req; //gets this from middleware
    // createProduct;
    if (!isLoggedIn) {
      return res.status(401).json({
        auth: false,
        message: "not authorized",
        isApproved: false,
      });
    }

    //console.log(req.params.id);
    // console.log(userID);
    if (userID !== Number(req.params.id)) {
      return res.status(401).json({
        auth: true,
        message: "not authorized to edit other users items",
      });
    }

    console.log("here");

    editProduct = {
      userId: userID,
      category: req.body.category,
      name: req.body.name,
      price_per_day_cents: req.body.price_per_day_cents,
      description: req.body.description,
      deposit_amount_cents: req.body.deposit_amount_cents,
      image: req.body.image,
      id: req.params.id,
    };

    //console.log(editProduct);

    db.updateProductInfo(userID, editProduct)
      .then(() => {
        res.json({
          auth: isLoggedIn,
          message: "successfully added new product",
        });
      })
      .catch((err) => {
        res.status(500).json({
          auth: isLoggedIn,
          message: "internal server error",
        });
      });
  });

  // updateProductInfo

  //-----------------------------------------------------------------
  // POST /api/products/catagory/:name
  //-----------------------------------------------------------------

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
  //-----------------------------------------------------------------
  // post /api/products/search
  //-----------------------------------------------------------------

  router.post("/search", (req, res) => {
    const { isLoggedIn } = req; //gets this from middleware

    if (!isLoggedIn) {
      return res.json({
        auth: false,
        message: "not logged in",
        products: null,
      });
    }

    db.getProductsBySearchTerm(req.body.search)
      .then((products) => {
        res.json({
          auth: true,
          message: "successful search",
          products,
        });
      })
      .catch((products) => {
        res.json({
          auth: true,
          message: "not successful in search",
          products: null,
        });
      });
  });

  return router;
};
