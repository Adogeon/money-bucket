import type { PipelineStage, FilterQuery } from "mongoose";
import models from "../../models";

type modelsName = "User" | "Transaction" | "Bucket";

export const runModelAggregate = async (
  model: modelsName,
  pipeline: PipelineStage[]
) => {
  const dbModel = models[model];
  const result = await dbModel.aggregate(pipeline);
  return result;
};

export const getModelDoc = async (
  model: modelsName,
  query: FilterQuery<any>
) => {
  let queryRunner;
  switch (model) {
    case "User":
      queryRunner = models.User.findOne(query);
      break;
    case "Transaction":
      queryRunner = models.Transaction.findOne(query);
      break;
    case "Bucket":
      queryRunner = models.Bucket.findOne(query);
      break;
    default:
      throw new Error(`Can't find this ${model}`);
  }
  const result = await queryRunner?.exec();
  return result;
};

export const updateModelDoc = async (
  model: modelsName,
  query: FilterQuery<any>,
  update: any
) => {
  let queryRunner;
  switch (model) {
    case "User":
      queryRunner = models.User.findOneAndUpdate(query, update, { new: true });
      break;
    case "Transaction":
      queryRunner = models.Transaction.findOneAndUpdate(query, update, {
        new: true,
      });
      break;
    case "Bucket":
      queryRunner = models.Bucket.findOneAndUpdate(query, update, {
        new: true,
      });
      break;
    default:
      throw new Error(`Can't find this ${model}`);
  }
  const result = await queryRunner?.exec();
  return result;
};

export const deleteModelDoc = async (
  model: modelsName,
  query: FilterQuery<any>
) => {
  let queryRunner;
  switch (model) {
    case "User":
      queryRunner = models.User.findOneAndDelete(query);
      break;
    case "Transaction":
      queryRunner = models.Transaction.findOneAndDelete(query);
      break;
    case "Bucket":
      queryRunner = models.Bucket.findOneAndDelete(query);
      break;
    default:
      throw new Error(`Can't find this ${model}`);
  }
  const result = await queryRunner?.exec();
  return result;
};
