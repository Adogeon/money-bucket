import React from "react";

const Bucket = ({ name, spend, limit, ...restProps }) => {
  return (
    <div
      className={
        "w-5 h-5 flex flex-column justify-center border border-blue-200 divide-y divide-blue-200"
      }
      {...restProps}
    >
      <div>
        <p>{spend}</p>
        <span> / </span>
        <p>{limit}</p>
      </div>
      <div>{name}</div>
    </div>
  );
};

export default Bucket;
