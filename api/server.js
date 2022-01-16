require("dotenv").config();
// Web server config
const PORT = process.env.PORT || 8080;
console.log("the script started");
// const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
// const cookieSession = require("cookie-session");
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const dbHelpers = require("./db/db-queries")(db);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/home", (req, res) => {
  console.log("frome inside of the root in server.js");
  dbHelpers.getUserByEmail("test@test.com").then((user) => {
    console.log(user);
    return res.json({
      auth: "isLoggedIn",
      message: user.first_name,
    });
  });
});

// // PG database client/connection setup
// const { Pool } = require("pg");
// const dbParams = require("./lib/db.js");
// const db = new Pool(dbParams);
// db.connect();

// const isUserLoggedIn = require("./routes/helpers/isUserLoggedIn");

// // Load the logger first so all (static) HTTP requests are logged to STDOUT
// // 'dev' = Concise output colored by response status for development use.
// //         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
// app.use(morgan("dev"));
// app.use(
//   cookieSession({
//     name: "user",
//     keys: ["key1", "key2"],
//   })
// );

// // app.set("view engine", "ejs"); dont neecd for SPA
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
