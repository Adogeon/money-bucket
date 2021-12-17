import React from "react";
import BucketList from "../BucketList/BucketList";

const HomePage = (data) => {
  return (
    <main>
      <div>
        <button>{"<"}</button>
        <div>currentMonth</div>
        <button>{">"}</button>
      </div>
      <div>
        <div>Balance</div>
        <div></div>
      </div>
    </main>
  );
};

export default HomePage;
