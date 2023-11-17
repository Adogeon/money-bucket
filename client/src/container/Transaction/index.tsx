import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Transaction } from "../../types/transaction";
import { useApi } from "../../hooks/useAPI";
import {
  deleteTransaction,
  getTransactionDetail,
} from "../../API/transaction.api";

interface TransactionDetailViewProps {
  data: Transaction;
  handleEdit: VoidFunction;
  handleDelete: VoidFunction;
}
const TransactionDetailView = ({
  data,
  handleEdit,
  handleDelete,
}: TransactionDetailViewProps) => {
  return (
    <div className="mb-4">
      <section className="flex flex-col mb-4">
        <h1 className="text-grey text-left text-sm font-mono">Summary:</h1>
        <p className="font-medium text-2xl text-gray-500">{data?.summary}</p>
      </section>
      <section className="flex flex-col mb-4">
        <h1 className="text-grey text-left text-sm font-mono">Bucket:</h1>
        <p className="font-medium text-2xl text-gray-500">
          {data?.bucket.name}
        </p>
      </section>
      <section className="flex flex-col mb-4">
        <h1 className="text-grey text-left text-sm font-mono">Amount:</h1>
        <p className="font-medium text-2xl text-gray-500">{`${data?.amount} ${data?.currency}`}</p>
      </section>
      <section className="flex flex-col mb-4">
        <h1 className="text-grey text-left text-sm font-mono">Date:</h1>
        <p className="font-medium text-xl text-gray-500">
          {new Date(data.date).toLocaleString("default", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </section>
      <section className="flex justify-between px-4 py-2">
        <button
          className="block bg-blue-400 hover:bg-blue-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="block bg-red-400 hover:bg-red-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
          onClick={handleDelete}
        >
          Delete
        </button>
      </section>
    </div>
  );
};

const TransactionPlaceHolder = {
  id: "0000000",
  type: "ERROR",
  bucket: { name: "EROR BUCKET", id: "1111111" },
  summary: "This transaction doesn't exist",
  date: new Date(),
  amount: 0,
  currency: "NUY",
};

const TransactionPage = () => {
  const { transactionId } = useParams();
  const [response, loadTransactionDetail, dataIgnore] =
    useApi(getTransactionDetail);

  const [deleteResponse, sendDeleteTransaction] = useApi(deleteTransaction);

  const navigate = useNavigate();

  useEffect(() => {
    if (!dataIgnore.current) {
      loadTransactionDetail(transactionId ?? "");
    }
    () => (dataIgnore.current = true);
  }, [transactionId]);

  useEffect(() => {
    if (deleteResponse.isSuccess) {
      navigate(-1);
    }
  }, [deleteResponse]);

  const handleEdit = () => {
    navigate(`/transaction/edit/${transactionId}`);
  };

  const handleDelete = () => {
    sendDeleteTransaction(transactionId ?? "");
  };

  return (
    <div className="flex items-center w-full h-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        {response.isFetching ? (
          <div>Loading ... </div>
        ) : (
          <TransactionDetailView
            data={response.data ?? TransactionPlaceHolder}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionPage;
