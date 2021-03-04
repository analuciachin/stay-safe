INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority) VALUES (NOW(), 1, 1, true);
INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority) VALUES (NOW() + interval '1 hour', 1, 2, false);
INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority) VALUES (NOW() - interval '2 hours 30 minutes', 1, 3, true);
INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority) VALUES (NOW() + interval '48 hours', 2, 4, true);
INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority) VALUES (NOW() + interval '12 hours', 2, 5, false);
INSERT INTO appointments (appt_date, nurse_id, patient_id, is_high_priority) VALUES (NOW() + interval '24 hours', 3, 6, true);

