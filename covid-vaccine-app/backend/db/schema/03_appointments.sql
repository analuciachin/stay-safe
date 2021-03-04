DROP TABLE IF EXISTS appointments CASCADE;

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY NOT NULL,
  appt_date TIMESTAMP,
  nurse_id INTEGER REFERENCES nurses(id) ON DELETE CASCADE,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  is_high_priority BOOLEAN DEFAULT false
);