import { useState } from "react";
import MonthPicker from "../../components/Table/MonthPicker";
import UserBucketList from "./UserBucketList";
import RecentSpendingTable from "./RecentSpendingTable";

const HomePage = () => {
  const [month, setMonth] = useState(new Date());
  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
  };

  return (
    <div className="w-full flex flex-col justify-center">
      <MonthPicker month={month} onMonthChange={handleMonthChange} />
      <div className="flex flex-col md:flex-row justify-evenly">
        <div className="lg:w-1/4">
          <UserBucketList month={month} />
        </div>
        <div className="lg:w-2/3">
          <RecentSpendingTable month={month} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
