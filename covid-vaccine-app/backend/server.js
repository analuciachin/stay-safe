// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const cookieSession = require("cookie-session");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  "/styles",
  sass({
    src: __dirname + "/styles",
    dest: __dirname + "/public/styles",
    debug: true,
    outputStyle: "expanded",
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: [
      "b6d0e7eb-8c4b-4ae4-8460-fd3a08733dcb",
      "1fb2d767-ffbf-41a6-98dd-86ac2da9392e",
    ],
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own

const appointmentsRoutes = require("./routes/appointments");
const patientsRoutes = require("./routes/patients");
const nursesRoutes = require("./routes/nurses");
const loginRoute = require("./routes/login");
const signupRoute = require("./routes/signup");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/api/appointments", appointmentsRoutes(db));
app.use("/api/patients", patientsRoutes(db));
app.use("/api/nurses", nursesRoutes(db));
app.use("/api/login", loginRoute(db));
app.use("/api/signup", signupRoute(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
