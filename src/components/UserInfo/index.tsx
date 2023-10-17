"use client";

import { userInfoAtom } from "@/atoms";
import { useRecoilValue } from "recoil";

const UserInfo = () => {
  const userInfo = useRecoilValue(userInfoAtom);

  const loginState = userInfo ? "Logged In" : "Not Logged In";
  const username = userInfo ? userInfo.username : "null";

  return (
    <>
      <h2>User Info</h2>
      <p>Login State: {loginState}</p>
      <p>Username: {username}</p>
    </>
  );
};

export default UserInfo;
