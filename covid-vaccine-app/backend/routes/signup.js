const express = require("express");
const router = express();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const patient_email = req.body.email;
    const password = req.body.password;

    console.log("patient_email ", patient_email);
    console.log("password ", password);
    db.query(`SELECT * FROM patients WHERE email = $1;`, [patient_email])
      .then((data) => {
        //console.log("data ", data.rows);
        const patient = data.rows;
        if (patient.length > 0) {
          res.status(409).send({ message: "Email already registered" });
        } else {
          return db
            .query(
              `INSERT INTO patients (email, password) 
               VALUES ($1, $2)
               RETURNING *;`,
              [patient_email, password]
            )
            .then((data) => {
              const new_patient = {};
              new_patient.id = data.rows[0].id;
              new_patient.email = data.rows[0].email;
              new_patient.type = "patient";
              req.session.user_id = new_patient.id;
              res.json({ new_patient });
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
