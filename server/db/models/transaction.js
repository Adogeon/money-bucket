const Schema = require("mongoose").Schema;
const SchemaObjectId = Schema.Types.ObjectId;

const TransactionSchema = new Schema({
  summary: String,
  amount: Number,
  bucket: { type: SchemaObjectId, ref: "Bucket" },
  type: String,
  date: Date,
  user: { type: SchemaObjectId, ref: "User" },
});

TransactionSchema.set("toJSON", {
  virtuals: true,
});

module.exports = TransactionSchema;
