/** Route Handler 문서: https://nextjs.org/docs/app/building-your-application/routing/route-handlers */
/** jsonwebtoken 문서: https://github.com/auth0/node-jsonwebtoken */

import { JWT_SECRET_KEY } from "@/constants";
import { DecodedToken } from "@/types";
import jwt from "jsonwebtoken";

/** POST /signout */
export async function POST(request: Request) {
  try {
    const authorizationHeader = request.headers.get("authorization");

    if (!authorizationHeader) throw new Error("No authorizzation header");

    const token = authorizationHeader.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET_KEY) as DecodedToken;

    return new Response("Signout", { status: 200 });
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
