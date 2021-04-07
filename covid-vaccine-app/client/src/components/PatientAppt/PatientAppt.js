import { useState, useEffect } from "react";
//import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import ApptForm from "../ApptForm/ApptForm";

import "./PatientAppt.css";
import "bootstrap/dist/css/bootstrap.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import booked from "../../images/appt_booked.svg";

export default function PatientAppt({ user, nurses }) {
  const [appointment, setAppointment] = useState(null);
  const [errorBookAppt, setErrorBookAppt] = useState(null);
  const [isApptBooked, setIsApptBooked] = useState(null);
  const [isApptUpdated, setIsApptUpdated] = useState(null);
  const [isActionUpdate, setIsActionUpdate] = useState(false);

  const getErrorBookAppt = (error) => {
    setErrorBookAppt(error);
  };

  const getIsApptBooked = (isBooked) => {
    setIsApptBooked(isBooked);
  };

  useEffect(() => {
    console.log("user", user);
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
    // console.log(hours);
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

  const getIsActionUpdate = () => {
    setIsActionUpdate(true);
  };

  const getIsApptUpdated = (status) => {
    setIsApptUpdated(status);
  };

  const clearStates = () => {
    setIsApptBooked(null);
    setIsApptUpdated(null);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <div className="img-container">
            <img src={booked} alt="appt-booked" className="appt-img" />
          </div>
          <p className="text-center title">Stay Safe</p>
        </Col>
        <Col>
          {appointment && appointment.length > 0 ? (
            <div>
              <h1 className="mt-5 mb-5 text-center">
                Your appointment information
              </h1>
              <p className="mt-3 mb-3 text-center">
                Date: <span>{getDate(appointment[0].appt_date)}</span>
              </p>
              <p className="mt-3 mb-3 text-center">
                Time: <span>{convert24hTo12h(appointment[0].appt_date)}</span>
              </p>
              <p className="mt-3 mb-3 text-center">
                Nurse:{" "}
                <span>
                  {appointment[0].nurse_first_name}{" "}
                  {appointment[0].nurse_last_name}
                </span>
              </p>
              <p className="mt-3 mb-5 text-center">
                Is this a high priority appointment?{" "}
                {appointment[0].is_high_priority ? "Yes" : "No"}{" "}
              </p>
              <div className="text-center mt-5">
                <button
                  onClick={() => {
                    getIsActionUpdate();
                    clearStates();
                  }}
                  className="mr-5"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    deleteAppt(appointment[0].id);
                    clearStates();
                  }}
                >
                  Delete
                </button>
              </div>
              <div className="mt-5">
                {isActionUpdate && (
                  <ApptForm
                    user={user}
                    nurses={nurses}
                    apptId={appointment[0].id}
                    action="Update"
                    getErrorBookAppt={getErrorBookAppt}
                    getIsApptBooked={getIsApptBooked}
                    getDate={getDate}
                    getTime={getTime}
                    isActionUpdate={isActionUpdate}
                    getIsApptUpdated={getIsApptUpdated}
                    getIsActionUpdate={getIsActionUpdate}
                  />
                )}
                {isApptUpdated && (
                  <h3 className="mt-5 mb-5 success">
                    Your appointment was updated successfully!
                  </h3>
                )}
              </div>
              {errorBookAppt && (
                <h3 className="mt-5 mb-5 error">
                  Nurse is not available at this date/time. Please change the
                  date/time of your appointment.
                </h3>
              )}
            </div>
          ) : (
            <div>
              <h2 className="mt-5 mb-5">
                Please book an appointment to get your COVID-19 vaccine.
              </h2>
              {errorBookAppt && (
                <h3 className="mt-3 mb-3 error">
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
                isActionUpdate={isActionUpdate}
                getIsApptUpdated={getIsApptUpdated}
                getIsActionUpdate={getIsActionUpdate}
              />

              {isApptBooked && (
                <h3 className="mt-5 mb-3 success">
                  Your appointment was booked successfully!
                </h3>
              )}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
}
