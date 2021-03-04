const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/:id", (req, res) => {
    db.query(`SELECT * FROM profiles WHERE id = $1;`, [req.params.id])
      .then((data) => {
        const profile = data.rows;
        res.json({ profile });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const patient_id = req.body.patient_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const has_chronic_conditions = req.body.has_chronic_conditions;
    const is_health_care_worker = req.body.is_health_care_worker;
    const is_staff_senior_care = req.body.is_staff_senior_care;

    if (patient_id === "" || first_name === "" || last_name === "") {
      res.status(401).send("There are empty fields in the form.");
      return;
    }

    return db
      .query(
        `
        INSERT INTO profiles (patient_id, first_name, last_name, age, has_chronic_conditions, is_health_care_worker, is_staff_senior_care) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `,
        [
          patient_id,
          first_name,
          last_name,
          age,
          has_chronic_conditions,
          is_health_care_worker,
          is_staff_senior_care,
        ]
      )
      .then((data) => {
        const profile = data.rows;
        res.json({ profile });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.put("/:id", (req, res) => {
    const profile_id = req.params.id;
    const patient_id = req.body.patient_id;
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const age = req.body.age;
    const has_chronic_conditions = req.body.has_chronic_conditions;
    const is_health_care_worker = req.body.is_health_care_worker;
    const is_staff_senior_care = req.body.is_staff_senior_care;

    if (patient_id === "" || first_name === "" || last_name === "") {
      res.status(401).send("There are empty fields in the form.");
      return;
    }

    return db
      .query(
        `
        UPDATE profiles 
        SET 
          patient_id = $1,
          first_name = $2,
          last_name = $3,
          age = $4,
          has_chronic_conditions = $5,
          is_health_care_worker = $6,
          is_staff_senior_care = $7
        WHERE id = $8
        RETURNING *;
      `,
        [
          patient_id,
          first_name,
          last_name,
          age,
          has_chronic_conditions,
          is_health_care_worker,
          is_staff_senior_care,
          profile_id,
        ]
      )
      .then((data) => {
        const profile = data.rows;
        res.json({ profile });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/:id", (req, res) => {
    db.query(`DELETE FROM profiles WHERE id = $1;`, [req.params.id])
      .then((data) => {
        res.status(200).json({
          message: "Profile deleted successfuly!",
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
