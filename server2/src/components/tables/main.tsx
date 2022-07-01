import React, { FC, ReactNode } from "react";

type Props = {
  headers: string[],
  children?: ReactNode
}

const MainTable: FC<Props> = ({headers, children})=>(
  <table className='min-w-full'>
    <thead className="border-b">
      <tr>
      {headers.map((header)=> (
        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-2 text-left">{header.toLocaleUpperCase()}</th>
      ))}
      </tr>
    </thead>
    <tbody>
      {children}
    </tbody>
  </table>
)

export default MainTable;