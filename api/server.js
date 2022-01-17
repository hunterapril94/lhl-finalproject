require("dotenv").config();
// Web server config
const PORT = process.env.PORT || 8080;
console.log("the script started");
// const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const cookieSession = require("cookie-session");

app.use(
  cookieSession({
    name: "user",
    keys: ["key1", "key2"],
  })
);

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const dbQueries = require("./db/db-queries")(db);

app.use(express.urlencoded({ extended: true }));

const usersRoutes = require("./routes/users");

app.use("./routes/users.js", usersRoutes(dbQueries));

//a fix for CORS errors

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//middleware to check if the user is logged in or not
//it passes req.isLoggedin to all routes

// app.use((req, res, next) => {
//   const userID = req.session.user_id; //get users cookie

//   isUserLoggedIn(userID, dbHelpers)
//     .then((isLoggedIn) => {
//       if (!isLoggedIn) {
//         //user is already logged in
//         req.isLoggedIn = false;
//       } else {
//         req.isLoggedIn = true;
//         req.userID = userID;
//       }
//       next();
//     })
//     .catch((err) => {
//       console.log("auth error:", err);
//       res.status(500).json({
//         auth: true,
//         message: "internal server error",
//       });
//     });
// });

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

// app.use(express.urlencoded({ extended: true }));

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
