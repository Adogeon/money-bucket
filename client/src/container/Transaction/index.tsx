import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Transaction } from "../../types/transaction";
import { useApi } from "../../hooks/useAPI";
import { getTransactionDetail } from "../../API/transaction.api";

interface TransactionDetailViewProps {
  data: Transaction | null;
}
const TransactionDetailView = ({ data }: TransactionDetailViewProps) => {
  return (
    <div>
      <h1>Transaction Detail</h1>
      <p>
        <em>Summary:</em>
        <span>{data?.summary}</span>
      </p>
      <p>
        <em>Amount:</em>
        <span>{data?.amount}</span>
        <span>{data?.currency}</span>
      </p>
      <p>
        <em>Date:</em>
        <span>
          {data?.date.toLocaleString("default", {
            dateStyle: "full",
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </p>
    </div>
  );
};

const TransactionPage = () => {
  const { transactionId } = useParams();
  const [response, loadTransactionDetail, ignore] =
    useApi(getTransactionDetail);

  useEffect(() => {
    if (!ignore.current) {
      loadTransactionDetail(transactionId ?? "");
    }
    () => (ignore.current = true);
  }, [transactionId]);

  return (
    <div>
      {response.isFetching ? (
        <div>Loading ... </div>
      ) : (
        <TransactionDetailView data={response.data} />
      )}
    </div>
  );
};
