"use client";

import axios from "axios";
import { FormEvent } from "react";

const LoginForm = () => {
  const onLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/api/signin",
      data: formData,
    });

    if (response.statusText === "OK") {
      const { token } = await response.data;
      console.log("Save token", token);
    } else {
      console.error("Login form submit failed");
    }
  };

  return (
    <form onSubmit={onLoginFormSubmit}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" name="username" />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" />

      <button>Login</button>
    </form>
  );
};

export default LoginForm;
