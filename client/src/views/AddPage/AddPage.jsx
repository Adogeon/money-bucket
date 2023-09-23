import React from "react";
import AddForm from "./AddForm";
import { useNavigate } from "react-router-dom";
import { addTransaction } from "../../API/transaction/transaction.api";
import { useAuthState } from "../../state/Auth/auth.context";

const AddPage = () => {
	const navigate = useNavigate();
	const authState = useAuthState();
	console.log(authState);

	const handleSubmit = (e) => {
		e.preventDefault();
		const name = e.target["spend-name"].value;
		const amount = e.target["spend-amount"].value;
		const date =  new Date(e.target["spend-date"].value).toISOString();
		const bucket = e.target["spend-bucket"].value;
		const note = e.target["spend-note"].value;

		const transaction = {
			name,
			amount,
			date,
			bucket,
			note,
			type: "CR",
		};
		addTransaction(transaction, authState.userToken)
		navigate("/", { replace: true });
	};

	return (
		<div className="flex items-center h-screen w-full">
			<div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
				<h1 className="block w-full text-center text-2xl font-bold text-grey-darkest mb-6">
					Add a Transaction
				</h1>
				<AddForm
					handleSubmit={handleSubmit}
					buckets={["Food", "Game"]}
				/>
			</div>
		</div>
	);
};

export default AddPage;
