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
    <div className=" mx-auto border-2 flex flex-col gap-y-4 max-w-sm items-center text-2xl">
      <section>{data?.summary}</section>
      <p className="flex flex-col text-7xl items-center font-mono font-semibold">
        <span>{data?.amount}</span>
        <span className="text-3xl">{data?.currency}</span>
      </p>
      <p>
        {new Date(data.date).toLocaleString("default", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>
      <section className="flex justify-between px-4 py-2">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
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
    <div className="flex items-center h-screen w-full">
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
