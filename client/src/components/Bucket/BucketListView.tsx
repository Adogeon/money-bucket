import type { iBucketSummary } from "./BucketSummary";
import BucketSummary from "./BucketSummary";

interface BucketListViewProps {
  buckets?: iBucketSummary[];
  isLoading: boolean;
}
const BucketListView = ({
  buckets,
  isLoading,
}: BucketListViewProps): JSX.Element => {
  const incomes = buckets?.filter((bucket) => bucket.type == "Asset");
  const expenses = buckets?.filter((bucket) => bucket.type == "Expense");
  const liablilities = buckets?.filter((bucket) => bucket.type == "Liability");

  return isLoading ? (
    <div>Loading buckets ...</div>
  ) : (
    <>
      <div className={"flex flex-col bg-white shadow-lg border-2 px-2"}>
        {incomes?.map((bucket, index) => (
          <BucketSummary
            key={index}
            bucket={bucket}
            data-testid={`bucket-${index}`}
          />
        )) ?? <div>No Bucket here</div>}
      </div>
      <div className={"flex flex-col bg-white shadow-lg border-2 px-2"}>
        {expenses?.map((bucket, index) => (
          <BucketSummary
            key={index}
            bucket={bucket}
            data-testid={`bucket-${index}`}
          />
        )) ?? <div>No Bucket here</div>}
      </div>
      <div className={"flex flex-col bg-white shadow-lg border-2 px-2"}>
        {liablilities?.map((bucket, index) => (
          <BucketSummary
            key={index}
            bucket={bucket}
            data-testid={`bucket-${index}`}
          />
        )) ?? <div>No Bucket here</div>}
      </div>
    </>
  );
};

export default BucketListView;
