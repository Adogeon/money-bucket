import { render, screen, cleanup } from "@testing-library/react";
import LoginForm from "./LoginForm";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

describe("Login Form", () => {
  describe("render test", () => {
    beforeEach(() => {
      render(<LoginForm submitLogin={vi.fn()} />);
    });
    afterEach(cleanup);

    it("should render a username input", () => {
      const usernameInput = screen.getByLabelText(/username/i);
      expect(usernameInput).toBeInTheDocument();
    });
    it("should render a password input", () => {
      const passwordInput = screen.getByLabelText(/password/i);
      expect(passwordInput).toBeInTheDocument();
    });
    it("should render 'Log In' button", () => {
      const loginButton = screen.getByRole("button", { name: /log in/i });
      expect(loginButton).toBeInTheDocument();
    });
  });
  describe("function test", () => {
    it("should run the login function with correct parameter", async () => {
      const user = userEvent.setup();
      const loginFc = vi.fn();

      render(<LoginForm submitLogin={loginFc} />);

      await user.click(screen.getByLabelText(/username/i));
      await user.keyboard("thomas");
      await user.click(screen.getByLabelText(/password/i));
      await user.keyboard("swordfish123");
      await user.click(screen.getByRole("button", { name: /log in/i }));

      expect(loginFc).toHaveBeenCalledTimes(1);
      expect(loginFc).toHaveBeenCalledWith({
        username: "thomas",
        password: "swordfish123",
      });
    });
  });
});
