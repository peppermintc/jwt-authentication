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
