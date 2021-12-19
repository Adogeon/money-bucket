import React from "react";
import BucketList from "../BucketList/BucketList";
import SpendingTable from "../SpendingTable/SpendingTable";

const HomePage = (data) => {
  return (
    <>
      <div className="w-screen flex border-b py-5 px-3 bg-gray-800 text-white justify-end space-x-3 mb-5">
        <button className="text-sm">Add a transaction</button>
        <button className="text-sm">Fill buckets</button>
      </div>
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
    </>
  );
};

export default HomePage;
