/** 유저 계정 타입 */
interface User {
  username: string;
  password: string;
}

/** Decoded JWT 토큰 */
interface DecodedToken {
  username: string;
  password: string;
  iat: number;
}

export type { User, DecodedToken };
