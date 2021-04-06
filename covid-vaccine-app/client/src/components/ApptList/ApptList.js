import axios from "axios";
import { useState, useEffect, useRef } from "react";
//import "./Login.css";

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
        //setAppointments(appts);
        console.log(appts);
        return appts;
      })
      .then((appts) => {
        console.log("here", appts);
        const sortedAppts = sortByDateTime(appts);
        setAppointments(sortByDateTime(appts));
      });
  }, []);

  useEffect(() => {
    console.log(appointments);
    //sortByDateTime();
  }, [appointments]);

  return (
    <>
      <ul>
        {appointments &&
          appointments.map((appt) => (
            <li key={appt.id}>
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
    </>
  );
}
