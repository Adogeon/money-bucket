import React, { useState, useEffect } from "react";
import { getBucketDetail } from "../../../API/Bucket/bucket.api";
//This component will display the bucket detail

const BucketDetail = ({ bucketId }) => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  //fetchdata via useEffect
  useEffect(() => {
    const fetchData = async () => {
      const bucketDetail = await getBucketDetail(bucketId);
      setData(bucketDetail);
      setLoading(false);
    };
    fetchData();
  }, []);

  return loading ? (
    <div>Loading detail ...</div>
  ) : (
    <div>
      <div>
        <div>
          <h2>{data.name}</h2>
          <button>Edit</button>
        </div>
        <div>
          <p>{`Description: ${data.desc}`}</p>
          <p>{`Spent: ${data.spend}`}</p>
          <p>{`Limit: ${data.limit}`}</p>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Summary</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.history.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.date}</td>
                <td>{transaction.summary}</td>
                <td>{transaction.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BucketDetail;
