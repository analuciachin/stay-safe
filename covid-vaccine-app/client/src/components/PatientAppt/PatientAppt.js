import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import "../ApptForm/ApptForm";
import ApptForm from "../ApptForm/ApptForm";

export default function PatientAppt({ user, nurses }) {
  const [appointment, setAppointment] = useState(null);
  // const [bookApptForm, setBookApptForm] = useState({
  //   date: "",
  //   time: "",
  //   nurse_id: "",
  //   is_high_risk: "",
  // });

  // const [isApptTimeAvailable, setIsApptTimeAvailable] = useState(true);
  const [errorBookAppt, setErrorBookAppt] = useState(null);
  const [isApptBooked, setIsApptBooked] = useState(null);

  const getErrorBookAppt = (error) => {
    setErrorBookAppt(error);
  };

  const getIsApptBooked = (isBooked) => {
    setIsApptBooked(isBooked);
  };

  useEffect(() => {
    if (user.type === "patient") {
      axios
        .get(`/api/patients/${user.id}/appointments`)
        .then((response) => {
          console.log("response api ", response.data.appointments);
          const appointment = response.data.appointments;
          setAppointment(appointment);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  // useEffect(() => console.log(isApptTimeAvailable), [isApptTimeAvailable]);

  const getDate = (sqlDate) => {
    const apptDate = sqlDate.split("T")[0];
    return apptDate;
  };

  const getTime = (sqlDate) => {
    const apptTime = sqlDate.substring(
      sqlDate.lastIndexOf("T") + 1,
      sqlDate.lastIndexOf(".")
    );
    return apptTime;
  };

  const convert24hTo12h = (time) => {
    const apptTime = getTime(time);
    const hours = apptTime.substring(0, 2);
    console.log(hours);
    if (hours < 12) {
      return hours + ":00 AM";
    } else {
      return hours - 12 + ":00 PM";
    }
  };

  const deleteAppt = (apptId) => {
    axios
      .delete(`/api/patients/${user.id}/appointments/${apptId}`)
      .then((response) => {
        console.log(response.data);
        const message = response.data.message;
        if (message === "Appointment deleted successfuly!") {
          setAppointment(null);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {appointment && appointment.length > 0 ? (
        <div>
          <h3>Your appointment information</h3>
          <p>
            Date: <span>{getDate(appointment[0].appt_date)}</span>
          </p>
          <p>
            Time: <span>{convert24hTo12h(appointment[0].appt_date)}</span>
          </p>
          <p>
            Nurse:{" "}
            <span>
              {appointment[0].nurse_first_name} {appointment[0].nurse_last_name}
            </span>
          </p>
          <p>
            Is this a high priority appointment?{" "}
            {appointment[0].is_high_priority ? "Yes" : "No"}{" "}
          </p>
          <button>Update</button>
          <button onClick={() => deleteAppt(appointment[0].id)}>Delete</button>
        </div>
      ) : (
        <div>
          <h3>Please book an appointment to get your COVID-19 vaccine.</h3>
          {errorBookAppt && (
            <h3>
              Nurse is not available at this date/time. Please change the
              date/time of your appointment.
            </h3>
          )}

          <ApptForm
            user={user}
            nurses={nurses}
            action="Book an appointment"
            getErrorBookAppt={getErrorBookAppt}
            getIsApptBooked={getIsApptBooked}
            getDate={getDate}
            getTime={getTime}
          />

          {/* <form onSubmit={submitHandler}>
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

            <input type="submit" value="Book an appointment" />
          </form> */}

          {isApptBooked && <h3>Your appointment was booked successfuly!</h3>}
        </div>
      )}
    </>
  );
}
