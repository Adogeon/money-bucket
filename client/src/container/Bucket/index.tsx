import { useParams } from "react-router-dom";
import { ShortTransactionTableView } from "../../components/Table/TransactionTableView";
import { useApi } from "../../hooks/useAPI";
import { getBucketDetail, getBucketMonthSpending } from "../../API/bucket.api";
import { useState, useEffect } from "react";
import MonthPicker from "../../components/Table/MonthPicker";

interface BucketSpendingTableProps {
  bucket: string;
}
const BucketSpendingTable = ({ bucket }: BucketSpendingTableProps) => {
  const [month, setMonth] = useState(new Date("12/30/2022"));
  const [response, loadBucketMonthSpending, ignore] = useApi(
    getBucketMonthSpending
  );

  useEffect(() => {
    loadBucketMonthSpending(bucket, month);
    () => {
      ignore.current = true;
    };
  }, [month]);

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
  };

  return (
    <div>
      <MonthPicker month={month} onMonthChange={handleMonthChange} />
      {response.isFetching ? (
        <div>Loading ...</div>
      ) : (
        <ShortTransactionTableView data={response.data} />
      )}
    </div>
  );
};

const BucketPage = () => {
  const { bucketId } = useParams();

  const defaultBucket = {
    id: "",
    name: "Expense Bucket",
    transactions: [],
    currency: "USD",
    defaultLimit: 100,
    totalSpend: 0,
  };

  const [month, setMonth] = useState(new Date("12/30/2022"));
  const [bucket, setBucket] = useState(defaultBucket);
  const [response, loadBucketMonthSpending, ignore] = useApi(
    getBucketMonthSpending
  );

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
  };

  useEffect(() => {
    loadBucketMonthSpending(bucketId ? bucketId : "", month);
    () => {
      ignore.current = true;
    };
  }, [month]);

  useEffect(() => {
    console.log("success", response.isSuccess);
    console.log("bucket", bucket);
    console.log("response", response.data);
    if (response.isSuccess) {
      setBucket(response.data);
    }
  }, [response]);

  useEffect(() => {
    console.log("data-bucket", bucket);
  }, [bucket]);

  return (
    <>
      {response.isFetching ? (
        <div>Loading ... </div>
      ) : (
        <div className="mx-auto container">
          <h1 className="text-center text-2xl font-extrabold text-primary">
            {bucket.name}
          </h1>
          <MonthPicker month={month} onMonthChange={handleMonthChange} />
          <section>
            <p>
              <em>Spending: </em>
              <span>{`${bucket.totalSpend} ${bucket.currency}`}</span>
            </p>
            <p>
              <em>Limit: </em>
              <span>{`${bucket.defaultLimit} ${bucket.currency}`}</span>
            </p>
          </section>
          <section>
            <ShortTransactionTableView data={bucket.transactions} />
          </section>
        </div>
      )}
    </>
  );
};

export default BucketPage;
