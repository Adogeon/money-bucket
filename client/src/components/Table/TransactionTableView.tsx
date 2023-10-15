import type { Transaction } from "../../types/transaction";
import TransactionRow from "./TransactionRow";

interface TransactionTableViewInterface {
  transactions: Transaction[];
  isLoading: boolean;
}

const TransactionTableView = ({
  transactions,
  isLoading,
}: TransactionTableViewInterface): JSX.Element => {
  return isLoading ? (
    <table className="w-full text-center shadow-md">
      <thead className="border-b bg-gray-800">
        <tr>
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Date
          </th>
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Summary
          </th>
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Bucket
          </th>
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index: number) => (
          <TransactionRow transaction={transaction} key={`row-${index}`} />
        ))}
      </tbody>
    </table>
  ) : (
    <div>Loading table ...</div>
  );
};

export default TransactionTableView;