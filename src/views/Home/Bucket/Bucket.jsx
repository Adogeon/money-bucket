import React from "react";

const Bucket = ({ name, spend, limit, ...restProps }) => {
  const bucketStatus = (1 - spend / limit) * 100;

  return (
    <div
      className={"w-full flex flex-col justify-between px-5 py-2 "}
      {...restProps}
    >
      <div className={"flex flex-row justify-between"}>
        <div className={"font-semibold"}>{name}</div>
        <div className={"flex flex-col"}>
          <p className={"text-sm font-semibold"}>{spend}</p>
          <p className={"text-xs font-light text-gray-400"}>{limit}</p>
        </div>
      </div>

      <div className={"w-full bg-gray-200 h-2 mb-6"}>
        <div
          className={"bg-blue-600 h-2"}
          style={{ width: `${bucketStatus}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Bucket;
