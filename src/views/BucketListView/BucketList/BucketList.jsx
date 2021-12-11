import React, { useEffect, useState } from "react";
import Bucket from "../Bucket/Bucket";
import { getUserBucket } from "../../../API/Bucket/bucket.api";

const BucketView = () => {
  const [buckets, setBuckets] = useState([]);

  const fetchData = async () => {
    const data = await getUserBucket();
    setBuckets(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={"w-full flex"}>
      {buckets.map((bucket, index) => (
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
