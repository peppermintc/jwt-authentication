"use client";

import { FormEvent } from "react";

const LoginForm = () => {
  const onLoginFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const response = await fetch("http://localhost:3000/api/signin", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { token } = await response.json();
      console.log("Save token", token);
    } else {
      console.error("Login form submit failed");
    }
  };

  return (
    <form onSubmit={onLoginFormSubmit}>
      <input type="text" name="username" />
      <input type="password" name="password" />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
