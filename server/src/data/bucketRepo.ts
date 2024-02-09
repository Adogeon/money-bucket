import models from "src/models";

const Bucket = models.Bucket;

export default Object.freeze({
    listByUserId: async function (userId: string) {
        try {
            const result = await Bucket.find({ user: userId }).lean();
            return result;
        } catch (error) {
            throw error;
        }
    },
    searchBucketById: async function (bucketId: string) {
        try {
            const result = await Bucket.findOne({ _id: bucketId }).lean();
            return result;
        } catch (error) {
            throw error;
        }
    },
    addNewBucket: async function (bucketInput: Partial<iBucket>) {
        try {
            const newBucket = new Bucket(bucketInput);
            newBucket.save();
            return newBucket;
        } catch (error) {
            throw error;
        }
    },
    updateBucket: async function (bucketId: string, bucketUpdate: Partial<iBucket>) {
        try {
            const updateBucket = await Bucket.findByIdAndUpdate(bucketId, bucketUpdate, { new: true, lean: true });
            return updateBucket;
        } catch (error) {
            throw error;
        }
    },
    deleteBucket: async function (bucketId: string) {
        try {
            const deleteBucket = await Bucket.findByIdAndDelete(bucketId, { lean: true });
            return deleteBucket?._id === bucketId ?? false;
        } catch (error) {
            throw error;
        }
    },

})