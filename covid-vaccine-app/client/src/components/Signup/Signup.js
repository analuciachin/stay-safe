import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function Signup({ getUserLogged }) {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    signup(signupInfo);
  };

  const signup = (signupInfo) => {
    axios
      .post("/api/signup", {
        email: signupInfo.email,
        password: signupInfo.password,
      })
      .then(function (response) {
        const new_patient = response.data.new_patient;
        console.log("new patient ", new_patient);
        getUserLogged(new_patient);

        history.push(`/patients`);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Sign-up</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          onChange={(event) =>
            setSignupInfo({ ...signupInfo, email: event.target.value })
          }
          value={signupInfo.email}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          onChange={(event) =>
            setSignupInfo({ ...signupInfo, password: event.target.value })
          }
          value={signupInfo.password}
        />
        <input type="submit" value="Login" />
      </form>
    </>
  );
}
