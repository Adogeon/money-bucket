import React from "react";
import "@testing-library/react/dont-cleanup-after-each";
import { cleanup, render, screen } from "@testing-library/react";
import Bucket from "./Bucket";

describe("Bucket", () => {
  describe("on mounted", () => {
    beforeAll(() => {
      render(<Bucket spend={30} limit={100} name={"Essential"} />);
    });

    afterAll(() => cleanup());

    it("should display the user set limit", () => {
      expect(screen.getByText("100")).toBeInTheDocument();
    });
    it("should display the user spending ", () => {
      expect(screen.getByText("30")).toBeInTheDocument();
    });
    it("should display the name of the bucket", () => {
      expect(screen.getByText("Essential")).toBeInTheDocument();
    });
  });

  it.todo("should be clickable to allow user to edit limit");
});
