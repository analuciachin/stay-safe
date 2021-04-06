import axios from "axios";
import { useState, useEffect } from "react";
//import "./Login.css";

export default function ApptList({ user }) {
  const [appointments, setAppointments] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/nurses/${user.id}/appointments`)
      .then((response) => console.log(response));
  }, []);

  return (
    <>
      <ul>
        <li>Appts</li>
      </ul>
    </>
  );
}
