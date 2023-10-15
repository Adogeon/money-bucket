import type { iBucketSummary } from "./BucketSummary";
import BucketSummary from "./BucketSummary";

interface BucketListViewProps {
  bucketList: iBucketSummary[] | null;
  isLoading: boolean;
}
const BucketListView = ({
  bucketList,
  isLoading,
}: BucketListViewProps): JSX.Element => {
  return isLoading ? (
    <div>Loading buckets ...</div>
  ) : (
    <div className={"flex flex-col w-72 bg-white shadow-md "}>
      {bucketList?.map((bucket, index) => (
        <BucketSummary
          key={index}
          name={bucket.name}
          spend={bucket.spend}
          limit={bucket.limit}
          data-testid={`bucket-${index}`}
        />
      )) ?? <div>No Bucket here</div>}
    </div>
  );
};

export default BucketListView;
