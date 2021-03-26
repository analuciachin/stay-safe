import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import "bootstrap/dist/css/bootstrap.css";
import vaccine from "../../images/health-doctor-vaccine.svg";

export default function Signup({ getUserLogged }) {
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    signup(signupInfo);
  };

  const signup = (signupInfo) => {
    axios
      .post("/api/signup", {
        email: signupInfo.email,
        password: signupInfo.password,
      })
      .then(function (response) {
        const new_patient = response.data.new_patient;
        console.log("new patient ", new_patient);
        getUserLogged(new_patient);

        history.push(`/patients`);
      })
      .catch(function (error) {
        console.log(error);
      });
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
              className="mt-2 mb-4"
              onChange={(event) =>
                setSignupInfo({ ...signupInfo, email: event.target.value })
              }
              value={signupInfo.email}
            />

            <label htmlFor="password" className="mt-2 mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="mt-2 mb-4"
              onChange={(event) =>
                setSignupInfo({ ...signupInfo, password: event.target.value })
              }
              value={signupInfo.password}
            />
            <input type="submit" value="Sign-up" className="mt-5 mb-2" />
          </Form>
        </Col>
      </Row>
    </>
  );
}
