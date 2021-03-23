import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function PatientProfile({ getUserLogged }) {
  const [profileInfo, setProfileInfo] = useState({
    first_name: "",
    last_name: "",
    age: "",
    has_chronic_conditions: "",
    is_health_care_worker: "",
    is_staff_senior_care: "",
  });

  let history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();
    //signup(signupInfo);
  };

  // const signup = (signupInfo) => {
  //   axios
  //     .post("/api/signup", {
  //       email: signupInfo.email,
  //       password: signupInfo.password,
  //     })
  //     .then(function (response) {
  //       const new_patient = response.data.new_patient;
  //       console.log("new patient ", new_patient);
  //       getUserLogged(new_patient);

  //       history.push(`/patients`);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <h1>Patient Profile Information</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          name="first-name"
          onChange={(event) =>
            setProfileInfo({ ...profileInfo, first_name: event.target.value })
          }
          value={profileInfo.first_name}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          name="last-name"
          onChange={(event) =>
            setProfileInfo({ ...profileInfo, first_name: event.target.value })
          }
          value={profileInfo.last_name}
        />

        <label htmlFor="age">Select your age in the range below.</label>
        <select
          name="age"
          id="age"
          value={profileInfo.age}
          onChange={(event) =>
            setProfileInfo({ ...profileInfo, age: event.target.age })
          }
        >
          <option value="placeholder">Select an option</option>
          <option value="over_80">over 80 years old</option>
          <option value="between60_80">60 - 80 years old</option>
          <option value="between45_60">45 - 60 years old</option>
          <option value="under_45">under 45 years old</option>
        </select>

        <label htmlFor="age">Do you have any chronic conditions?</label>
        <select
          name="has_chronic_conditions"
          id="has_chronic_conditions"
          value={profileInfo.has_chronic_conditions}
          onChange={(event) =>
            setProfileInfo({
              ...profileInfo,
              has_chronic_conditions: event.target.age,
            })
          }
        >
          <option value="placeholder">Select an option</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label htmlFor="age">Are you a health worker professional?</label>
        <select
          name="is_health_care_worker"
          id="is_health_care_worker"
          value={profileInfo.is_health_care_worker}
          onChange={(event) =>
            setProfileInfo({
              ...profileInfo,
              is_health_care_worker: event.target.age,
            })
          }
        >
          <option value="placeholder">Select an option</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <label htmlFor="age">
          Are you a staff member in a senior care home?
        </label>
        <select
          name="is_staff_senior_care"
          id="is_staff_senior_care"
          value={profileInfo.is_staff_senior_care}
          onChange={(event) =>
            setProfileInfo({
              ...profileInfo,
              is_staff_senior_care: event.target.age,
            })
          }
        >
          <option value="placeholder">Select an option</option>
          <option value="1">Yes</option>
          <option value="0">No</option>
        </select>

        <input type="submit" value="Create Profile" />
      </form>
    </>
  );
}
