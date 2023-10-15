/** Route Handler 문서: https://nextjs.org/docs/app/building-your-application/routing/route-handlers */

interface User {
  username: string;
  password: string;
}

/** 회원가입이 되어있는 유저 */
const REGISTERED_USER: User = {
  username: "harry0691",
  password: "0000",
};

/** POST /signin */
export async function POST(request: Request) {
  try {
    const requestBody = await request.json();

    const isValidUsername = REGISTERED_USER.username === requestBody?.username;
    const isValidPassword = REGISTERED_USER.password === requestBody?.password;

    const isValidUser = isValidUsername && isValidPassword;

    if (isValidUser) return Response.json({ token: "token_placeholder" });
    else throw new Error("Invalid username or password");
  } catch {
    return Response.error();
  }
}
