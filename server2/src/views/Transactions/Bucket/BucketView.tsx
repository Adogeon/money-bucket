import React from "react";
import BucketInfoSec from "./BucketInfoSec";
import BucketTransactionSec from "./BucketTransactionSec/BucketTransactionSec";
const data = {
  bId: 3,
  name: "Media",
  desc: "For entertainment need",
  spend: 40,
  limit: 50,
}

const fetchBucketInfo = () => Promise.resolve(data);

interface bInfo {
  bId: number;
  name: string;
  desc: string;
  spend: number;
  limit: number;
}

type bInfoState = bInfo | null

const BucketView = () => {
    const [bucketInfo, setBucketInfo] = React.useState<bInfoState>(null);
    
    const fetchData = async () => {
      const data = await fetchBucketInfo();
      setBucketInfo(data);
    }

    React.useEffect(() => {
      fetchData()
    })
    return (
      <div className="md:container mx-auto px-4 py-4 md:shadow-md">
        {
          bucketInfo === null ? (
            <>
              Loading...
            </>
          ) : (
            <>
              <BucketInfoSec name={bucketInfo.name} desc={bucketInfo.desc}/>
              <BucketTransactionSec bucketId={bucketInfo.bId}/>
            </>
          )
        }
      </div>
    )
  }

export default BucketView