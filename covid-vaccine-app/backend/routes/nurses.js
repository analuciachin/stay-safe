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
      `SELECT appointments.*, profiles.first_name, profiles.last_name
        FROM appointments 
        LEFT JOIN patients ON appointments.patient_id = patients.id
        LEFT JOIN profiles ON profiles.patient_id = patients.id
        WHERE nurse_id = $1`,
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
