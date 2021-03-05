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

    if (nurse === null) {
      return db
        .query(`SELECT * FROM parents WHERE email = $1;`, [patient_email])
        .then((data) => {
          console.log("data ", data);
          // const patient_password = data.rows[0].patient_password;
          // if (parent_password == password) {
          //   const parent = data.rows;
          //   res.json({ parent });
          // }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });
  return router;
};
