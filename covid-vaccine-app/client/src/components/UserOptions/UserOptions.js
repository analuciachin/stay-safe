import Login from "../Login/Login";

export default function UserOptions() {
  const users = ["Nurse", "Patient"];

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user}>
            <button>{user}</button>
          </li>
        ))}
      </ul>
      <Login />
    </>
  );
}
