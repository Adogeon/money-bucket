import React from 'react';

const SpendingTableView = ({data}) => {
    return (
    <table className="w-full text-center shadow-md">
			<thead className="border-b bg-gray-800">
				<tr>
					<th
						scope="col"
						className="text-sm font-medium text-white px-6 py-4">
						Date
					</th>
					<th
						scope="col"
						className="text-sm font-medium text-white px-6 py-4">
						Summary
					</th>
					<th
						scope="col"
						className="text-sm font-medium text-white px-6 py-4">
						Bucket
					</th>
					<th
						scope="col"
						className="text-sm font-medium text-white px-6 py-4">
						Amount
					</th>
				</tr>
			</thead>
			<tbody>
				{data.map((transaction, index) => (
					<SpendingRow transaction={transaction} rIndex={index} />
				))}
			</tbody>
		</table>)
}

export default SpendingTableView;