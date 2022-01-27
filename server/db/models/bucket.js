const Schema = require("mongoose").Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const BucketSchema = new Schema({
  name: String,
  type: String,
  user: { type: SchemaObjectId, ref: "user" },
});

BucketSchema.virtual("transactions", {
  ref: "transaction",
  localField: "_id",
  foreignField: "bucket",
});

module.exports = BucketSchema;
