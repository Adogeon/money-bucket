import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import TextField from "./TextField.tsx";

describe("Text Field", () => {
  describe("render test", () => {
    beforeEach(() => {
      render(<TextField name="username" />);
    });
    afterEach(cleanup);
    it("should render the label match the name props", () => {
      const label = screen.getByText(/username/i);
      expect(label).toBeInTheDocument();
    });
    it("should render the input field with type text", () => {
      const input = screen.getByRole("textbox", { name: /username/i });
      expect(input).toBeInTheDocument();
    });
    it("should not render the error message", () => {
      const errorMessage = screen.queryByText(/enter valid/i);
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  it("should render labelText according to props", () => {
    render(<TextField name="username" labelText="Enter username:" />);
    const label = screen.getByText("Enter username:");
    expect(label).toBeInTheDocument();
  });

  it("should display error message in case of error", () => {
    render(<TextField name="username" hasError={true} />);
    const errorMessage = screen.getByText(/please enter valid username/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render the error message according to props", () => {
    render(
      <TextField name="password" hasError={true} errorMsg="rando error msg" />
    );
    const defaultErrorMessage = screen.queryByText(
      /please enter valid password/i
    );
    expect(defaultErrorMessage).not.toBeInTheDocument();
    const propErrorMessage = screen.getByText(/rando error msg/i);
    expect(propErrorMessage).toBeInTheDocument();
  });

  it("should display value as user change", () => {
    render(<TextField name="username" />);
    const inputComp = screen.getByLabelText(/username/i);
    expect(inputComp).not.toHaveValue();

    fireEvent.change(inputComp, { target: { value: "thomas" } });
    expect(inputComp).toHaveValue("thomas");

    fireEvent.change(inputComp, { target: { value: "firemonkey" } });
    expect(inputComp).not.toHaveValue("thomas");
    expect(inputComp).toHaveValue("firemonkey");
  });

  it("should call the callback function with correct parameter as user change", async () => {
    const user = userEvent.setup();
    const cbFunc = vi.fn();

    render(<TextField name="username" updateCb={cbFunc} />);
    const inputComp = screen.getByLabelText(/username/i);
    expect(cbFunc).toHaveBeenCalledTimes(0);
    expect(inputComp).toHaveValue("");

    await user.click(inputComp);
    await user.keyboard("test2");
    await waitFor(() =>
      expect(screen.getByDisplayValue("test2")).toBeInTheDocument()
    );
    expect(cbFunc).toHaveBeenLastCalledWith("test2");
  });
});
