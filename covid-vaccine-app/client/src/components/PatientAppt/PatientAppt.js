import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function PatientAppt({ user }) {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    if (user.type === "patient") {
      axios.get(`/api/patients/${user.id}/appointments`).then((response) => {
        console.log("response api ", response.data.appointments);
        const appointment = response.data.appointments;
        setAppointment(appointment);
      });
    }
  }, []);

  useEffect(() => console.log(appointment), [appointment]);

  return (
    <>
      <p>PatientAppt component</p>
    </>
  );
}
