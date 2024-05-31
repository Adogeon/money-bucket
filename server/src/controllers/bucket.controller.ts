import bucketRepo from "../data/bucketRepo";
import budgetRepo from "../data/budgetRepo";
import type { monthDO, iBucket } from "../common/types";

export default Object.freeze({
    listByUserId: async function (userId: string) {
        return await bucketRepo.listByUserId(userId);
    },
    listByUserIdWithMonthSummary: async function (userId: string, month: monthDO) {
        const bucketList = await bucketRepo.listByUserIdWithMonthSummary(userId, month);
        return await Promise.allSettled(bucketList.map(async bucket => {
            const budget = await budgetRepo.listBucketMonthlyBudget(month, bucket._id)
            const { defaultLimit, ...rest } = bucket
            return { ...rest, budget: budget?.limit ?? defaultLimit }
        }))
    },
    create: async function (resource: iBucket) {
        return await bucketRepo.addNewBucket(resource)
    },
    getBucketById: async function (id: string) {
        return await bucketRepo.searchBucketById(id);
    },
    updateBucketById: async function (id: string, update: Partial<iBucket>) {
        return await bucketRepo.updateBucket(id, update);
    },
    deleteBucketById: async function (id: string) {
        return await bucketRepo.deleteBucket(id);
    }
})
