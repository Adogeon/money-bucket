import type { ReactNode } from "react";
import type { Transaction } from "../types/transaction";
import { TransactionLinkRow, TransactionRow } from "./Table/TransactionRow";

interface TableHeaderProps {
  headers: string[];
  children: ReactNode;
}
const TableHeader = ({ headers, children }: TableHeaderProps) => {
  return (
    <table className="w-full text-center shadow-md spending-table">
      <thead className="border-b bg-primary">
        <tr>
          {headers.map((header, index) => (
            <th
              scope="col"
              className="text-sm font-medium text-white px-6 py-4"
              key={`header-${index}`}
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

interface TransactionTableViewProps {
  transactions: Transaction[] | null;
}
export const TransactionTableView = ({
  transactions,
}: TransactionTableViewProps): JSX.Element => {
  return (
    <TableHeader headers={["Date", "Summary", "Bucket", "Amount"]}>
      {transactions?.map((transaction, index: number) => (
        <TransactionRow transaction={transaction} key={`row-${index}`} />
      ))}
    </TableHeader>
  );
};

interface ShortTransactionTableViewProps {
  data: Omit<Transaction, "bucket">[];
}

export const ShortTransactionTableView = ({
  data,
}: ShortTransactionTableViewProps) => {
  console.log("data", data);
  return (
    <TableHeader headers={["Date", "Summary", "Amount"]}>
      {data.map((transaction) => (
        <TransactionLinkRow
          data={transaction}
          key={`link-row-${transaction.id}`}
        />
      ))}
    </TableHeader>
  );
};
