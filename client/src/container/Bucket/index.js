import { useParams } from "react-router-dom";
import ShortTransactionTableView from "../../components/Table/TransactionTableView";
import { useApi } from "../../hooks/useAPI";
import { getBucketDetail } from "../../API/bucket.api";
import { useEffect } from "react";

const BucketSpendingTable = () => {
  const [month, setMonth] = useState(new Date("12/30/2022"));
  const [response, loadBucketMonthSpending, ignore] = useApi(
    getBucketMonthSpending
  );

  useEffect(() => {
    loadBucketMonthSpending(month, bucketId);

    () => {
      ignore.current = true;
    };
  }, [month]);

  return (
    <div>
      <MonthSelector initialMonth={month} />
      {response.isFetching ? (
        <div>Loading ...</div>
      ) : (
        <ShortTransactionTableView data={response.data} />
      )}
    </div>
  );
};

const BucketPage = () => {
  const bucketId = useParams(bucketId);
  const [{ data, isFetching }, loadBucketDetail, ignore] =
    useApi(getBucketDetail);

  useEffect(() => {
    loadBucketDetail(bucketId);
    () => {
      ignore.current = true;
    };
  }, [bucketId]);

  return (
    <>
      {isFetching ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <h1>{data.name}</h1>
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
            <BucketSpendingTable />
          </section>
        </div>
      )}
    </>
  );
};

export default BucketPage;
