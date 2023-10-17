/** 로그인 유저 계정 타입 */
interface User {
  username: string;
  password: string;
}

/** 유저 정보 타입 */
type UserInfo = Pick<User, "username">;

/** Decoded JWT 토큰 */
interface DecodedToken {
  username: string;
  password: string;
  iat: number;
}

export type { User, UserInfo, DecodedToken };
