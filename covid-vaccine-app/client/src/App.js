import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";

import UserOptions from "./components/UserOptions/UserOptions";
import PatientAppt from "./components/PatientAppt/PatientAppt";
import Signup from "./components/Signup/Signup";
import PatientProfile from "./components/PatientProfile/PatientProfile";

const App = () => {
  const [state, setState] = useState({
    user: null,
    nurses: null,
    isHighRisk: null,
  });

  const getUserLogged = (userLogged) => {
    setState({ ...state, user: userLogged });
  };

  const isPatientHighRisk = (risk) => {
    setState({ ...state, isHighRisk: risk });
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
            render={() => (
              <div>
                <UserOptions getUserLogged={getUserLogged} />
              </div>
            )}
          />

          <Route
            path="/signup"
            render={() => <Signup getUserLogged={getUserLogged} />}
          />

          <Route
            exact
            path="/patients"
            render={() => (
              <PatientProfile
                user={state.user}
                isPatientHighRisk={isPatientHighRisk}
              />
            )}
          />

          <Route
            path="/patients/:id/appointments"
            render={() => (
              <PatientAppt
                user={state.user}
                nurses={state.nurses}
                isHighRisk={state.isHighRisk}
              />
            )}
          />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
