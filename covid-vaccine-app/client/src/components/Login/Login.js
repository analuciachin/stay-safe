import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

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
        <h3>Please select a type of user to login</h3>
      ) : (
        <form onSubmit={submitHandler}>
          {userSelected === "Patient" ? (
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                onChange={(event) => {
                  setLoginInfo({ ...loginInfo, email: event.target.value });
                  clearError();
                }}
                value={loginInfo.email}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={(event) => {
                  setLoginInfo({ ...loginInfo, username: event.target.value });
                  clearError();
                }}
                value={loginInfo.username}
              />
            </div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) => {
              setLoginInfo({ ...loginInfo, password: event.target.value });
              clearError();
            }}
            value={loginInfo.password}
          />
          <input type="submit" value="Login" />
        </form>
      )}
      {error && <h2>{error}</h2>}
      {userSelected === "Patient" && (
        <Link to={{ pathname: "/signup" }}>Sign up</Link>
      )}
    </>
  );
}
