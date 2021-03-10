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

  return (
    <>
      {appointment && appointment.length > 0 ? (
        <div>
          <h3>Your appointment information</h3>
          <p>
            Date: <span>{getDate(appointment[0].appt_date)}</span>
          </p>
          <p>
            Time: <span>{getTime(appointment[0].appt_date)}</span>
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
        </div>
      ) : (
        <h3>Please book an appointment to get your COVID-19 shoot.</h3>
      )}
    </>
  );
}
