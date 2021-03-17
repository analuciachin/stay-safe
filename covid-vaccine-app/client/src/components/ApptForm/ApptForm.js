import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function ApptForm(props) {
  const {
    user,
    nurses,
    action,
    getErrorBookAppt,
    getIsApptBooked,
    getDate,
    getTime,
  } = props;

  const [bookApptForm, setBookApptForm] = useState({
    date: "",
    time: "",
    nurse_id: "",
    is_high_risk: "",
  });

  const submitHandler = (event) => {
    event.preventDefault();
    isNurseAvailable(bookApptForm.nurse_id, () => {
      bookAppt(user.id);
    });
  };

  const [isApptTimeAvailable, setIsApptTimeAvailable] = useState(true);
  // const [errorBookAppt, setErrorBookAppt] = useState(null);
  // const [isApptBooked, setIsApptBooked] = useState(null);

  const bookAppt = (patientId) => {
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

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="appt-time">Date: </label>
      <input
        type="date"
        value={bookApptForm.date}
        onChange={(event) =>
          setBookApptForm({
            ...bookApptForm,
            date: event.target.value,
          })
        }
      />

      <label htmlFor="appt-time">Time: </label>
      <select
        htmlFor="time"
        value={bookApptForm.time}
        onChange={(event) =>
          setBookApptForm({
            ...bookApptForm,
            time: event.target.value,
          })
        }
      >
        <option value="placeholder">Select an option</option>
        <option value="10:00:00">10:00am</option>
        <option value="11:00:00">11:00am</option>
        <option value="13:00:00">1:00pm</option>
        <option value="14:00:00">2:00pm</option>
        <option value="15:00:00">3:00pm</option>
        <option value="16:00:00">4:00pm</option>
      </select>

      <select
        htmlFor="nurse"
        value={bookApptForm.nurse_id}
        onChange={(event) =>
          setBookApptForm({
            ...bookApptForm,
            nurse_id: event.target.value,
          })
        }
      >
        Nurse:
        <option value="placeholder">Select an option</option>
        {nurses.map((nurse) => (
          <option key={nurse.id} value={nurse.id}>
            {nurse.first_name} {nurse.last_name}
          </option>
        ))}
      </select>
      <label htmlFor="high-risk">High Risk</label>
      <input
        type="text"
        value={bookApptForm.is_high_risk}
        onChange={(event) =>
          setBookApptForm({
            ...bookApptForm,
            is_high_risk: event.target.value,
          })
        }
      />

      <input type="submit" value={action} />
    </form>
  );
}
