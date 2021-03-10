import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function PatientAppt({ user }) {
  const [appointment, setAppointment] = useState(null);

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
          <button>Update</button>
          <button onClick={() => deleteAppt(appointment[0].id)}>Delete</button>
        </div>
      ) : (
        <div>
          <h3>Please book an appointment to get your COVID-19 vaccine.</h3>
          <button>Book your appointment</button>
        </div>
      )}
    </>
  );
}
