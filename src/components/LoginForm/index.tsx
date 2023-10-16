"use client";

import { BASE_URL } from "@/constants";
import axios from "axios";
import { FormEvent, useState } from "react";

const LoginForm = () => {
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);

  const onLoginFormChange = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");
    const isFormFilled = username && password;

    setIsLoginButtonDisabled(!isFormFilled);
  };

  const onLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await axios({
      method: "POST",
      url: `${BASE_URL}/api/signin`,
      data: formData,
    });

    if (response.statusText === "OK") {
      const { token } = await response.data;
      sessionStorage.setItem("jwt-token", token);
    }
  };

  return (
    <form onChange={onLoginFormChange} onSubmit={onLoginFormSubmit}>
      <label htmlFor="username">Username</label>
      <input id="username" type="text" name="username" />

      <label htmlFor="password">Password</label>
      <input id="password" type="password" name="password" />

      <button
        disabled={isLoginButtonDisabled}
        aria-disabled={isLoginButtonDisabled}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
