import axios from "axios";
import { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h1 className="mt-5">List of appointments</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <ul className="appt-list">
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
