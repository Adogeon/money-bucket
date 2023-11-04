import { useEffect, useState } from "react";
import { TransactionTableView } from "../../components/Table/TransactionTableView";
import type { Transaction } from "../../types/transaction";
import { useAuth } from "../../context/AuthContext";
import { useApi } from "../../hooks/useAPI";
import { getMonthTransactions } from "../../API/transaction.api";
import { getMonthlyBucketSummary } from "../../API/bucket.api";
import BucketListView from "../../components/Bucket/BucketListView";

interface userBucketProps {
  month: Date;
}
function UserBucket({ month }: userBucketProps): JSX.Element {
  const [getBucketsResponse, APIGetBuckets, ignore] = useApi(
    getMonthlyBucketSummary
  );
  useEffect(() => {
    APIGetBuckets(month);
    () => (ignore.current = true);
  }, [month]);
  return (
    <BucketListView
      bucketList={getBucketsResponse.data}
      isLoading={getBucketsResponse.isFetching}
    />
  );
}

interface MonthlySpendingTableProps {
  inititalMonth: Date;
  initialData: Transaction[];
}
function MonthlySpendingTable({
  initialData,
  inititalMonth,
}: MonthlySpendingTableProps): JSX.Element {
  const [monthTransations, setMonthTransactions] = useState(initialData);
  const [month, setMonth] = useState(inititalMonth);
  const [getMonthResponse, APIGetMonthTransactions, ignore] =
    useApi(getMonthTransactions);

  useEffect(() => {
    APIGetMonthTransactions(month);
    () => (ignore.current = true);
  }, [month]);

  return (
    <div className="w-full flex flex-col justify-center">
      <MonthSelector initialMonth={month} />
      <div className="flex flex-col lg:flex-row justify-evenly">
        <div className="lg:w-1/4">
          <UserBucket month={month} />
        </div>
        <div className="lg:w-2/3">
          {getMonthResponse.isFetching ? (
            <div>Loading...</div>
          ) : (
            <TransactionTableView transactions={getMonthResponse.data ?? []} />
          )}
        </div>
      </div>
    </div>
  );
}

interface MonthSelectorProps {
  initialMonth: Date;
}
function MonthSelector({ initialMonth }: MonthSelectorProps): JSX.Element {
  const displayMonth = initialMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="w-full flex justify-center">
      <button>{"<"}</button>
      <div>{displayMonth}</div>
      <button>{">"}</button>
    </div>
  );
}

interface HomePresentationProps {
  monthlySpending: {
    month: Date;
    transactions: Transaction[];
  };
  buckets: string[];
}
function HomePresentation({
  monthlySpending,
}: HomePresentationProps): JSX.Element {
  return (
    <div className="container mx-auto flex flex-col">
      <div className="w-full flex justify-between space-x-5">
        <MonthlySpendingTable
          initialData={monthlySpending.transactions}
          inititalMonth={monthlySpending.month}
        />
      </div>
    </div>
  );
}

interface HomeControllerProps {
  renderFc: (initialData: HomePresentationProps) => JSX.Element;
}
function HomeContainer({ renderFc }: HomeControllerProps): JSX.Element {
  const { signin, isLoading, isLogin, isCached, loadCache } = useAuth();

  useEffect(() => {
    if (isCached()) {
      loadCache();
    } else {
      signin("thomas", "123456");
    }
  }, []);
  const defaultData = {
    monthlySpending: {
      month: new Date("12/30/2022"),
      transactions: [],
    },
    buckets: [],
  };

  return isLogin ? (
    isLoading ? (
      <div>Loading user ... </div>
    ) : (
      renderFc(defaultData)
    )
  ) : (
    <div>User isn't log in ...</div>
  );
}

export default function Home(): JSX.Element {
  return (
    <HomeContainer
      renderFc={(data) => {
        console.log("Hi");
        return (
          <HomePresentation
            monthlySpending={data.monthlySpending}
            buckets={data.buckets}
          />
        );
      }}
    />
  );
}
