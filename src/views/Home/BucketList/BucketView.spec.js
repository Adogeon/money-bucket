import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import BucketView from "./BucketList";
import * as BucketAPI from "../../../API/Bucket/bucket.api";

const getUserBucketSpy = jest.spyOn(BucketAPI, "getUserBucket");

describe("BucketView", () => {
  describe("on mounted", () => {
    beforeAll(() => {
      getUserBucketSpy.mockImplementation(() => [
        { id: 1, name: "Essential", spend: 60, limit: 100 },
        { id: 2, name: "Food", spend: 20, limit: 200 },
        { id: 3, name: "Media", spend: 40, limit: 50 },
      ]);
    });
    afterAll(() => {
      cleanup();
      getUserBucketSpy.mockClear();
    });

    it("should fetch data and display the correct amount of Bucket", async () => {
      render(<BucketView />);
      expect(getUserBucketSpy).toHaveBeenCalledTimes(1);
      expect(
        await screen.findAllByTestId("bucket-", { exact: false })
      ).toBeArrayOfSize(3);
    });
  });
});
