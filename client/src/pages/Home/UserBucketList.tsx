import { useQuery } from "@tanstack/react-query";

import { getMonthlyBucketSummary } from "../../API/bucket.api";
import BucketListView from "../../components/Bucket/BucketListView";
import { useAuth } from "../../context/AuthContext";

interface userBucketListProps {
  month: Date;
}

function UserBucketList({ month }: userBucketListProps): JSX.Element {
  const auth = useAuth();
  const { data, isFetching } = useQuery({
    queryKey: ["listBucket", { month }],
    queryFn: () => getMonthlyBucketSummary(auth.token, month),
  });

  console.log(data);

  return <BucketListView buckets={data} isLoading={isFetching} />;
}

export default UserBucketList;
