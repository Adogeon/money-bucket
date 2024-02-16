import { jest } from "@jest/globals"
import bucketController from "./bucket.controller";
import bucketRepo from "src/data/bucketRepo";

jest.mock("src/data/bucketRepo");

describe("bucketController", () => {
    describe("listByUserId", () => {
        it('should call the correct repo method', () => {
            bucketController.listByUserId("test-user-id");
            expect(bucketRepo.listByUserId).toHaveBeenCalledTimes(1);
            expect(bucketRepo.listByUserId).toHaveBeenCalledWith("test-user-id");
        })
    });
    describe("listByUserIdWithMonthSummary", () => {
        it('should call the correct repo method', () => {
            bucketController.listByUserIdWithMonthSummary("test-user-id", { month: 1, year: 2024 });
            expect(bucketRepo.listByUserIdWithMonthSummary).toHaveBeenCalledTimes(1);
            expect(bucketRepo.listByUserIdWithMonthSummary).toHaveBeenCalledWith("test-user-id", { month: 1, year: 2024 });
        })
    });
    describe("create", () => {
        it('should call the correct repo method', () => {
            const testBucket: iBucket = {
                name: "test-bucket-1",
                type: "expense",
                user: "test-user"
            }
            bucketController.create(testBucket);
            expect(bucketRepo.addNewBucket).toHaveBeenCalledTimes(1);
            expect(bucketRepo.addNewBucket).toHaveBeenCalledWith(testBucket);
        })
    });
    describe("getBucketById", () => {
        it('should call the correct repo method', () => {
            bucketController.getBucketById("test-bucket-1");
            expect(bucketRepo.searchBucketById).toHaveBeenCalledTimes(1);
            expect(bucketRepo.searchBucketById).toHaveBeenCalledWith("test-bucket-1");
        })
    });
    describe("updateBucketById", () => {
        const updateBucket: Partial<iBucket> = {
            name: "test-bucket-2",
        }
        it('should call the correct repo method', () => {
            bucketController.updateBucketById("test-bucket-id", updateBucket);
            expect(bucketRepo.updateBucket).toHaveBeenCalledTimes(1);
            expect(bucketRepo.updateBucket).toHaveBeenCalledWith("test-bucket-id", updateBucket);
        })
    });
    describe("deleteBucketById", () => {
        it('should call the correct repo method', () => {
            bucketController.deleteBucketById("test-bucket-id");
            expect(bucketRepo.deleteBucket).toHaveBeenCalledTimes(1);
            expect(bucketRepo.deleteBucket).toHaveBeenCalledWith("test-bucket-id");
        })
    });
})