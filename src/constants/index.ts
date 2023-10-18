import { User } from "@/types";

/** API Call Base URL */
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://jwt-authentication-zfmz.vercel.app";

/** JWT secret key */
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

/** 회원가입 되어있는 유저 */
const REGISTERED_USER: User = {
  username: "harry0691",
  password: "0000",
};

export { BASE_URL, JWT_SECRET_KEY, REGISTERED_USER };
