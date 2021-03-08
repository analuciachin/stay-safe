import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import UserOptions from "./components/UserOptions/UserOptions";

const App = () => {
  return (
    <Router>
      <div>
        <h1>Hello World!</h1>
        <UserOptions />
      </div>
    </Router>
  );
};

export default App;
