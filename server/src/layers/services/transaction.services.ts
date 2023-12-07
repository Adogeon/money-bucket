import mongoose from "mongoose";
import type { PipelineStage } from "mongoose";
import {
  runModelAggregate,
  createModelDoc,
  updateModelDoc,
  deleteModelDoc,
} from "../data/data";
import { iTransaction } from "src/models/transaction";

export const createNewTransaction = async (
  userId: mongoose.Types.ObjectId,
  transactionInput: Partial<iTransaction>
) => {
  try {
    const result = await createModelDoc("Transaction", {
      ...transactionInput,
      user: userId,
    });
    return result;
  } catch (error) {
    throw new Error("Problem in creating new transaction");
  }
};

export const updateTransaction = async (
  userId: mongoose.Types.ObjectId,
  transactionId: mongoose.Types.ObjectId,
  update: Partial<iTransaction>
) => {
  const result = await updateModelDoc(
    "Transaction",
    { _id: transactionId, user: userId },
    update
  );
  if (result === null) {
    throw new Error(`Problem in updating transaction ${transactionId}`);
  }
  return result;
};

export const deleteTransaction = async (
  userId: mongoose.Types.ObjectId,
  transactionId: mongoose.Types.ObjectId
) => {
  const result = await deleteModelDoc("Transaction", {
    user: userId,
    _id: transactionId,
  });
  if (result === null) {
    throw new Error(`Problem in deleting transaction ${transactionId}`);
  }
  return result ? true : false;
};

export const getMonthSpending = async (
  userId: mongoose.Types.ObjectId,
  monthString: string
) => {
  const reqMonth = monthString.slice(0, 2);
  const reqYear = monthString.slice(2);
  const pipeline: PipelineStage[] = [
    { $match: { user: userId } },
    {
      $addFields: {
        id: "$_id",
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
    {
      $sort: {
        date: -1,
      },
    },
    {
      $lookup: {
        from: "bucket",
        localField: "bucket",
        foreignField: "_id",
        as: "bucket",
        pipeline: [
          { $addFields: { id: "$_id" } },
          { $project: { name: 1, id: 1, _id: 0 } },
        ],
      },
    },
    { $unwind: { path: "$bucket" } },
    {
      $project: {
        month: 0,
        year: 0,
        user: 0,
        _id: 0,
        _v: 0,
      },
    },
  ];

  const transactionDocs = await runModelAggregate("Transaction", pipeline);
  if (transactionDocs.length < 0) {
    throw new Error("Can't find the transactions");
  }
  return transactionDocs;
};

export const getTransactionDetail = async (
  userId: mongoose.Types.ObjectId,
  transactionId: mongoose.Types.ObjectId
) => {
  const pipeline: PipelineStage[] = [
    { $match: { user: userId, _id: transactionId } },
    { $addFields: { id: "$_id" } },
    {
      $lookup: {
        from: "bucket",
        localField: "from",
        foreignField: "_id",
        as: "from",
        pipeline: [
          { $addFields: { id: "$_id" } },
          { $project: { name: 1, id: 1, _id: 0 } },
        ],
      },
    },
    {
      $lookup: {
        from: "bucket",
        localField: "to",
        foreignField: "_id",
        as: "to",
        pipeline: [
          { $addFields: { id: "$_id" } },
          { $project: { name: 1, id: 1, _id: 0 } },
        ],
      },
    },
    { $unwind: { path: "$from" } },
    { $unwind: { path: "$to" } },
    { $project: { _id: 0, _: 0, user: 0 } },
  ];
  const transactionDoc = await runModelAggregate("Transaction", pipeline);
  if (transactionDoc.length !== 0) {
    throw new Error(`Can't find the transaction ${transactionId}`);
  }
  return transactionDoc[0];
};
