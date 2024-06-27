import { render, screen } from "@testing-library/react";
import TextField from "./TextField.tsx";

describe("Text Field", () => {
  it("renders the text field labels", () => {
    render(<TextField />);
    const label = screen.getByText(/Label/i);
    expect(label).toBeInTheDocument();
  });

  it("renders the text input field", () => {
    render(<TextField />);
    const textField = screen.getByRole("textbox", { name: /label/i });
    expect(textField).toBeInTheDocument();
  });

  it("should not render error message", () => {
    render(<TextField />);
    const errorMsg = screen.queryByText(/error-text/i);
    expect(errorMsg).not.toBeInTheDocument();
  })
});
