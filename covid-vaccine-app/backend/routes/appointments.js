const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM appointments;`)
      .then((data) => {
        const appointments = data.rows;
        res.json({ appointments });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const appt_date = req.body.appt_date;
    const nurse_id = req.body.nurse_id;
    const patient_id = req.body.patient_id;
    const is_high_priority = req.body.is_high_priority;

    if (appt_date === "" || nurse_id === "" || patient_id === "") {
      res.status(401).send("There are empty fields in the form.");
      return;
    }

    return db
      .query(
        `
        INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `,
        [appt_date, nurse_id, patient_id, is_high_priority]
      )
      .then((data) => {
        const appointment = data.rows;
        res.json({ appointment });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put("/:id", (req, res) => {
    const appt_id = req.params.id;
    const appt_date = req.body.appt_date;
    const nurse_id = req.body.nurse_id;
    const patient_id = req.body.patient_id;
    const is_high_priority = req.body.is_high_priority;

    if (appt_date === "" || nurse_id === "" || patient_id === "") {
      res.status(401).send("There are empty fields in the form.");
      return;
    }

    return db
      .query(
        `
        UPDATE appointments 
        SET 
          appt_date = $1,
          nurse_id = $2,
          patient_id = $3,
          is_high_priority = $4
        WHERE id = $5
        RETURNING *;
      `,
        [appt_date, nurse_id, patient_id, is_high_priority, appt_id]
      )
      .then((data) => {
        const appointment = data.rows;
        res.json({ appointment });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/:id", (req, res) => {
    db.query(`DELETE FROM appointments WHERE id = $1;`, [req.params.id])
      .then((data) => {
        res.status(200).json({
          message: "Appointment deleted successfuly!",
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
