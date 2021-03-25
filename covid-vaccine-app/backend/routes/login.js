const express = require("express");
const router = express();

module.exports = (db) => {
  router.post("/", (req, res) => {
    const nurse_username = req.body.username;
    const patient_email = req.body.email;
    const password = req.body.password;

    console.log("nurse_username ", nurse_username);
    console.log("patient_email ", patient_email);
    console.log("password ", password);
    if (!nurse_username && patient_email) {
      return db
        .query(`SELECT * FROM patients WHERE email = $1;`, [patient_email])
        .then((data) => {
          console.log("data ", data);
          if (data.rows.length === 0) {
            res.status(401).json({ message: "Invalid email" });
          } else {
            const patient_password = data.rows[0].password;
            if (patient_password == password) {
              const user = {};
              user.id = data.rows[0].id;
              user.email = data.rows[0].email;
              user.type = "patient";
              res.json({ user });
            } else {
              res.status(401).send({ message: "Invalid password" });
            }
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
          if (data.rows.length === 0) {
            res.status(401).send({ message: "Invalid username" });
          } else {
            const nurse_password = data.rows[0].password;
            if (nurse_password == password) {
              const user = {};
              user.id = data.rows[0].id;
              user.username = data.rows[0].username;
              user.type = "nurse";
              console.log(user);
              res.json({ user });
            } else {
              res.status(401).send({ message: "Invalid password" });
            }
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });
  return router;
};
