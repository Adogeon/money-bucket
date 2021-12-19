import React, { useEffect, useState } from "react";
import Bucket from "../Bucket/Bucket";
import {
  useHomeDispatch,
  useHomeState,
} from "../../../context/HomePage/Home.Context";
import { loadUserBucket } from "../../../context/HomePage/Home.action";

const BucketView = () => {
  const state = useHomeState();
  const dispatch = useHomeDispatch();

  useEffect(() => {
    console.log(dispatch);
    dispatch(loadUserBucket("123"));
  }, []);

  return (
    <div className={"flex flex-col w-72 bg-white shadow-md "}>
      {state.bucketList.map((bucket, index) => (
        <Bucket
          key={index}
          name={bucket.name}
          spend={bucket.spend}
          limit={bucket.limit}
          data-testid={`bucket-${index}`}
        />
      ))}
    </div>
  );
};

export default BucketView;
