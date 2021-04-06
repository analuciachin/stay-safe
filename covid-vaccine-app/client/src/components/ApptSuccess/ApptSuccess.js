//import axios from "axios";
import { useHistory } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./ApptSuccess.css";

export default function ApptSuccess({ user, message }) {
  let history = useHistory();

  const viewAppt = () => {
    history.push(`/patients/${user.id}/appointments`);
  };

  return (
    <>
      <h2 className="mx-5 my-5 success">{message}</h2>
      <button onClick={viewAppt} className="mx-5 my-5">
        Appointment details
      </button>
    </>
  );
}
