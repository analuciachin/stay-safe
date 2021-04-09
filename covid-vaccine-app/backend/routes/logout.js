const express = require("express");
const router = express();

module.exports = (db) => {
  router.post("/logout", (req, res) => {
    req.session = null;
    res.redirect("/login");
  });
};
