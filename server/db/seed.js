const { MongoClient } = require("mongodb");
const fs = require("fs/promises");
const bcrypt = require("bcrypt");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

main()
  .then(console.log("SEEDING COMPLETE!"))
  .catch(console.error)
  .finally(() => client.close());

async function main() {
  await client.connect();
  console.log("Database connect");
  const db = client.db("moneybucket");

  const bucketRaw = await fs.readFile("./db/Budget.csv", {
    encoding: "utf8",
  });
  const seedBucketRaw = parseCSVToObject(bucketRaw);

  const transactionRaw = await fs.readFile("./db/personal_transactions.csv", {
    encoding: "utf8",
  });
  const seedTransactionRaw = parseCSVToObject(transactionRaw);

  await db.collection("user").drop();
  await db.collection("transaction").drop();
  await db.collection("bucket").drop();

  const hashPassword = await bcrypt.hash("123456", 10);

  const user1 = await db.collection("user").insertOne({
    username: "thomas",
    password: hashPassword,
    currency: "USD",
  });

  const seedBuckets = seedBucketRaw.map((bucket) => {
    return {
      name: bucket["Category"],
      defaultLimit: parseFloat(bucket["Budget"]),
      currency: "USD",
      type: bucket["Types"],
      user: user1.insertedId,
    };
  });

  const seedBucketResult = await db
    .collection("bucket")
    .insertMany(seedBuckets);
  const bucketIdsObjs = seedBuckets.map((buckets, index) => ({
    name: buckets.name,
    id: seedBucketResult.insertedIds[index],
  }));

  const bucketIdMap = {};
  bucketIdsObjs.forEach((object) => {
    Object.assign(bucketIdMap, { [object.name]: object.id });
  });

  const seedTransactions = seedTransactionRaw.map((transaction) => {
    return {
      summary: transaction["Description"],
      amount: parseFloat(transaction["Amount"]),
      currency: "USD",
      type: transaction["Transaction Type"],
      date: new Date(transaction["Date"]),
      to: bucketIdMap[transaction["To"]],
      from: bucketIdMap[transaction["From"]],
      user: user1.insertedId,
    };
  });
  await db.collection("transaction").insertMany(seedTransactions);
}

function parseCSVToObject(rawData) {
  const rows = rawData.split("\r\n");
  const labels = rows[0].split(",");
  const data = rows.slice(1).map((row) => {
    const cells = row.split(",");
    const result = {};
    labels.forEach((label, index) => {
      result[label] = cells[index];
    });
    return result;
  });
  return data;
}
