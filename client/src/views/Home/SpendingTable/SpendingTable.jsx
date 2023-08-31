import React, { useEffect } from "react";
import SpendingRow from "./SpendingRow";
import { fetchUserLoginToken } from "../../../API/auth/auth.api";
import { loadUserBucket } from "../../../state/HomePage/Home.action";
import { getUserBucket } from "../../../API/Bucket/bucket.api";
import { getCurrentMonthTransactions } from "../../../API/transaction/transaction.api";
import {
	useHomeDispatch,
	useHomeState,
} from "../../../state/HomePage/Home.context";

const SpendingTable = () => {
	const homeStore = useHomeState();
	const homeDispatch = useHomeDispatch();

	const loadData = async () => {
		console.log(await fetch("/api"));
		const userToken = await fetchUserLoginToken("thomas", "12345");
		console.log(userToken);
		const transaction = await getCurrentMonthTransactions(2, userToken);
		console.log(transaction);
	};

	useEffect(() => {
		loadData();
	});

	const data = [
		{
			date: "02/12/21",
			summary: "Video games",
			amount: "30",
			bucket: "Media",
		},
		{
			date: "02/15/21",
			summary: "Streaming service",
			amount: "10",
			bucket: "Media",
		},
		{
			date: "02/12/21",
			summary: "Grocery",
			amount: "50",
			bucket: "Essential",
		},
		{
			date: "02/14/21",
			summary: "Socks",
			amount: "40",
			bucket: "Clothing",
		},
	];

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
