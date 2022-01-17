require("dotenv").config();
// Web server config
const PORT = process.env.PORT || 8001;
// const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
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

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Origin",
    `http://localhost:${process.env.CLIENT_PORT || 3000}`
  ); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//import routes send queies along to them, then add to express

const usersRoutes = require("./routes/users");
app.use("/api/users", usersRoutes(dbQueries));

const productsRoutes = require("./routes/products");
app.use("/api/products", productsRoutes(dbQueries));

//middleware to check if the user is logged in or not
//it passes req.isLoggedin to all routes

app.use((req, res, next) => {
  const userID = req.session.user_id; //get users cookie

  isUserLoggedIn(userID, dbQueries)
    .then((isLoggedIn) => {
      if (!isLoggedIn) {
        //user is already logged in
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

//test route

app.get("/home", (req, res) => {
  console.log("from inside of the root in server.js");
  dbQueries.getUserByEmail("test@test.com").then((user) => {
    console.log(user);
    return res.json({
      auth: "isLoggedIn",
      message: user.first_name,
    });
  });
});

// app.use(
//   "/styles",
//   sassMiddleware({
//     source: __dirname + "/styles",
//     destination: __dirname + "/public/styles",
//     isSass: false, // false => scss, true => sass
//   })
// );

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
