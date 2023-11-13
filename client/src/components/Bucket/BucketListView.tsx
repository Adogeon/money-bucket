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
    <div className={"flex flex-col bg-white shadow-lg border-2 px-2"}>
      {bucketList?.map((bucket, index) => (
        <BucketSummary
          key={index}
          bucket={bucket}
          data-testid={`bucket-${index}`}
        />
      )) ?? <div>No Bucket here</div>}
    </div>
  );
};

export default BucketListView;
