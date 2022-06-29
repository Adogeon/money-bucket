import React from 'react';
import MainTable from '../../../../components/tables/main';

interface transaction {
  date: string;
  summary: string;
  amount: number
}

type tTableProps =  {transactions: transaction[]}

const TransactionTable: React.FC<tTableProps> = ({transactions}) => (
   <MainTable headers={['date', 'summary', 'amount']}>
      {transactions.map((transaction,index) => {
        return (
          <tr className='border-b' key={index}>
            <td className="px-6 py-4 white-space-nowrap text-sm font-medium font-light text-gray-900">{transaction.date}</td>
            <td className="px-6 py-4 white-space-nowrap text-sm font-medium font-light text-gray-900">{transaction.summary}</td>
            <td className="px-6 py-4 white-space-nowrap text-sm font-medium font-light text-gray-900">{transaction.amount}</td>
          </tr>
        )
      })}
  </MainTable>
)

export default TransactionTable