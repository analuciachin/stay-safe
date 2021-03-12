const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT id, username, first_name, last_name FROM nurses`)
      .then((data) => {
        const nurses = data.rows;
        res.json({ nurses });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.get("/:id/appointments", (req, res) => {
    db.query(
      `SELECT *
        FROM appointments WHERE nurse_id = $1`,
      [req.params.id]
    )
      .then((data) => {
        const appointments = data.rows;
        res.json({ appointments });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
