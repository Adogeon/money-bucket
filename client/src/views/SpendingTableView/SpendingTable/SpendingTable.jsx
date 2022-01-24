import React from "react";

const SpendingTable = ({ data }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Summary</th>
          <th>Bucket</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction, index) => (
          <tr key={index}>
            <td>{transaction.date}</td>
            <td>{transaction.summary}</td>
            <td>{transaction.bucket}</td>
            <td>{transaction.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SpendingTable;
