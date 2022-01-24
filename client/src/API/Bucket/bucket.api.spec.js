import * as BucketAPI from "./bucket.api.js";

describe("Bucket API", () => {
  describe("getUserPackage", () => {
    it("should return an array of bucket", () => {
      expect(BucketAPI.getUserBucket()).resolves.toBeArray();
    });
  });
});
