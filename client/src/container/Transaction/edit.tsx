import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useAPI";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTransactionDetail,
  putTransactionEdit,
} from "../../API/transaction.api";

import TransactionForm from "../../components/Form/TransactionFormContainer";

const EditPage = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();
  const [data, loadTransactionData] = useApi(getTransactionDetail);
  const [updateResponse, updateTransaction] = useApi(putTransactionEdit);

  useEffect(() => {
    if (updateResponse.isSuccess) {
      navigate("/", { replace: true });
    }
  }, [updateResponse]);

  useEffect(() => {
    loadTransactionData(transactionId ?? "");
  }, []);

  useEffect(() => {
    if (data.isSuccess) {
    }
  }, [data]);

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="block w-full tex-center text-2xl font-bold text-grey-darkest mb-6">
          Edit Transaction
        </h1>
        <TransactionForm
          apiCallBack={(transaction) => {
            if (transactionId === undefined) {
              navigate("/error");
            } else {
              updateTransaction(transactionId, transaction);
            }
          }}
          navigateBack={() => navigate(-1)}
          oldValue={data.data}
        />
      </div>
    </div>
  );
};

export default EditPage;
