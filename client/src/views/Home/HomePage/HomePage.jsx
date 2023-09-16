import React, { useEffect } from "react";
import BucketList from "../BucketList/BucketList";
import SpendingTable from "../SpendingTable/SpendingTable";
import HomeProvider from "../../../state/HomePage/Home.provider";
import {
	useAuthDispatch,
	useAuthToken,
} from "../../../state/Auth/auth.context";
import { loginUser } from "../../../state/Auth/auth.action";

const HomePage = (data) => {
	const userToken = useAuthToken();
	const testAuthDispatch = useAuthDispatch();

	useEffect(() => {
		testAuthDispatch(loginUser("thomas", "12345"));
	}, []);

	return (
		<HomeProvider>
			<div className="container mx-auto flex flex-col">
				<div className="w-full flex justify-between space-x-5">
					<BucketList userToken={userToken} />
					<div className={"w-4/5"}>
						<span>Welcome</span>
						<div className="w-full flex justify-center">
							<button>{"<"}</button>
							<div>currentMonth</div>
							<button>{">"}</button>
						</div>
						<SpendingTable userToken={userToken} />
					</div>
				</div>
			</div>
		</HomeProvider>
	);
};

export default HomePage;
