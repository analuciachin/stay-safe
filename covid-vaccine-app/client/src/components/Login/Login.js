import { useState } from "react";
import axios from "axios";

export default function Login({ userSelected }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    username: "",
    password: "",
  });

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
        console.log("response", response);
      });
  };

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
                onChange={(event) =>
                  setLoginInfo({ ...loginInfo, email: event.target.value })
                }
                value={loginInfo.email}
              />
            </div>
          ) : (
            <div>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                onChange={(event) =>
                  setLoginInfo({ ...loginInfo, username: event.target.value })
                }
                value={loginInfo.username}
              />
            </div>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            onChange={(event) =>
              setLoginInfo({ ...loginInfo, password: event.target.value })
            }
            value={loginInfo.password}
          />
          <input type="submit" value="Login" />
        </form>
      )}
    </>
  );
}
