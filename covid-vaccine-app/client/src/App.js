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
            render={() => <PatientProfile user={state.user} />}
          />

          <Route
            exact
            path="/patients/:id/appointments"
            render={() => (
              <PatientAppt
                user={state.user}
                nurses={state.nurses}
                isHighRisk={state.isHighRisk}
              />
            )}
          />
          <Route
            path="/patients/:id/appointments/updated"
            render={() => (
              <ApptSuccess
                user={state.user}
                message="Your appointment was updated successfully!"
              />
            )}
          />

          <Route
            path="/patients/:id/appointments/booked"
            render={() => (
              <ApptSuccess
                user={state.user}
                message="Your appointment was booked  successfully!"
              />
            )}
          />
        </Switch>
      </Router>
    </Container>
  );
};

export default App;
