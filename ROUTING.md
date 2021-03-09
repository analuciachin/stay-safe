# Client facing routes (Bookmarks for the user / Views)

## User Authentication

/signup
/login
/logout

## Appointments

/appointments
/appointments/:id

## Patient Profile

/patients
/patients/:id
/patients/:id/appointments
/patients/:patientId/appointments/:appointmentId

# Server facing routes (Fetching / Updating information)

## User Authentication

/api/signup (POST)
/api/login (POST)
/api/logout (POST)

## Appointments

/api/appointments (POST) - create a new appt
/api/appointments/:id (PUT) - updates appt #id
/api/appointments/:id (DELETE) - delete appt #id
/api/appointments (GET) - retrieve a list of appts

## Patient Profile

/api/patients (POST) - create a new profile
/api/patients/:id (PUT) - updated profile #id
/api/patients/:id (DELETE) - delete profile #id
/api/patients/:id (GET) - retrieve a profile #id
/api/patients/:id/appointments (GET) - retrieve patient's appt
/api/patients/:id/appointments (POST) - create a new appt for patient #id
/api/patients/:patientId/appointments/:appointmentId (UPDATE) - update an appt for patient #id
/api/patients/:patientId/appointments/:appointmentId (DELETE) - delete an appt for patient #id
