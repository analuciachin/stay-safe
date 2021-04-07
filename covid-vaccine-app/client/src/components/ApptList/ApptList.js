import axios from "axios";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import nurse from "../../images/nurse_doctor.svg";

import "./ApptList.css";

export default function ApptList({ user }) {
  const [appointments, setAppointments] = useState(null);

  const sortByDateTime = (appts) => {
    console.log("appts", appts);
    for (let appt of appts) {
      appt.new_datetime = appt.appt_date.substring(0, 19);
      appt.new_date = new Date(appt.new_datetime);
    }
    appts.sort(function (a, b) {
      console.log("sort");
      return a.new_date - b.new_date;
    });

    return appts;
  };

  useEffect(() => {
    axios
      .get(`/api/nurses/${user.id}/appointments`)
      .then((response) => {
        console.log(response.data.appointments);
        const appts = response.data.appointments;
        console.log(appts);
        return appts;
      })
      .then((appts) => {
        setAppointments(sortByDateTime(appts));
      });
  }, []);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <div className="img-container">
            <img src={nurse} alt="nurse-doctor" className="appt-img" />
          </div>
          <p className="text-center title">Stay Safe</p>
        </Col>
        <Col>
          <h1 className="ml-5 mt-5">List of appointments</h1>
          <ul className="appt-list ml-5">
            {appointments &&
              appointments.map((appt) => (
                <li key={appt.id} className="appt-item">
                  <div>
                    {appt.first_name} {appt.last_name}
                  </div>
                  <div>Date: {appt.appt_date.substring(0, 10)}</div>
                  <div>Time: {appt.appt_date.substring(11, 19)}</div>
                  <div>
                    Is a high priority appointment?{" "}
                    {appt.is_high_priority ? "Yes" : "No"}
                  </div>
                </li>
              ))}
          </ul>
        </Col>
      </Row>
    </>
  );
}
