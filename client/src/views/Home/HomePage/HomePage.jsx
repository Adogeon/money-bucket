import React from "react";
import BucketList from "../BucketList/BucketList";
import SpendingTable from "../SpendingTable/SpendingTable";
import HomeProvider from "../../../state/HomePage/Home.provider";
import Appbar from "../Appbar/Appbar";

const HomePage = (data) => {
	return (
		<HomeProvider>
			<Appbar />
			<div className="container mx-auto flex flex-col">
				<div className="w-full flex justify-between space-x-5">
					<BucketList />
					<div className={"w-4/5"}>
						<span>Welcome</span>
						<div className="w-full flex justify-center">
							<button>{"<"}</button>
							<div>currentMonth</div>
							<button>{">"}</button>
						</div>
						<SpendingTable />
					</div>
				</div>
			</div>
		</HomeProvider>
	);
};

export default HomePage;
