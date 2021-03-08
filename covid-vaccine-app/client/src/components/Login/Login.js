import { useState } from "react";
import axios from "axios";

export default function Login({ userSelected }) {
  return (
    <>
      {console.log("userSelected ", userSelected)}
      {userSelected === null ? (
        <h3>Please select a type of user to login</h3>
      ) : (
        <form>
          {userSelected === "Patient" ? (
            <div>
              <label htmlFor="name">Email</label>
              <input type="text" name="email" />
            </div>
          ) : (
            <div>
              <label htmlFor="name">Username</label>
              <input type="text" name="email" />
            </div>
          )}

          <label htmlFor="password">Password</label>
          <input type="password" name="password" />
        </form>
      )}
    </>
  );
}
