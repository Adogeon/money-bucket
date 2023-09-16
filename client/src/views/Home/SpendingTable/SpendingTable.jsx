import React, { useEffect, useState } from "react";
import SpendingRow from "./SpendingRow";
import { fetchUserLoginToken } from "../../../API/auth/auth.api";
import { getMonthTransactions } from "../../../API/transaction/transaction.api";
import {
	useHomeDispatch,
	useHomeState,
} from "../../../state/HomePage/Home.context";
import { useAuthToken } from "../../../state/Auth/auth.context";

const SpendingTable = ({ userToken }) => {
	const homeStore = useHomeState();
	const homeDispatch = useHomeDispatch();
	// TODO: add action to fetch month transaction

	const [data, setData] = useState([]);
	const [month, setMonth] = useState("022023");

	const loadData = async () => {
		//const userToken = await fetchUserLoginToken("thomas", "12345");

		const transactions = await getMonthTransactions(userToken, month);

		setData(transactions);
	};

	useEffect(() => {
		loadData();
	}, [month]);

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
		</table>
	);
};

export default SpendingTable;
