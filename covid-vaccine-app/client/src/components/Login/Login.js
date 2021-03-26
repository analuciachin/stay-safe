import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";

import "./Login.css";

export default function Login({ userSelected, getUserLogged }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    login(loginInfo);
  };

  const login = (loginInfo) => {
    axios
      .post("/api/login", {
        email: loginInfo.email,
        username: loginInfo.username,
        password: loginInfo.password,
      })
      .then(function (response) {
        const user = response.data.user;
        console.log("user ", user);
        getUserLogged(user);

        history.push(`/patients/${user.id}/appointments`);
      })
      .catch(function (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        }
      });
  };

  const clearError = () => {
    setError(null);
  };

  useEffect(() => console.log(error), [error]);

  return (
    <>
      {console.log("userSelected ", userSelected)}
      {userSelected === null ? (
        <p className="text-center">Please select a type of user to login</p>
      ) : (
        <Form onSubmit={submitHandler} className="text-center">
          {userSelected === "Patient" ? (
            <div>
              <label htmlFor="email" className="mt-2 mb-2">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="mt-2 mb-4"
                onChange={(event) => {
                  setLoginInfo({ ...loginInfo, email: event.target.value });
                  clearError();
                }}
                value={loginInfo.email}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="username" className="mt-2 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                className="mt-2 mb-4"
                onChange={(event) => {
                  setLoginInfo({ ...loginInfo, username: event.target.value });
                  clearError();
                }}
                value={loginInfo.username}
              />
            </div>
          )}

          <label htmlFor="password" className="mt-2 mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="mt-2 mb-3"
            onChange={(event) => {
              setLoginInfo({ ...loginInfo, password: event.target.value });
              clearError();
            }}
            value={loginInfo.password}
          />
          <input type="submit" value="Login" className="mt-5 mb-2" />
        </Form>
      )}
      {error && <h2>{error}</h2>}
      {userSelected === "Patient" && (
        <div className="text-center signup mt-3">
          <Link to={{ pathname: "/signup" }}>Sign up</Link>
        </div>
      )}
    </>
  );
}
