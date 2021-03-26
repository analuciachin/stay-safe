import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "bootstrap/dist/css/bootstrap.css";
import "./UserOptions.css";

import Login from "../Login/Login";
import vaccine from "../../images/health-doctor-vaccine.svg";

export default function UserOptions({ getUserLogged }) {
  const users = ["Nurse", "Patient"];

  const [userSelected, setUserSelected] = useState(null);

  const getSelectedUser = function (user) {
    setUserSelected(user);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <img src={vaccine} alt="doctor-vaccine" className="vaccine-img" />
          <p className="text-center title mt-5">Stay Safe</p>
        </Col>
        <Col>
          <h1 className="text-center mt-3 mb-5">Login</h1>
          <ul className="text-center mt-3 mb-5">
            {users.map((user) => (
              <li key={user}>
                <button
                  onClick={() => getSelectedUser(user)}
                  className="user-btn"
                >
                  {user}
                </button>
              </li>
            ))}
          </ul>
          <Login userSelected={userSelected} getUserLogged={getUserLogged} />
        </Col>
      </Row>
    </>
  );
}
