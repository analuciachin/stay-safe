# Stay Safe Project

Stay Safe is a web application to help people book an appointment to get their Covid-19 vaccine. I came up with the idea after using an application to book an appointment to get a flu shot. The app was good, but I found some flaws and issues and wanted to build an application where I could address those problems. For instance, one of the issues was that after booking an appointment if the user wanted to reschedule it or change the clinic, there was no way to update it in the app. The user would need to call the clinic and ask to have the appointment updated.
Stay Safe was built with 2 types of user in mind: Patient and Nurse. If the user logs in as a patient, he can book, update and delete an appointment. A new patient can sign-up, after signing up, he fills out a profile form to determine if is a high priority patient to get vaccinated. If the user logs in as a nurse, he can see a list of all the patients who booked an appointment with him.

## Application setup

The project uses React for the front-end and NodeJS, Express and PostgreSQL for the backend.

# Front-end

1. run **git clone https://github.com/analuciachin/stay-safe.git** to clone this repository
2. go into the _client_ folder and install all modules listed as dependencies in package.json by running the command **npm install**
3. run the app in the development mode with npm run start A new browser window should automatically open displaying the app. If it does not, navigate to http://localhost:3000/ in your browser.

# Back-end

1. create a database in psql (database: covid_vaccine, username: labber, password: labber)
2. go into the _backend_ folder and install all modules listed as dependencies in package.json by running the command **npm i**
3. Fix to binaries for sass: **npm rebuild node-sass**
4. Reset database: **npm run db:reset**
5. Run the server: npm run local
6. Visit http://localhost:8080/

## Resources and Documentation

[create-react-app] (https://github.com/facebook/create-react-app)
[react-bootstrap] (https://react-bootstrap.github.io/)
[NodeJS] (https://nodejs.org/en/)
[React-Hooks] (https://reactjs.org/docs/hooks-intro.html)
