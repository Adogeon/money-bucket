import React from "react"
import SpendingChart from "./SpendingChart"
import FilterableTransactionTable from "./FilterableTransactionTable"

interface transaction {
  date: string;
  summary: string;
  amount: number
}

const MonthlyTransactionView:React.FC<{data:transaction[]}> = ({data}) => {
  return (
    <section className="flex flex-col">
      <SpendingChart />
      <FilterableTransactionTable transactions={data}/>
    </section>
  )
}

export default MonthlyTransactionView

