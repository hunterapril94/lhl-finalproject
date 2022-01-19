require("dotenv").config();
const cors = require("cors");
// Web server config
const PORT = process.env.PORT || 8001;
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const morgan = require("morgan");

//configure cookies

const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "user",
    keys: ["key1", "key2"],
  })
);

//helper function

const isUserLoggedIn = require("./helpers/isUserLoggedIn");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

//go get db queries to send along to routes

const dbQueries = require("./db/db-queries")(db);

//a fix for CORS errors

app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT || 3000}`,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     `http://localhost:${process.env.CLIENT_PORT || 3000}`
//   ); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//middleware to check if the user is logged in or not
//it passes req.isLoggedin to all routes

app.use((req, res, next) => {
  const userID = req.session.user_id; //get users cookie
  console.log(req.session);

  isUserLoggedIn(userID, dbQueries)
    .then((isLoggedIn) => {
      if (!isLoggedIn) {
        req.isLoggedIn = false;
      } else {
        req.isLoggedIn = true;
        req.userID = userID;
      }
      next();
    })
    .catch((err) => {
      console.log("auth error:", err);
      res.status(500).json({
        auth: true,
        message: "internal server error",
      });
    });
});

//import routes send queies along to them, then add to express

const usersRoutes = require("./routes/users");
app.use("/api/users", usersRoutes(dbQueries));

const productsRoutes = require("./routes/products");
app.use("/api/products", productsRoutes(dbQueries));

const requestsRoutes = require("./routes/products");
app.use("/api/requests", requestsRoutes(dbQueries));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT || 8001}`);
});
