import type { PipelineStage, FilterQuery, HydratedDocument } from "mongoose";
import models from "../../models";
import { iUser } from "src/models/user";
import { iTransaction } from "src/models/transaction";
import { iBucket } from "src/models/bucket";

type modelsName = "User" | "Transaction" | "Bucket";
type inferDocType<T extends modelsName> = T extends "User"
  ? iUser
  : T extends "Transaction"
  ? iTransaction
  : T extends "Bucket"
  ? iBucket
  : never;

export const runModelAggregate = async (
  model: modelsName,
  pipeline: PipelineStage[]
) => {
  const dbModel = models[model];
  const result = await dbModel.aggregate(pipeline);
  return result;
};

export const getModelDoc = async <T extends modelsName>(
  model: T,
  query: FilterQuery<inferDocType<T>>
): Promise<inferDocType<T> | null> => {
  switch (model) {
    case "User":
      return await models.User.findOne(query);
    case "Transaction":
      return await models.Transaction.findOne(query);
    case "Bucket":
      return await models.Bucket.findOne(query);
    default:
      throw new Error(`Can't find this ${model}`);
  }
};

export const createModelDoc = async <T extends modelsName>(
  model: T,
  newDoc: inferDocType<T>
) => {
  switch (model) {
    case "User":
      return (await models.User.create(newDoc)) as HydratedDocument<iUser>;
    case "Transaction":
      return (await models.Transaction.create(
        newDoc
      )) as HydratedDocument<iTransaction>;
    case "Bucket":
      return (await models.Bucket.create(newDoc)) as HydratedDocument<iBucket>;
    default:
      throw new Error(`Can't find this ${model}`);
  }
};

type updateModelDocFunc = {
  (
    model: "User",
    query: FilterQuery<iUser>,
    update: Partial<iUser>
  ): Promise<iUser | null>;
  (
    model: "Transaction",
    query: FilterQuery<iTransaction>,
    update: Partial<iTransaction>
  ): Promise<iTransaction | null>;
  (
    model: "Bucket",
    query: FilterQuery<iBucket>,
    update: Partial<iBucket>
  ): Promise<iBucket | null>;
};
export const updateModelDoc: updateModelDocFunc = async (
  model,
  query,
  update
) => {
  switch (model) {
    case "User":
      return models.User.findOneAndUpdate(query, update, { new: true });
    case "Transaction":
      return models.Transaction.findOneAndUpdate(query, update, {
        new: true,
      });
    case "Bucket":
      return models.Bucket.findOneAndUpdate(query, update, {
        new: true,
      });
    default:
      throw new Error(`Can't find this ${model}`);
  }
};

type deleteModelDocFunc = {
  (model: "User", query: FilterQuery<iUser>): Promise<iUser | null>;
  (
    model: "Transaction",
    query: FilterQuery<iTransaction>
  ): Promise<iTransaction | null>;
  (model: "Bucket", query: FilterQuery<iBucket>): Promise<iBucket | null>;
};
export const deleteModelDoc: deleteModelDocFunc = async (model, query) => {
  switch (model) {
    case "User":
      return models.User.findOneAndDelete(query);
    case "Transaction":
      return models.Transaction.findOneAndDelete(query);
    case "Bucket":
      return models.Bucket.findOneAndDelete(query);
    default:
      throw new Error(`Can't find this ${model}`);
  }
};
