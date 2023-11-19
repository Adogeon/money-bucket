import type { FormEvent } from "react";
import type {
  iTransactionDisplay,
  iTransactionUpdate,
} from "../../types/transaction";

import TransactionFormView from "./TransactionFormView";
import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useAPI";
import { getUserBucketList } from "../../API/bucket.api";

interface iTransactionFormElements extends HTMLFormControlsCollection {
  ["spend-name"]: HTMLInputElement;
  ["spend-amount"]: HTMLInputElement;
  ["spend-date"]: HTMLInputElement;
  ["spend-bucket"]: HTMLInputElement;
}

export interface iTransactionForm extends HTMLFormElement {
  readonly elements: iTransactionFormElements;
}

interface iTransactionFormProps {
  apiCallBack: (transaction: iTransactionUpdate) => void;
  navigateBack: VoidFunction;
  oldValue?: iTransactionDisplay;
}

const defaultTransactionUpdate = {
  id: "111",
  summary: "",
  amount: 0.0,
  date: new Date(),
  bucket: { name: "None", id: "444" },
  currency: "USD",
  type: "CR",
};

const TransactionForm = ({
  apiCallBack,
  navigateBack,
  oldValue = defaultTransactionUpdate,
}: iTransactionFormProps) => {
  const [userBucket, getBucketList] = useApi(getUserBucketList);
  const [transaction, setTransaction] = useState<iTransactionDisplay>(oldValue);

  useEffect(() => {
    setTransaction(oldValue);
  }, [oldValue]);

  useEffect(() => {
    getBucketList();
  }, []);

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.currentTarget;
    switch (target.name) {
      case "spend-summary":
        setTransaction({ ...transaction, summary: target.value });
        break;
      case "spend-amount":
        setTransaction({ ...transaction, amount: parseFloat(target.value) });
        break;
      case "spend-date":
        setTransaction({ ...transaction, date: new Date(target.value) });
        break;
      case "spend-bucket":
        setTransaction({
          ...transaction,
          bucket: { id: target.value, name: "updated" },
        });
        break;
      default:
    }
  };

  const onFormSubmit = (e: FormEvent<iTransactionForm>) => {
    e.preventDefault();
    const transactionUpdate: iTransactionUpdate = {
      summary: transaction.summary,
      amount: transaction.amount,
      date: transaction.date,
      bucket: transaction.bucket.id,
      currency: "USD",
      type: "CR",
    };
    //TODO: add validator

    apiCallBack(transactionUpdate);
  };

  const onFormCancel = () => {
    navigateBack();
  };

  return (
    <>
      {userBucket.isFetching ? (
        <div>Loading...</div>
      ) : (
        <TransactionFormView
          handleSubmit={onFormSubmit}
          handleBack={onFormCancel}
          handleValueChange={handleChange}
          buckets={userBucket.data ?? []}
          value={transaction}
        />
      )}
    </>
  );
};

export default TransactionForm;
