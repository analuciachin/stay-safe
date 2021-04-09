import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";

import UserOptions from "./components/UserOptions/UserOptions";
import PatientAppt from "./components/PatientAppt/PatientAppt";
import Signup from "./components/Signup/Signup";
import PatientProfile from "./components/PatientProfile/PatientProfile";
import ApptSuccess from "./components/ApptSuccess/ApptSuccess";
import ApptList from "./components/ApptList/ApptList";
import Nav from "./components/Nav/Nav";

const App = () => {
  const [state, setState] = useState({
    user: null,
    nurses: null,
    isHighRisk: null,
  });

  const getUserLogged = (userLogged) => {
    setState({ ...state, user: userLogged });
  };

  useEffect(() => {
    axios.get(`/api/nurses`).then((response) => {
      console.log(response.data.nurses);
      const nurses = response.data.nurses;
      setState({ ...state, nurses: nurses });
    });
  }, []);

  useEffect(() => console.log(state), [state]);

  return (
    <Container fluid>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <UserOptions getUserLogged={getUserLogged} />}
          />

          <Route
            path="/signup"
            render={() => (
              <div>
                <Signup getUserLogged={getUserLogged} />
              </div>
            )}
          />

          <Route
            exact
            path="/patients"
            render={() => (
              <div>
                <Nav />
                <PatientProfile user={state.user} />
              </div>
            )}
          />

          <Route
            exact
            path="/patients/:id/appointments"
            render={() => (
              <>
                <Nav />
                <PatientAppt
                  user={state.user}
                  nurses={state.nurses}
                  isHighRisk={state.isHighRisk}
                />
              </>
            )}
          />
          <Route
            path="/patients/:id/appointments/updated"
            render={() => (
              <>
                <Nav />
                <ApptSuccess
                  user={state.user}
                  message="Your appointment was updated successfully!"
                />
              </>
            )}
          />

          <Route
            path="/patients/:id/appointments/booked"
            render={() => (
              <>
                <Nav />
                <ApptSuccess
                  user={state.user}
                  message="Your appointment was booked  successfully!"
                />
              </>
            )}
          />

          <Route
            path="/nurses/:id/appointments"
            render={() => (
              <>
                <Nav />
                <ApptList user={state.user} />
              </>
            )}
          />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
