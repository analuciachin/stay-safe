import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import UserOptions from "./components/UserOptions/UserOptions";
import PatientAppt from "./components/PatientAppt/PatientAppt";
import Signup from "./components/Signup/Signup";
import PatientProfile from "./components/PatientProfile/PatientProfile";

const App = () => {
  const [state, setState] = useState({ user: null, nurses: null });

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
    <Router>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <div>
              <h1>Login</h1>
              <UserOptions getUserLogged={getUserLogged} />
            </div>
          )}
        />

        <Route
          path="/signup"
          render={() => <Signup getUserLogged={getUserLogged} />}
        />

        <Route
          path="/patients"
          render={() => <PatientProfile user={state.user} />}
        />

        <Route
          path="/patients/:id/appointments"
          render={() => <PatientAppt user={state.user} nurses={state.nurses} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
