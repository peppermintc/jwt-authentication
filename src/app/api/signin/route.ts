/** Route Handler 문서: https://nextjs.org/docs/app/building-your-application/routing/route-handlers */
/** jsonwebtoken 문서: https://github.com/auth0/node-jsonwebtoken */

import { JWT_SECRET_KEY, REGISTERED_USER } from "@constants";
import jwt from "jsonwebtoken";

/** POST /signin */
export async function POST(request: Request) {
  try {
    const requestFormData = await request.formData();

    const username = requestFormData.get("username");
    const password = requestFormData.get("password");

    const isValidUsername = REGISTERED_USER.username === username;
    const isValidPassword = REGISTERED_USER.password === password;
    const isValidUser = isValidUsername && isValidPassword;

    const token = jwt.sign({ username, password }, JWT_SECRET_KEY);

    if (isValidUser) return Response.json({ token });
    else throw new Error("Invalid username or password");
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
