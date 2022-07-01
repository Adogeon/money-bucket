import React, { useState } from 'react';
import FilterBar from './FilterBar';
import TransactionTable from './TransactionTable';

interface transaction {
  date: string;
  summary: string;
  amount: number
}

const FilterableTransactionTable:React.FC<{transactions: transaction[]}> = ({transactions}) => {
  const [filterTerm, setFilterTerm] = React.useState('');
  const [filteredData, setFilteredData] = React.useState<transaction[]>(transactions);

  const updateTerm = (input:string) => {
    setFilterTerm(input)
  }

  React.useEffect(() => {
    if(filterTerm !== '') {
      setFilteredData(transactions.filter((transaction) => transaction.summary.toLowerCase().includes(filterTerm.toLowerCase())))
    } else {
      setFilteredData(transactions);
    }
  },[filterTerm, transactions])

  return (
    <section className="flex flex-col">
      <FilterBar handleUpdate={updateTerm}/>
      <TransactionTable transactions={filteredData}/>
    </section>
  )
}

export default FilterableTransactionTable;