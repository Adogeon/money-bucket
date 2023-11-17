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
  console.log(bucketId);
  const [{ data, isFetching }, loadBucketDetail, ignore] =
    useApi(getBucketDetail);

  console.log(isFetching);

  useEffect(() => {
    loadBucketDetail(bucketId ? bucketId : "");
    () => {
      ignore.current = true;
    };
  }, []);

  return (
    <>
      {isFetching ? (
        <div>Loading ... </div>
      ) : (
        <div className="mx-auto container">
          <h1 className="text-center text-2xl font-extrabold text-primary">
            {data.name}
          </h1>
          <section>
            <p>
              <em>Spending: </em>
              <span>{`${data.totalSpend} ${data.currency}`}</span>
            </p>
            <p>
              <em>Limit: </em>
              <span>{`${data.limit} ${data.currency}`}</span>
            </p>
          </section>
          <section>
            <BucketSpendingTable bucket={bucketId ? bucketId : ""} />
          </section>
        </div>
      )}
    </>
  );
};

export default BucketPage;
