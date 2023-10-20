const mongoose = require("mongoose");
const fs = require("fs/promises");

const parseCSVToObject = (rawData) => {
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
};

const seedDB = async () => {
  try {
    const bucketRaw = await fs.readFile("./db/Budget.csv", {
      encoding: "utf8",
    });
    const seedBucketRaw = parseCSVToObject(bucketRaw);

    const transactionRaw = await fs.readFile("./db/personal_transactions.csv", {
      encoding: "utf8",
    });
    const seedTransactionRaw = parseCSVToObject(transactionRaw);

    await mongoose.connection.collections["user"].drop();
    await mongoose.connection.collections["transaction"].drop();
    await mongoose.connection.collections["bucket"].drop();

    const user1 = await mongoose.connection.collections["user"].insertOne({
      username: "thomas",
      password: "123456",
      currency: "USD",
    });

    const seedBuckets = seedBucketRaw.map((bucket) => {
      return {
        name: bucket["Category"],
        defaultLimit: { amount: bucket["Budget"], currency: "USD" },
        type: "bucket",
        user: user1.insertedId,
      };
    });

    const seedBucketResult = await mongoose.connection.collections[
      "bucket"
    ].insertMany(seedBuckets);
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
        amount: transaction["Amount"],
        currency: "USD",
        type: transaction["Transaction Type"],
        date: new Date(transaction["Date"]),
        bucket: bucketIdMap[transaction["Category"]],
        user: user1.insertedId,
      };
    });
    await mongoose.connection.collections["transaction"].insertMany(
      seedTransactions
    );
  } catch (err) {
    console.log(err);
  }
};

mongoose
  .connect("mongodb://127.0.0.1:27017/moneybucket", {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN !!!");
    return seedDB();
  })
  .then(() => {
    mongoose.connection.close();
    console.log("SEEDING FINISHED");
  })
  .catch((error) => {
    console.error(error);
  });
