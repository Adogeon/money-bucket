import bucketRepo from "../data/bucketRepo";

export default Object.freeze({
    listByUserId: function (userId: string) {
        return bucketRepo.listByUserId(userId);
    },
    create: async function (resource: iBucket) {
        return bucketRepo.addNewBucket(resource)
    },
    getBucketById: async function (id: string) {
        return bucketRepo.searchBucketById(id);
    },
    updateBucketById: async function (id: string, update: iBucket) {
        return bucketRepo.updateBucket(id, update);
    },
    deleteBucketById: async function (id: string) {
        return bucketRepo.deleteBucket(id);
    }
})
