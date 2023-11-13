import { Link, useNavigate } from "react-router-dom";
import type { Transaction } from "../../types/transaction";

interface TransactionRowProps {
  transaction: Transaction;
}
export const TransactionRow = ({
  transaction,
}: TransactionRowProps): JSX.Element => {
  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4 font-medium text-sm text-gray-500">
        {`${new Date(transaction.date).toLocaleDateString()}`}
      </td>
      <td className="px-6 py-4 font-medium text-sm text-left text-gray-500">
        {`${transaction.summary}`}
      </td>
      <td className="px-6 py-4 font-medium text-sm text-gray-500">
        <Link to={`/bucket/${transaction.bucket?.id}`}>
          {transaction.bucket?.name ?? ""}
        </Link>
      </td>
      <td className="px-6 py-4 font-medium text-sm text-gray-500">
        {`${transaction.amount} ${transaction.currency}`}
      </td>
    </tr>
  );
};

interface TransactionLinkRowProps {
  data: Omit<Transaction, "bucket">;
}
export const TransactionLinkRow = ({ data }: TransactionLinkRowProps) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/transaction/${data.id}`);
  };

  return (
    <tr className="bg-white border-b cursor-pointer" onClick={handleOnClick}>
      <td className="px-6 py-4 font-medium text-sm text-gray-500">
        {`${new Date(data.date).toLocaleDateString()}`}
      </td>
      <td className="px-6 py-4 font-medium text-sm text-left text-gray-500">
        {`${data.summary}`}
      </td>
      <td className="px-6 py-4 font-medium text-sm text-gray-500">
        {`${data.amount} ${data.currency}`}
      </td>
    </tr>
  );
};
