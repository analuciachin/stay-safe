import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";

import "./ApptForm.css";

export default function ApptForm(props) {
  const {
    user,
    nurses,
    apptId,
    action,
    getErrorBookAppt,
    getIsApptBooked,
    getDate,
    getTime,
    isActionUpdate,
    getIsApptUpdated,
    getIsActionUpdate,
    isHighRisk,
  } = props;

  const [bookApptForm, setBookApptForm] = useState({
    date: "",
    time: "",
    nurse_id: "",
    is_high_risk: isHighRisk,
  });

  useEffect(() => console.log(user), [user]);
  const [isApptTimeAvailable, setIsApptTimeAvailable] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();
    if (isActionUpdate) {
      console.log("here");
      isNurseAvailable(bookApptForm.nurse_id, () => {
        updateAppt(apptId);
      });
    } else {
      isNurseAvailable(bookApptForm.nurse_id, () => {
        console.log(user);
        bookAppt(user[0].id);
      });
    }
  };

  const bookAppt = (patientId) => {
    console.log(bookApptForm.nurse_id);
    axios
      .post(`/api/patients/${patientId}/appointments`, {
        appt_date: bookApptForm.date + "T" + bookApptForm.time,
        nurse_id: bookApptForm.nurse_id,
        is_high_priority: bookApptForm.is_high_risk,
      })
      .then((response) => {
        if (response.data.appointment.length > 0) {
          getIsApptBooked(true);
        }
      })
      .catch((error) => console.log(error));
  };

  const isNurseAvailable = (nurseId, callback) => {
    axios
      .get(`/api/nurses/${nurseId}/appointments`)
      .then((response) => {
        console.log("nurseId", nurseId);
        console.log(response);
        getErrorBookAppt(null);
        setIsApptTimeAvailable(true);
        const nurseSchedule = response.data.appointments;
        let isDateTimeAvailable;
        if (nurseSchedule.length > 0) {
          for (let schedule of nurseSchedule) {
            const apptDate = getDate(schedule.appt_date);
            const apptTime = getTime(schedule.appt_date);
            if (
              apptDate === bookApptForm.date &&
              apptTime === bookApptForm.time
            ) {
              console.log("appt time NOT available");
              setIsApptTimeAvailable(false);
              isDateTimeAvailable = false;
              break;
            } else {
              console.log("appt time available");
              isDateTimeAvailable = true;
            }
          }
        } else {
          isDateTimeAvailable = true;
        }
        return isDateTimeAvailable;
      })
      .then((response) => {
        if (response) {
          getErrorBookAppt(false);
          callback();
        } else getErrorBookAppt(true);
      })
      .catch((error) => console.log(error));
  };

  const updateAppt = (apptId) => {
    console.log("updateAppt");
    getIsApptUpdated(false);
    axios
      .put(`/api/patients/${user.id}/appointments/${apptId}`, {
        appt_date: bookApptForm.date + "T" + bookApptForm.time,
        nurse_id: bookApptForm.nurse_id,
        is_high_priority: bookApptForm.is_high_risk,
      })
      .then((response) => {
        if (response.status === 200) {
          getIsApptUpdated(true);
          getIsActionUpdate(false);
        }
      })
      .catch((error) => console.log(error));
  };

  const clearStatus = () => {
    getIsApptUpdated(null);
    getErrorBookAppt(null);
    getIsApptBooked(null);
  };

  useEffect(() => console.log(bookApptForm), [bookApptForm]);

  return (
    <Form onSubmit={submitHandler}>
      <div>
        <label htmlFor="appt-time" className="mr-3 mb-3">
          Date:{" "}
        </label>
        <input
          type="date"
          value={bookApptForm.date}
          className="mb-3"
          onChange={(event) => {
            setBookApptForm({
              ...bookApptForm,
              date: event.target.value,
            });
            clearStatus();
          }}
        />
      </div>

      <div>
        <label htmlFor="appt-time" className="mt-3 mb-2">
          Time:{" "}
        </label>
        <Form.Control
          as="select"
          value={bookApptForm.time}
          className="mb-3"
          onChange={(event) => {
            setBookApptForm({
              ...bookApptForm,
              time: event.target.value,
            });
            clearStatus();
          }}
        >
          <option value="placeholder">Select an option</option>
          <option value="10:00:00">10:00am</option>
          <option value="11:00:00">11:00am</option>
          <option value="13:00:00">1:00pm</option>
          <option value="14:00:00">2:00pm</option>
          <option value="15:00:00">3:00pm</option>
          <option value="16:00:00">4:00pm</option>
        </Form.Control>
      </div>

      <div>
        <label htmlFor="nurse" className="mt-3 mb-2">
          Nurse:{" "}
        </label>
        <Form.Control
          as="select"
          className="mb-3"
          value={bookApptForm.nurse_id}
          onChange={(event) => {
            setBookApptForm({
              ...bookApptForm,
              nurse_id: event.target.value,
            });
            clearStatus();
          }}
        >
          <option value="placeholder">Select an option</option>
          {nurses.map((nurse) => (
            <option key={nurse.id} value={nurse.id}>
              {nurse.first_name} {nurse.last_name}
            </option>
          ))}
        </Form.Control>
        <div>
          <label htmlFor="high-risk" className="mr-3 mt-3 mb-5">
            High Risk:{" "}
          </label>
          <span className="mt-3 mb-5 patient-risk">
            {isHighRisk === true ? "Yes" : "No"}
          </span>
        </div>
      </div>

      <input type="submit" value={action} />
    </Form>
  );
}
