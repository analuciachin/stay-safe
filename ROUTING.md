# Client facing routes (Bookmarks for the user / Views)

## User Authentication

/signup
/login
/logout

## Appointments

/appointments
/appointments/:id

## Patient Profile

/profiles
/profiles/:id

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

/api/profiles (POST) - create a new profile
/api/profiles/:id (PUT) - updated profile #id
/api/profiles/:id (DELETE) - delete profile #id
/api/profiles/:id (GET) - retrieve a profile #id
