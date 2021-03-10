import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

export default function PatientAppt({ user }) {
  console.log(user);
  // useEffect(() => {
  //   if (user.type === "patient") {
  //     console.log("patient");
  //   } else console.log("not a patient");

  //   //axios.get("/api/patients/:id/appointments");
  // });
  return (
    <>
      <p>PatientAppt component</p>
    </>
  );
}
