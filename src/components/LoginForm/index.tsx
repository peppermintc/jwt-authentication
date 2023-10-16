"use client";

import { FormEvent } from "react";

const LoginForm = () => {
  const onLoginFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") ?? "";
    const password = formData.get("password") ?? "";

    console.log("onLoginFormSubmit", { username, password });
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
