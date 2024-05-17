import { useQuery } from "@tanstack/react-query";
import { getMonthTransactions } from "../../API/transaction.api";
import { TransactionTableView } from "../../components/TransactionTableView";

interface SpendingTableProps {
  month: Date;
}

function RecentSpendingTable({ month }: SpendingTableProps): JSX.Element {
  const auth = useAuth();
  const { data, isFetching } = useQuery({
    queryKey: ["listTransaction", { month }],
    queryFn: () => getMonthTransactions(auth.token ?? "", month),
  });

  return (
    <>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <TransactionTableView transactions={data ?? []} />
      )}
    </>
  );
}
import { useAuth } from "../../context/AuthContext";

export default RecentSpendingTable;
