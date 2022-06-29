import React from "react"

type bInfo = {
  name: string,
  desc: string
}

const BucketInfoSec: React.FC<bInfo> = ({name, desc}) => (
   <section className="pb-10">
      <h2 className="text-4xl font-bold">{name}</h2>
      <div className="text-lg font-semibold text-gray-500">{desc}</div>
    </section>
)

export default BucketInfoSec