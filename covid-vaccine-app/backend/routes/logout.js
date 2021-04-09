const express = require("express");
const router = express();

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/");
  });

  return router;
};
