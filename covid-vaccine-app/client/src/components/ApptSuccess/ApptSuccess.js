import "./ApptSuccess.css";

export default function ApptSuccess({ message }) {
  return (
    <>
      <h2>{message}</h2>
      <button>Appointment details</button>
    </>
  );
}
