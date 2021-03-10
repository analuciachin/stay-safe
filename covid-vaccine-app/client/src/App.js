import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import UserOptions from "./components/UserOptions/UserOptions";
import PatientAppt from "./components/PatientAppt/PatientAppt";

const App = () => {
  const [state, setState] = useState({ user: null });

  const getUserLogged = (userLogged) => {
    setState({ user: userLogged });
  };

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
          path="/patients/:id/appointments"
          render={() => <PatientAppt user={state.user} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
