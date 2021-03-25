import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function PatientProfile({ user }) {
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
        console.log(response);
        const new_profile = response.data.profile;
        setPatientProfile(new_profile);
        setIsFormFilled(null);
        history.push(`/patients/${user[0].id}`);
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
      (profileInfo.has_chronic_conditions === "0" ||
        profileInfo.has_chronic_conditions === "1") &&
      (profileInfo.is_health_care_worker === "0" ||
        profileInfo.is_health_care_worker === "1") &&
      (profileInfo.is_staff_senior_care === "0" ||
        profileInfo.is_staff_senior_care === "1")
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

  useEffect(() => console.log(isFormFilled), [isFormFilled]);

  return (
    <>
      {isFormFilled === false && (
        <h2>Please fill out all the field in the form.</h2>
      )}
      <h1>Patient Profile Information</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="first-name">First Name</label>
        <input
          type="text"
          name="first-name"
          onChange={(event) => {
            setProfileInfo({ ...profileInfo, first_name: event.target.value });
            clearError();
          }}
          value={profileInfo.first_name}
        />

        <label htmlFor="last-name">Last Name</label>
        <input
          type="text"
          name="last-name"
          onChange={(event) => {
            setProfileInfo({ ...profileInfo, last_name: event.target.value });
            clearError();
          }}
          value={profileInfo.last_name}
        />

        <label htmlFor="age">Select your age in the range below.</label>
        <select
          name="age"
          value={profileInfo.age}
          onChange={(event) => {
            setProfileInfo({ ...profileInfo, age: event.target.value });
            clearError();
          }}
        >
          <option value="placeholder">Select an option</option>
          <option value="1">over 80 years old</option>
          <option value="2">60 - 80 years old</option>
          <option value="3">45 - 60 years old</option>
          <option value="4">under 45 years old</option>
        </select>

        <label htmlFor="chronic-conditions">
          Do you have any chronic conditions?
        </label>
        <select
          name="has_chronic_conditions"
          value={profileInfo.has_chronic_conditions}
          onChange={(event) => {
            setProfileInfo({
              ...profileInfo,
              has_chronic_conditions: event.target.value,
            });
            clearError();
          }}
        >
          <option value="placeholder">Select an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="health-worker">
          Are you a health worker professional?
        </label>
        <select
          name="is_health_care_worker"
          value={profileInfo.is_health_care_worker}
          onChange={(event) => {
            setProfileInfo({
              ...profileInfo,
              is_health_care_worker: event.target.value,
            });
            clearError();
          }}
        >
          <option value="placeholder">Select an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <label htmlFor="staff-senior-care">
          Are you a staff member in a senior care home?
        </label>
        <select
          name="is_staff_senior_care"
          id="is_staff_senior_care"
          value={profileInfo.is_staff_senior_care}
          onChange={(event) => {
            setProfileInfo({
              ...profileInfo,
              is_staff_senior_care: event.target.value,
            });
            clearError();
          }}
        >
          <option value="placeholder">Select an option</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <input type="submit" value="Create Profile" />
      </form>
    </>
  );
}
