import React, { useState, useEffect } from "react";

import { Bucket } from "../../components";

const FillPage = () => {
  const buckets = [
    { id: 1, name: "Essential", spend: 60, limit: 100 },
    { id: 2, name: "Food", spend: 20, limit: 200 },
    { id: 3, name: "Media", spend: 40, limit: 50 },
  ];

  const [availFund, setAvailFund] = useState(0);
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    setAvailFund(500);
    let amountOjb = new Object();
    buckets.forEach((bucket) => {
      amountOjb[bucket.name] = 0;
    });
    setAmounts(amountOjb);
  }, []);

  const handleSave = (e) => {
    e.preventDefault;
    const todayDateString = new Date().toLocaleDateString();
    const transactions = buckets.map((bucket) => ({
      name: "Filling up",
      bucket: bucket.name,
      type: "DE",
      amount: amounts[bucket.name],
      date: new Date(todayDateString).toISOString(),
    }));

    console.log(transactions);
  };

  const handleChange = (e) => {
    const amountsCopy = { ...amounts };
    amountsCopy[e.target.name] = parseInt(e.target.value);
    console.log(amountsCopy);
    setAmounts(amountsCopy);
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="block w-full text-center text-2xl font-bold text-grey-darkest mb-6">
          Fill your bucket
        </h1>
        <div className="flex mb-4 justify-between">
          <p className="text-grey">Available Fund</p>
          <p className="text-green-400">{availFund}</p>
        </div>
        {buckets.map((bucket) => (
          <div className="flex mb-4 justify-between">
            <Bucket
              name={bucket.name}
              spend={bucket.spend}
              limit={bucket.limit}
              fill={amounts[bucket.name]}
              className="w-1/2"
            />
            <input
              type="number"
              name={bucket.name}
              placeholder="0.0"
              step="0.01"
              min="0"
              max={bucket.spend}
              value={amounts[bucket.name]}
              onChange={handleChange}
              className="text-right w-1/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
        ))}
        <button
          onClick={handleSave}
          className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FillPage;
