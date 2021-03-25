import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

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

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="appt-time">Date: </label>
      <input
        type="date"
        value={bookApptForm.date}
        onChange={(event) => {
          setBookApptForm({
            ...bookApptForm,
            date: event.target.value,
          });
          clearStatus();
        }}
      />

      <label htmlFor="appt-time">Time: </label>
      <select
        htmlFor="time"
        value={bookApptForm.time}
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
      </select>

      <select
        htmlFor="nurse"
        value={bookApptForm.nurse_id}
        onChange={(event) => {
          setBookApptForm({
            ...bookApptForm,
            nurse_id: event.target.value,
          });
          clearStatus();
        }}
      >
        Nurse:
        <option value="placeholder">Select an option</option>
        {nurses.map((nurse) => (
          <option key={nurse.id} value={nurse.id}>
            {nurse.first_name} {nurse.last_name}
          </option>
        ))}
      </select>
      <label htmlFor="high-risk">High Risk: </label>
      <span>{isHighRisk === true ? "Yes" : "No"}</span>

      <input type="submit" value={action} />
    </form>
  );
}
