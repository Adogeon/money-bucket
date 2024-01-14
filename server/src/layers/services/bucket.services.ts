import { iBucket } from "src/models/bucket";
import bucketRepo from "../data/bucketRepo";

export default Object.freeze({
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


