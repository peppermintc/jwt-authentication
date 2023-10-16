import LoginForm from ".";
import { render, fireEvent } from "@testing-library/react";

describe("LoginForm 컴포넌트", () => {
  test("유효한 유저 정보로 로그인 성공시 세션 스토리지에 JWT 토큰 저장", async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);

    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByRole("button");

    fireEvent.change(usernameInput, { target: { value: "harry0691" } });
    fireEvent.change(passwordInput, { target: { value: "0000" } });
    fireEvent.click(submitButton);

    expect(localStorage.getItem("jwt-token")).not.toBeNull();
  });

  test("유효하지 않은 유저 정보로 로그인 실패", async () => {
    const { getByLabelText, getByRole } = render(<LoginForm />);

    const usernameInput = getByLabelText("Username");
    const passwordInput = getByLabelText("Password");
    const submitButton = getByRole("button");

    fireEvent.change(usernameInput, { target: { value: "invalid-username" } });
    fireEvent.change(passwordInput, { target: { value: "0000" } });
    fireEvent.click(submitButton);

    expect(localStorage.getItem("jwt-token")).toBeNull();
  });
});
