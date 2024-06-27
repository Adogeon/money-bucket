import { render, screen } from "@testing-library/react";
import TextField from "./TextField.tsx";

describe("Text Field", () => {
  it("renders the text field labels", () => {
    render(<TextField />);
    const label = screen.getByText(/Label/i);
    expect(label).toBeInTheDocument();
  });
});
