"use client";

import { userInfoAtom } from "@/atoms";
import { BASE_URL } from "@/constants";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";

const LoginForm = () => {
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const setUserInfo = useSetRecoilState(userInfoAtom);

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

    const postSignInResponse = await axios({
      method: "POST",
      url: `${BASE_URL}/api/signin`,
      data: formData,
    });

    if (postSignInResponse.statusText === "OK") {
      const { token } = await postSignInResponse.data;

      sessionStorage.setItem("jwt-token", token);

      const getUserResponse = await axios({
        method: "GET",
        url: `${BASE_URL}/api/user`,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (getUserResponse.statusText === "OK") {
        setUserInfo({ username: getUserResponse.data.username });
      }
    }
  };

  return (
    <>
      <h2>Login Form</h2>

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
    </>
  );
};

export default LoginForm;
