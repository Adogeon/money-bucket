import { useEffect, useState } from "react";
import TransactionTableView from "../../components/Table/TransactionTableView";
import type { Transaction } from "../../types/transaction";
import { useAuth } from "../../context/AuthContext";
import { useApi } from "../../hooks/useAPI";
import { getMonthTransactions } from "../../API/transaction.api";

function UserBucket(): JSX.Element {
  return <div>User bucket list of bucket summary</div>;
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
  const [response, APIGetMonthTransactions] = useApi(getMonthTransactions);

  useEffect(() => {
    APIGetMonthTransactions(month);
    if (response.isSuccess) {
      setMonthTransactions(response.data);
    }
  }, [month]);

  return (
    <div className="w-full flex justify-center">
      <MonthSelector initialMonth={month} />
      <TransactionTableView
        transactions={monthTransations}
        isLoading={response.isFetching}
      />
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
        <UserBucket />
        <div className={"w-4/5"}>
          <MonthlySpendingTable
            initialData={monthlySpending.transactions}
            inititalMonth={monthlySpending.month}
          />
        </div>
      </div>
    </div>
  );
}

interface HomeControllerProps {
  renderFc: (initialData: HomePresentationProps) => JSX.Element;
}
function HomeContainer({ renderFc }: HomeControllerProps): JSX.Element {
  const { signin, isLoading, isCached, loadCache } = useAuth();

  useEffect(() => {
    if (isCached) {
      loadCache();
    } else {
      signin("thomas", "12345");
    }
  });
  const defaultData = {
    monthlySpending: {
      month: new Date(),
      transactions: [],
    },
    buckets: [],
  };

  return isLoading ? <div>Loading user ... </div> : renderFc(defaultData);
}

export default function Home(): JSX.Element {
  return (
    <HomeContainer
      renderFc={(data) => (
        <HomePresentation
          monthlySpending={data.monthlySpending}
          buckets={data.buckets}
        />
      )}
    />
  );
}
