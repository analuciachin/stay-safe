import React from "react";

//import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import UserOptions from "./components/UserOptions/UserOptions";

const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <UserOptions />
    </div>
  );
};

export default App;
