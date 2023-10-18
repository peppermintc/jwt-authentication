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

<details>
<summary>GET /user</summary>

![api-result-get-user](/src/assets/api-result-get-user.png)

Request Authorization Header에 토큰이 함께 전달되지 않았다면 401 에러 반환

```typescript
import { JWT_SECRET_KEY } from "@/constants";
import { DecodedToken } from "@/types";
import jwt from "jsonwebtoken";

/** GET /user */
export async function GET(request: Request) {
  try {
    const authorizationHeader = request.headers.get("authorization");

    if (!authorizationHeader) throw new Error("No authorizzation header");

    const token = authorizationHeader.replace("Bearer ", "");
    const { username } = jwt.verify(token, JWT_SECRET_KEY) as DecodedToken;

    return Response.json({ username });
  } catch {
    return new Response("Unauthorized", { status: 401 });
  }
}
```

</details>

<details>
<summary>POST /signout</summary>

```typescript
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
```

</details>

</br>

## jsonwebtoken 라이브러리 사용

> [jsonwebtoken github Docs](https://github.com/auth0/node-jsonwebtoken#readme)

<details>
<summary>jwt.sign()</summary>

- `claim`과 `signature`를 받아 암호화된 JSON Web Token을 string으로 반환 (암호화 알고리즘 디폴트 값은 `HMAC SHA256`, `options`로 변경 가능)
</details>

<details>
<summary>jwt.verify()</summary>

- jwt token을 검증하고 decode하여 `claim`을 반환
</details>

</br>

## Login form 추가

> [FormData Web API Mozilla Docs](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData)

> [Jest Docs](https://jestjs.io/docs/getting-started)

> [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

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
import LoginForm from ".";
import { render, screen, fireEvent } from "@testing-library/react";

describe("LoginForm 컴포넌트", () => {
  test("username & password input이 모두 채워진 경우 login 버튼 활성화", async () => {
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button") as HTMLButtonElement;

    fireEvent.change(usernameInput, { target: { value: "harry0691" } });
    fireEvent.change(passwordInput, { target: { value: "0000" } });

    expect(submitButton.disabled).toBeFalsy();
  });

  test("username & password input이 비었을 경우 login 버튼 비활성화", async () => {
    render(<LoginForm />);

    const usernameInput = screen.getByLabelText("Username");
    const passwordInput = screen.getByLabelText("Password");
    const submitButton = screen.getByRole("button") as HTMLButtonElement;

    fireEvent.change(usernameInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    expect(submitButton.disabled).toBeTruthy();
  });
});

```

</details>

</br>

## 토큰을 session storage에 보관/제거

<details open><summary>
로그인 성공시 토큰을 브라우저 세션 스토리지에 보관
</summary>

![session storage](/src/assets/session-storage-jwt.png)
