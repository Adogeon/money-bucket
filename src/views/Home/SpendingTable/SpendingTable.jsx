import React from "react";

const SpendingTable = () => {
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
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Date
          </th>
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Summary
          </th>
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Bucket
          </th>
          <th scope="col" className="text-sm font-medium text-white px-6 py-4">
            Amount
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction, index) => (
          <tr className="bg-white border-b" key={index}>
            <td className="px-6 py-4 font-medium text-sm text-gray-500">
              {transaction.date}
            </td>
            <td className="px-6 py-4 font-medium text-sm text-left text-gray-500">
              {transaction.summary}
            </td>
            <td className="px-6 py-4 font-medium text-sm text-gray-500">
              {transaction.bucket}
            </td>
            <td className="px-6 py-4 font-medium text-sm text-gray-500">
              {transaction.amount}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpendingTable;
