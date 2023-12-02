import { getModelDoc, runModelAggregate } from "../data/data";
import mongoose from "mongoose";

export const getSpendingReport = async (
  userId: mongoose.Types.ObjectId,
  monthString: string
) => {
  const reqMonth = Number(monthString.slice(0, 2));
  const reqYear = Number(monthString.slice(8));

  const TransactionPipeline = [
    {
      $addFields: {
        month: { $month: "$date" },
        year: { $year: "$date" },
      },
    },
    {
      $match: {
        month: reqMonth,
        year: reqYear,
      },
    },
  ];

  const spendingSummaries = await runModelAggregate("Bucket", [
    { $match: { user: userId } },
    {
      $lookup: {
        from: "transaction",
        localField: "_id",
        foreignField: "from",
        as: "fund",
        pipeline: TransactionPipeline,
      },
    },
    {
      $lookup: {
        from: "transaction",
        localField: "_id",
        foreignField: "to",
        as: "spend",
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
        totalSpend: { $sum: "$spend.amount" },
        count: { $size: "$spend" },
        totalFund: { $sum: "$fund.amount" },
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

  return spendingSummaries;
};

export const getBucketList = async (userId: mongoose.Types.ObjectId) => {
  const bucketList = await runModelAggregate("Bucket", [
    { $match: { user: userId } },
    { $addFields: { id: "$_id" } },
    { $project: { name: 1, _id: 0, id: 1 } },
    { $sort: { name: 1 } },
  ]);

  return bucketList;
};

export const getBucketDetail = async (
  userId: mongoose.Types.ObjectId,
  bucketId: string
) => {
  const bucketDoc = await getModelDoc("Bucket", {
    _id: bucketId,
    user: userId,
  });

  if (bucketDoc === null)
    throw new Error(`Can't find bucket with id ${bucketId}`);

  return bucketDoc;
};

export const getBucketSpendingReport = async (
  userId: mongoose.Types.ObjectId,
  bucketId: mongoose.Types.ObjectId,
  monthString: string
) => {
  const reqMonth = Number(monthString.slice(0, 2));
  const reqYear = Number(monthString.slice(2));

  const TransactionPipeline = [
    {
      $addFields: {
        id: "$_id",
        month: {
          $month: "$date",
        },
        year: {
          $year: "$date",
        },
      },
    },
    {
      $match: {
        month: reqMonth,
        year: reqYear,
      },
    },
    {
      $project: {
        bucket: 0,
        _id: 0,
        user: 0,
      },
    },
  ];

  const BucketPipeline = [
    { $match: { user: userId, _id: bucketId } },
    {
      $lookup: {
        from: "transaction",
        localField: "_id",
        foreignField: "from",
        as: "credit",
        pipeline: TransactionPipeline,
      },
    },
    {
      $lookup: {
        from: "transaction",
        localField: "_id",
        foreignField: "to",
        as: "debit",
        pipeline: TransactionPipeline,
      },
    },
    {
      $project: {
        name: 1,
        id: "$_id",
        defaultLimit: 1,
        transactions: 1,
        currency: 1,
        totalSpend: { $sum: "$transactions.amount" },
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
  ];

  const bucketDocs = await runModelAggregate("Bucket", BucketPipeline);
  return bucketDocs;
};
