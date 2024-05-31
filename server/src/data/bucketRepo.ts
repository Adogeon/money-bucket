import models from "../models";
import mongoose from "mongoose";

import { MongoMonthQueryDO } from "./utils/monthQueryDO";
import type { monthDO, iBucket } from "src/common/types";

const Bucket = models.Bucket;

export default Object.freeze({
    listByUserId: async function (userId: string) {
        const result = await Bucket.find({ user: userId }).sort({ name: 1 }).lean();
        return result;
    },
    listByUserIdWithMonthSummary: async function (userId: string, month: monthDO) {
        const DateQueryPipeline = [
            {
                $match: {
                    date: new MongoMonthQueryDO(month).generateQuery()
                },
            },
        ];

        const bucketList = await Bucket.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $lookup: {
                    from: "transaction",
                    localField: "_id",
                    foreignField: "from",
                    as: "from",
                    pipeline: DateQueryPipeline,
                },
            },
            {
                $lookup: {
                    from: "transaction",
                    localField: "_id",
                    foreignField: "to",
                    as: "to",
                    pipeline: DateQueryPipeline,
                },
            },
            {
                $project: {
                    id: "$_id",
                    name: 1,
                    type: 1,
                    currency: 1,
                    totalFrom: { $sum: "$from.amount" },
                    totalTo: { $sum: "$to.amount" },
                    to: 1,
                    from: 1,
                },
            },
            {
                $project: {
                    _id: 0,
                },
            },
            {
                $sort: {
                    name: 1,
                },
            },
        ]);
        return bucketList;
    },
    searchBucketById: async function (bucketId: string) {
        const result = await Bucket.findOne({ _id: bucketId }).lean();
        return result;
    },
    addNewBucket: async function (bucketInput: iBucket) {
        const newBucket = new Bucket(bucketInput);
        await newBucket.save();
        return newBucket;
    },
    updateBucket: async function (bucketId: string, bucketUpdate: Partial<iBucket>) {
        const updateBucket = await Bucket.findByIdAndUpdate(bucketId, bucketUpdate, { new: true, lean: true });
        return updateBucket;
    },
    deleteBucket: async function (bucketId: string) {
        const deleteBucket = await Bucket.findByIdAndDelete(bucketId, { lean: true });
        return deleteBucket?._id === bucketId ?? false;
    }
})