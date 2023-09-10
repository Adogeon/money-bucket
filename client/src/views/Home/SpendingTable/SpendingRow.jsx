import React from "react";

const SpendingRow = ({ transaction, rIndex }) => (
	<tr className="bg-white border-b" key={rIndex}>
		<td className="px-6 py-4 font-medium text-sm text-gray-500">
			{new Date(transaction.date).toLocaleDateString()}
		</td>
		<td className="px-6 py-4 font-medium text-sm text-left text-gray-500">
			{transaction.summary}
		</td>
		<td className="px-6 py-4 font-medium text-sm text-gray-500">
			{transaction.bucket[0].name}
		</td>
		<td className="px-6 py-4 font-medium text-sm text-gray-500">
			{transaction.amount}
		</td>
	</tr>
);

export default SpendingRow;
