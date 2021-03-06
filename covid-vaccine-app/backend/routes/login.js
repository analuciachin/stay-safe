const express = require("express");
const router = express();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const nurse_username = req.body.username || null;
    const patient_email = req.body.email || null;
    const password = req.body.password;

    // if (email === "" || password === "") {
    //   res.status(401).send("Email or password is empty");
    //   return;
    // }
    console.log("nurse_username ", nurse_username);
    console.log("patient_email ", patient_email);
    if (!nurse_username && patient_email) {
      return db
        .query(`SELECT * FROM patients WHERE email = $1;`, [patient_email])
        .then((data) => {
          console.log("data ", data);
          const patient_password = data.rows[0].password;
          if (patient_password == password) {
            const patient = data.rows;
            res.json({ patient });
          } else {
            res.status(401).send("Invalid password");
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    } else if (nurse_username && !patient_email) {
      return db
        .query(`SELECT * FROM nurses WHERE username = $1;`, [nurse_username])
        .then((data) => {
          console.log("data ", data);
          const nurse_password = data.rows[0].password;
          if (nurse_password == password) {
            const nurse = data.rows;
            res.json({ nurse });
          } else {
            res.status(401).send("Invalid password");
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });
  return router;
};
