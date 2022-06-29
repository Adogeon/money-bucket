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
  const [filteredData, setFilteredData] = React.useState<transaction[]>([]);

  const updateTerm = (input:string) => {
    setFilterTerm(input)
  }

  React.useEffect(() => {
    if(filterTerm !== '') {
      setFilteredData(transactions.filter((transaction) => transaction.summary.includes(filterTerm)))
    } else {
      setFilteredData(transactions);
    }
  },[filterTerm])

  return (
    <section className="flex flex-col">
      <FilterBar handleUpdate={updateTerm}/>
      <TransactionTable transactions={filteredData}/>
    </section>
  )
}

export default FilterableTransactionTable;