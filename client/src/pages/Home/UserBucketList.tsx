import { useQuery } from "@tanstack/react-query";

import { getUserMonthlyBudget } from "../../API/budget.api";
import BucketListView from "../../components/Bucket/BucketListView";
import { useAuth } from "../../context/AuthContext";

interface userBucketListProps {
  month: Date;
}

function UserBucketList({ month }: userBucketListProps): JSX.Element {
  const auth = useAuth();
  const { data, isFetching } = useQuery({
    queryKey: ["listBucket", { month }],
    queryFn: () => getUserMonthlyBudget(auth.token, month),
  });

  return <BucketListView buckets={data} isLoading={isFetching} />;
}

export default UserBucketList;
