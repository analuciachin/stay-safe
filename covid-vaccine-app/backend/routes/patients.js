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

  router.get("/:id/appointments", (req, res) => {
    db.query(
      `SELECT appts.id, 
      appts.appt_date, 
      appts.is_high_priority, 
      nurses.first_name as nurse_first_name, 
      nurses.last_name as nurse_last_name
      FROM appointments AS appts
      LEFT JOIN patients ON appts.patient_id = patients.id
      LEFT JOIN nurses ON appts.nurse_id = nurses.id
      WHERE patients.id = $1;`,
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

  // router.post("/:id/appointments", (req, res) => {
  //   const appt_date = req.body.appt_date;
  //   const nurse_id = req.body.nurse_id;
  //   const patient_id = req.params.id;
  //   const is_high_priority = req.body.is_high_priority;

  //   if (appt_date === "" || nurse_id === "" || patient_id === "") {
  //     res.status(401).send("There are empty fields in the form.");
  //     return;
  //   }

  //   return db
  //     .query(
  //       `
  //       INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority)
  //       VALUES ($1, $2, $3, $4)
  //       RETURNING *;
  //     `,
  //       [appt_date, nurse_id, patient_id, is_high_priority]
  //     )
  //     .then((data) => {
  //       const appointment = data.rows;
  //       res.json({ appointment });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: err.message });
  //     });
  // });

  router.post("/:id/appointments", (req, res) => {
    const appt_date = req.body.appt_date;
    const nurse_id = req.body.nurse_id;
    const patient_id = req.params.id;
    const is_high_priority = req.body.is_high_priority;

    if (appt_date === "" || nurse_id === "" || patient_id === "") {
      res.status(401).send("There are empty fields in the form.");
      return;
    }

    db.query(
      `SELECT appts.* 
      FROM appointments AS appts 
      LEFT JOIN patients 
      ON appts.patient_id = patients.id 
      WHERE appts.patient_id = $1
      `,
      [req.params.id]
    )
      .then((data) => {
        //console.log("data ", data);
        if (data.rows.length > 0) {
          res.json({
            success: false,
            message: "user already have an appointment booked",
          });
        } else {
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
              res.json({ success: true, appointment });
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

  router.put("/:patientId/appointments/:appointmentId", (req, res) => {
    const appt_id = req.params.appointmentId;
    const patient_id = req.params.patientId;
    const appt_date = req.body.appt_date;
    const nurse_id = req.body.nurse_id;
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
        // const appointment = data.rows;
        // res.json({ appointment });
        res.status(200).json({
          message: "Appointment updated successfuly!",
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.delete("/:patientId/appointments/:appointmentId", (req, res) => {
    db.query(`DELETE FROM appointments WHERE id = $1;`, [
      req.params.appointmentId,
    ])
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
