import React, { useEffect, useState } from "react";
import Bucket from "../Bucket/Bucket";
import {
	useHomeDispatch,
	useHomeState,
} from "../../../state/HomePage/Home.context";
import { loadUserBucket } from "../../../state/HomePage/Home.action";

const BucketView = () => {
	const state = useHomeState();
	const dispatch = useHomeDispatch();

	useEffect(() => {
		dispatch(loadUserBucket("123"));
	}, []);

	return (
		<div className={"flex flex-col w-72 bg-white shadow-md "}>
			<div className="flex justify-between px-5">
				<p>Income</p>
				<p>{state.income}</p>
			</div>
			{state.bucketList.map((bucket, index) => (
				<Bucket
					key={index}
					name={bucket.name}
					spend={bucket.spend}
					limit={bucket.limit}
					data-testid={`bucket-${index}`}
				/>
			))}
			<div className="flex justify-between px-5">
				<p>Leftover</p>
				<p>{state.leftover}</p>
			</div>
		</div>
	);
};

export default BucketView;
