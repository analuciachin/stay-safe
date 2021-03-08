import { useState } from "react";

import Login from "../Login/Login";

export default function UserOptions() {
  const users = ["Nurse", "Patient"];

  const [userSelected, setUserSelected] = useState(null);

  const getSelectedUser = function (user) {
    setUserSelected(user);
  };

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button onClick={() => getSelectedUser(user)}>{user}</button>
          </li>
        ))}
      </ul>
      <Login userSelected={userSelected} />
    </>
  );
}
