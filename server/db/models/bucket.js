const Schema = require("mongoose").Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const BucketSchema = new Schema({
  name: String,
  type: String,
  user: { type: SchemaObjectId, ref: "User" },
});

BucketSchema.virtual("transactions", {
  ref: "Transaction",
  localField: "_id",
  foreignField: "bucket",
});

module.exports = BucketSchema;
