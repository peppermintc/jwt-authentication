## 프로젝트 환경 설정

> [Next.js Environment Variables Docs](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)

<details open>
<summary>프로젝트를 실행하기 전에 root 디렉토리에 .env.local 파일을 만들어 다음 환경변수를 추가해야합니다.</summary>

```
JWT_SECRET_KEY=jwt_secret_key
```

</details>

</br>

## api route handler 추가

> [Next.js Route Handlers Docs](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

<details open>
<summary>POST /signin</summary>

![api-result-post-signin](/src/assets/api-result-post-signin.png)

```typescript
import { JWT_SECRET_KEY, REGISTERED_USER } from "@constants";
import { userTypeGuard } from "@utils";
import jwt from "jsonwebtoken";

/** POST /signin */
export async function POST(request: Request) {
  try {
    const requestBody = await request.json();

    userTypeGuard(requestBody);

    const isValidUsername = REGISTERED_USER.username === requestBody.username;
    const isValidPassword = REGISTERED_USER.password === requestBody.password;
    const isValidUser = isValidUsername && isValidPassword;

    const token = jwt.sign(requestBody, JWT_SECRET_KEY);

    if (isValidUser) return Response.json({ token });
    else throw new Error("Invalid username or password");
  } catch {
    return Response.error();
  }
}
```

</details>

- POST /signup
- POST /signout
- GET /user

</br>

## jsonwebtoken 라이브러리 사용

> [jsonwebtoken github Docs](https://github.com/auth0/node-jsonwebtoken#readme)

<details open>
<summary>jwt.sign()</summary>

- `claim`과 `signature`를 받아 암호화된 JSON Web Token을 string으로 반환 (암호화 알고리즘 디폴트 값은 `HMAC SHA256`, `options`로 변경 가능)
</details>

</br>

## Login form 추가

> [FormData Web API Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

> [Jest Docs](https://jestjs.io/docs/getting-started)

<details open>
<summary>리렌더링 효율을 위해 useState 대신 formData 활용</summary>

```typescript
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
```

</details>

<details open>
<summary>컴포넌트 테스트 코드 작성</summary>

```javascript
// 초기 스펙 작성
describe.skip("LoginForm 컴포넌트", () => {
  test("유효한 유저 정보로 로그인 성공", async () => {});

  test("유효하지 않은 유저 정보로 로그인 실패", async () => {});
});
```

</details>

</br>

## 토큰을 local storage에 보관/제거

- 토큰 브라우저 저장소에 write read delete

---

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
