import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./PatientProfile.css";

export default function PatientProfile({ user, isPatientHighRisk }) {
  const [profileInfo, setProfileInfo] = useState({
    first_name: "",
    last_name: "",
    age: "",
    has_chronic_conditions: "",
    is_health_care_worker: "",
    is_staff_senior_care: "",
  });

  const [patientProfile, setPatientProfile] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(null);

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    if (formValidation()) {
      checkPatientRisk();
      createProfile(profileInfo);
    } else return false;
  };

  const createProfile = (profileInfo) => {
    axios
      .post("/api/patients", {
        patient_id: user[0].id,
        first_name: profileInfo.first_name,
        last_name: profileInfo.last_name,
        age: profileInfo.age,
        has_chronic_conditions: profileInfo.has_chronic_conditions,
        is_health_care_worker: profileInfo.is_health_care_worker,
        is_staff_senior_care: profileInfo.is_health_care_worker,
      })
      .then(function (response) {
        const new_profile = response.data.profile;
        setPatientProfile(new_profile);
        setIsFormFilled(null);
        history.push(`/patients/${user[0].id}/appointments`);
      })
      .catch(function (error) {
        setIsFormFilled(null);
        console.log(error);
      });
  };

  const formValidation = () => {
    if (
      profileInfo.first_name &&
      profileInfo.last_name &&
      profileInfo.age > 0 &&
      profileInfo.age < 5 &&
      (profileInfo.has_chronic_conditions === "true" ||
        profileInfo.has_chronic_conditions === "false") &&
      (profileInfo.is_health_care_worker === "true" ||
        profileInfo.is_health_care_worker === "false") &&
      (profileInfo.is_staff_senior_care === "true" ||
        profileInfo.is_staff_senior_care === "false")
    ) {
      setIsFormFilled(true);
      return true;
    } else {
      setIsFormFilled(false);
      return false;
    }
  };

  const clearError = () => {
    setIsFormFilled(null);
  };

  const checkPatientRisk = () => {
    if (
      profileInfo.age === "1" ||
      profileInfo.has_chronic_conditions === "true" ||
      profileInfo.is_health_care_worker === "true" ||
      profileInfo.is_staff_senior_care === "true"
    ) {
      console.log("risk ", true);
      isPatientHighRisk(true);
    } else {
      console.log("risk ", false);
      isPatientHighRisk(false);
    }
  };

  useEffect(() => console.log(profileInfo), [profileInfo]);

  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {isFormFilled === false && (
            <h2 className="mt-5 mb-3">
              Please fill out all the field in the form.
            </h2>
          )}
          <h1 className="mt-5 mb-5 text-center">Patient Profile Information</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={submitHandler}>
            <label htmlFor="first-name" className="mt-2 mb-2">
              First Name
            </label>
            <input
              type="text"
              name="first-name"
              className="mt-2 mb-4 profile-input"
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  first_name: event.target.value,
                });
                clearError();
              }}
              value={profileInfo.first_name}
            />

            <label htmlFor="last-name" className="mt-2 mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="last-name"
              className="mt-2 mb-4 profile-input"
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  last_name: event.target.value,
                });
                clearError();
              }}
              value={profileInfo.last_name}
            />

            <label htmlFor="age" className="mt-2 mb-4 d-block">
              Select your age in the range
            </label>

            <div
              value={profileInfo.age}
              onChange={(event) => {
                setProfileInfo({ ...profileInfo, age: event.target.value });
                clearError();
              }}
            >
              <ul className="profile-input-radio mt-2 mb-2">
                <li>
                  <input type="radio" value="1" name="age" /> over 80 years old
                </li>
                <li>
                  <input type="radio" value="2" name="age" /> 60 - 80 years old
                </li>
                <li>
                  <input type="radio" value="3" name="age" /> 45 - 60 years old
                </li>
                <li>
                  <input type="radio" value="4" name="age" /> under 45 years old
                </li>
              </ul>
            </div>

            <label htmlFor="chronic-conditions" className="mt-5 mb-2 d-block">
              Do you have any chronic conditions?
            </label>

            <div
              value={profileInfo.has_chronic_conditions}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  has_chronic_conditions: event.target.value,
                });
                clearError();
              }}
            >
              <ul className="profile-input-radio mt-3 mb-2">
                <li>
                  <input type="radio" value="true" name="chronic-conditions" />{" "}
                  Yes
                </li>
                <li>
                  <input type="radio" value="false" name="chronic-conditions" />{" "}
                  No
                </li>
              </ul>
            </div>

            <label htmlFor="health-worker" className="mt-5 mb-2 d-block">
              Are you a health worker professional?
            </label>
            <div
              value={profileInfo.is_health_care_worker}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  is_health_care_worker: event.target.value,
                });
                clearError();
              }}
            >
              <ul className="profile-input-radio mt-3 mb-2">
                <li>
                  <input type="radio" value="true" name="health-care" /> Yes
                </li>
                <li>
                  <input type="radio" value="false" name="health-care" /> No
                </li>
              </ul>
            </div>

            <label htmlFor="staff-senior-care" className="mt-5 mb-2 d-block">
              Are you a staff member in a senior care home?
            </label>
            <div
              value={profileInfo.is_staff_senior_care}
              onChange={(event) => {
                setProfileInfo({
                  ...profileInfo,
                  is_staff_senior_care: event.target.value,
                });
                clearError();
              }}
            >
              <ul className="profile-input-radio mt-3 mb-2">
                <li>
                  <input type="radio" value="true" name="senior-care" /> Yes
                </li>
                <li>
                  <input type="radio" value="false" name="senior-care" /> No
                </li>
              </ul>
            </div>
            <div className="buttonHolder">
              <input type="submit" value="Create Profile" className="mt-5" />
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
}
