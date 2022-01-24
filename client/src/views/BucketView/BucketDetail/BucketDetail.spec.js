import React from "react";
import {
  render,
  screen,
  waitFor,
  cleanup,
  within,
} from "@testing-library/react";
import BucketDetail from "./BucketDetail";
import * as BucketAPI from "../../../API/Bucket/bucket.api";

const getBucketDetailSpy = jest.spyOn(BucketAPI, "getBucketDetail");

describe("Bucket Detail View", () => {
  describe("on loaded", () => {
    beforeAll(() => {
      getBucketDetailSpy.mockImplementation(() =>
        Promise.resolve({
          id: 3,
          name: "Media",
          desc: "For entertainment need",
          spend: 40,
          limit: 50,
          history: [
            { date: "02/12/21", summary: "Video games", amount: "30" },
            { date: "02/15/21", summary: "Streaming service", amount: "10" },
          ],
        })
      );
    });
    afterAll(() => {
      cleanup();
      getBucketDetailSpy.mockClear();
    });

    it("should display the bucket detail information", async () => {
      render(<BucketDetail bucketId={3} />);
      await waitFor(() => expect(getBucketDetailSpy).toHaveBeenCalled());

      expect(screen.getByText("Media")).toBeInTheDocument();
      expect(
        screen.getByText("Description: For entertainment need")
      ).toBeInTheDocument();
      expect(screen.getByText("Spent: 40")).toBeInTheDocument();
      expect(screen.getByText("Limit: 50")).toBeInTheDocument();

      const historyTable = screen.getByRole("table");
      expect(historyTable).toBeInTheDocument();
      expect(within(historyTable).getByText("Video games")).toBeInTheDocument();
    });
  });
});
