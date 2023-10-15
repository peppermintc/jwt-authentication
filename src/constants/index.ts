import { User } from "@types";

/** JWT secret key */
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY ?? "";

/** 회원가입 되어있는 유저 */
const REGISTERED_USER: User = {
  username: "harry0691",
  password: "0000",
};

export { JWT_SECRET_KEY, REGISTERED_USER };
