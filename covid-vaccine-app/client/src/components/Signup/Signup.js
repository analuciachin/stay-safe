import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.css";
import vaccine from "../../images/health-doctor-vaccine.svg";
import "./Signup.css";

export default function Signup({ getUserLogged }) {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (validateForm()) {
      signup(signupInfo);
    }
  };

  const signup = (signupInfo) => {
    axios
      .post("/api/signup", {
        email: signupInfo.email,
        password: signupInfo.password,
      })
      .then(function (response) {
        console.log(response.data.new_patient);
        const user = response.data.new_patient;
        getUserLogged(user);

        history.push(`/patients`);
      })
      .catch(function (error) {
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        }
      });
  };

  const validateForm = () => {
    if (!signupInfo.email || !signupInfo.password) {
      setError("Email and password cannot be blank");
      return false;
    } else return true;
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <img src={vaccine} alt="doctor-vaccine" className="vaccine-img" />
          <p className="text-center title mt-5">Stay Safe</p>
        </Col>
        <Col>
          <h1 className="text-center mt-3 mb-5">Sign-up</h1>
          <Form onSubmit={submitHandler} className="text-center">
            <label htmlFor="email" className="mt-2 mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="mt-2 mb-4 login-signup-input"
              onChange={(event) => {
                setSignupInfo({ ...signupInfo, email: event.target.value });
                clearError();
              }}
              value={signupInfo.email}
            />

            <label htmlFor="password" className="mt-2 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-2 mb-4 login-signup-input"
              onChange={(event) => {
                setSignupInfo({ ...signupInfo, password: event.target.value });
                clearError();
              }}
              value={signupInfo.password}
            />
            <input type="submit" value="Sign-up" className="mt-5 mb-2" />
          </Form>
          {error && <p className="error text-center mt-5">{error}</p>}
        </Col>
      </Row>
    </>
  );
}
