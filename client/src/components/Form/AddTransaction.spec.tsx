import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import AddTransactionForm from "./AddTransaction";

describe("Add Transaction Form", () => {
  describe("render test:", () => {
    beforeEach(() => {
      render(<AddTransactionForm submitNewTransaction={vi.fn()} />);
    });
    afterEach(cleanup);

    it("should render a transaction name input", () => {
      const nameInput = screen.getByLabelText(/transaction-name/i);
      expect(nameInput).toBeInTheDocument();
    });
    it("should render a transaction amount input", () => {
      const amountInput = screen.getByLabelText(/transaction-name/i);
      expect(amountInput).toBeInTheDocument();
    });
    it("should render a transaction date input", () => {
      const dateInput = screen.getByLabelText(/transaction-date/i);
      expect(dateInput).toBeInTheDocument();
    });
    it("should render a bucket select", () => {
      const bucketInput = screen.getByLabelText(/transaction-bucket/i);
      expect(bucketInput).toBeInTheDocument();
    });
    it("should render a transaction note textarea", () => {
      const noteInput = screen.getAllByLabelText(/transaction-note/i);
      expect(noteInput).toBeInTheDocument();
    });
    it("should render an add button", () => {
      const addButton = screen.getByRole("button", {
        name: /add transaction/i,
      });
      expect(addButton).toBeInTheDocument();
    });
  });
});
