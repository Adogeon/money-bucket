import React from "react";
import MonthPicker from "./MonthPicker";
import MonthlyTransactionView from "./MonthlyTransactionView";

interface transaction {
  date: string;
  summary: string;
  amount: number
}

const data = {transactions: [
    { date: "02/12/21", summary: "Video games", amount: 30 },
    { date: "02/15/21", summary: "Streaming service", amount: 10 },
  ]}

const fetchTransactionData = () => Promise.resolve(data)

const BucketTransactionSec:React.FC<{bucketId: number}> = ({bucketId}) => {
  const [transactions, setTransactions] = React.useState<transaction[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactionData();
      setTransactions(data.transactions)
    }
  })

  return (
    <section>
      <MonthPicker />
      <MonthlyTransactionView data={transactions}/>
    </section>
  )
}

export default BucketTransactionSec;