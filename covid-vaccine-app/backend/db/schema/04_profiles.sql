DROP TABLE IF EXISTS profiles CASCADE;

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY NOT NULL,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  age VARCHAR(255) NOT NULL,
  has_chronic_conditions BOOLEAN DEFAULT false,
  is_health_care_worker BOOLEAN DEFAULT false,
  is_staff_senior_care BOOLEAN DEFAULT false
);