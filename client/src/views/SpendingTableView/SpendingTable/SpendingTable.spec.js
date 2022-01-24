import React from "react";
import { cleanup, render, screen, within } from "@testing-library/react";
import SpendingTable from "./SpendingTable";

describe("Summary Table", () => {
  afterAll(() => cleanup());
  it("should display a summary table of spending history", () => {
    const data = [
      {
        date: "02/12/21",
        summary: "Video games",
        amount: "30",
        bucket: "Media",
      },
      {
        date: "02/15/21",
        summary: "Streaming service",
        amount: "10",
        bucket: "Media",
      },
      {
        date: "02/12/21",
        summary: "Grocery",
        amount: "50",
        bucket: "Essential",
      },
      {
        date: "02/14/21",
        summary: "Socks",
        amount: "40",
        bucket: "Clothing",
      },
    ];

    render(<SpendingTable data={data} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(within(table).getByText("Video games")).toBeInTheDocument();
    expect(within(table).getByText("50")).toBeInTheDocument();
    expect(within(table).getByText("Clothing")).toBeInTheDocument();
    expect(within(table).getAllByText("02/12/21")).toHaveLength(2);
  });
});
