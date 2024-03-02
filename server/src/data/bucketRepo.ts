import models from "../models";

const Bucket = models.Bucket;

export default Object.freeze({
    listByUserId: async function (userId: string) {
        try {
            const result = await Bucket.find({ user: userId }).sort({ name: 1 }).lean();
            return result;
        } catch (error) {
            throw error;
        }
    },
    listByUserIdWithMonthSummary: async function (userId: string, month: monthDO) {
        try {
            const TransactionPipeline = [
                {
                    $match: {
                        date: new mongoMonthQueryDO(month).generateQuery()
                    },
                },
            ];

            const bucketList = await Bucket.aggregate([
                { $match: { user: userId } },
                {
                    $lookup: {
                        from: "transaction",
                        localField: "_id",
                        foreignField: "from",
                        as: "from",
                        pipeline: TransactionPipeline,
                    },
                },
                {
                    $lookup: {
                        from: "transaction",
                        localField: "_id",
                        foreignField: "to",
                        as: "to",
                        pipeline: TransactionPipeline,
                    },
                },
                {
                    $project: {
                        id: "$_id",
                        name: 1,
                        type: 1,
                        limit: "$defaultLimit",
                        currency: 1,
                        totalFrom: { $sum: "$from.amount" },
                        totalTo: { $sum: "$to.amount" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        from: 0,
                        to: 0,
                    },
                },
                {
                    $sort: {
                        name: 1,
                    },
                },
            ]);
            return bucketList;
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
    addNewBucket: async function (bucketInput: iBucket) {
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