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
  const [error, setError] = useState(null);

  const clearError = () => {
    setError(null);
  };

  const getError = (error) => {
    setError(error);
  };

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
                  onClick={() => {
                    getSelectedUser(user);
                    clearError();
                  }}
                  className="user-btn"
                >
                  {user}
                </button>
              </li>
            ))}
          </ul>
          <Login
            userSelected={userSelected}
            getUserLogged={getUserLogged}
            getError={getError}
            clearError={clearError}
            error={error}
          />
        </Col>
      </Row>
    </>
  );
}
