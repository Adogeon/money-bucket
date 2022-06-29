import React, { FC, ReactNode } from "react";

type Props = {
  headers: string[],
  children?: ReactNode
}

const MainTable: FC<Props> = ({headers, children})=>(
  <table className='min-w-full'>
    <thead className="border-b">
      {headers.map((header)=> (
        <td scope="col" className="text-sm font-medium text-gray-900 px-6 py-2 text-left">{header.toLocaleUpperCase()}</td>
      ))}
    </thead>
    {children}
  </table>
)

export default MainTable;