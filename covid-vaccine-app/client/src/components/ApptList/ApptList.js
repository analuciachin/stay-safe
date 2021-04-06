import axios from "axios";
import { useState, useEffect } from "react";
//import "./Login.css";

export default function ApptList({ user }) {
  const [appointments, setAppointments] = useState(null);

  const sortByDateTime = (appts) => {
    for (let appt of appts) {
      appt.new_datetime = appt.appt_date.substring(0, 19);
      appt.new_date = new Date(appt.new_datetime);
    }
    appts.sort(function (a, b) {
      console.log("sort");
      return a.new_date - b.new_date;
    });
    console.log(appts);
  };

  useEffect(() => {
    axios
      .get(`/api/nurses/${user.id}/appointments`)
      .then((response) => {
        console.log(response.data.appointments);
        const appts = response.data.appointments;
        setAppointments(appts);
      })
      .then(() => {
        console.log("here");
        sortByDateTime(appointments);
      });
  }, []);

  return (
    <>
      <ul>
        <li>Appts</li>
      </ul>
    </>
  );
}
