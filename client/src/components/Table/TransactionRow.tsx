import type { Transaction } from "../../types/transaction";

interface TransactionRowProps {
	transaction: Transaction,
}

const TransactionRow = ({ transaction }: TransactionRowProps): JSX.Element => (
	<tr className="bg-white border-b" >
		<td className="px-6 py-4 font-medium text-sm text-gray-500">
			{new Date(transaction.date).toLocaleDateString()}
		</td>
		<td className="px-6 py-4 font-medium text-sm text-left text-gray-500">
			{transaction.summary}
		</td>
		<td className="px-6 py-4 font-medium text-sm text-gray-500">
			{transaction.bucket}
		</td>
		<td className="px-6 py-4 font-medium text-sm text-gray-500">
			{`${transaction.amount.value} ${transaction.amount.currency}`}
		</td>
	</tr>
);

export default TransactionRow;
