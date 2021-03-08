import { useState } from "react";
import axios from "axios";

export default function Login() {
  return (
    <form>
      <label htmlFor="name">Email</label>
      <input type="text" name="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
    </form>
  );
}
