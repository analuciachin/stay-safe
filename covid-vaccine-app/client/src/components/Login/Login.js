import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";

import "./Login.css";

export default function Login({
  userSelected,
  getUserLogged,
  getError,
  clearError,
  error,
}) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    username: "",
    password: "",
  });

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      login(loginInfo);
    }
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

        if (user.type === "patient") {
          history.push(`/patients/${user.id}/appointments`);
        } else {
          history.push(`nurses/${user.id}/appointments`);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.data) {
          getError(error.response.data.message);
        }
      });
  };

  const validateForm = () => {
    if (
      userSelected === "Patient" &&
      (!loginInfo.email || !loginInfo.password)
    ) {
      console.log("invalid patient");
      getError("Email and password cannot be blank");
      return false;
    } else if (
      userSelected === "Nurse" &&
      (!loginInfo.username || !loginInfo.password)
    ) {
      console.log("invalid nurse");
      getError("Username and password cannot be blank");
      return false;
    } else return true;
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
              <label htmlFor="email" className="mt-2 mb-5">
                Email
              </label>
              <input
                type="text"
                name="email"
                className="mt-2 mb-4 login-signup-input"
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
                className="mt-2 mb-4 login-signup-input"
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
            className="mt-2 mb-3 login-signup-input"
            onChange={(event) => {
              setLoginInfo({ ...loginInfo, password: event.target.value });
              clearError();
            }}
            value={loginInfo.password}
          />
          <input type="submit" value="Login" className="mt-5 mb-2" />
        </Form>
      )}
      {userSelected === "Patient" && (
        <div className="text-center signup mt-3 mb-5">
          <Link to={{ pathname: "/signup" }}>Sign up</Link>
        </div>
      )}
      {error && <p className="error text-center mt-5">{error}</p>}
    </>
  );
}
