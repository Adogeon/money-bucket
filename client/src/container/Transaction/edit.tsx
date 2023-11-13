import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useApi } from "../../hooks/useAPI";
import { useNavigate, useParams } from "react-router-dom";
import { getUserBucketList } from "../../API/bucket.api";
import {
  getTransactionDetail,
  postTransactionEdit,
} from "../../API/transaction.api";
import { AddFormView } from "./addNew";
import type { iEditTransactionInput } from "../../types/transaction";

interface iAddFormElements extends HTMLFormControlsCollection {
  ["spend-name"]: HTMLInputElement;
  ["spend-amount"]: HTMLInputElement;
  ["spend-date"]: HTMLInputElement;
  ["spend-bucket"]: HTMLInputElement;
}
interface iEditForm extends HTMLFormElement {
  readonly elements: iAddFormElements;
}
interface iEditFormProps {
  transactionId: string;
  doneCb: () => void;
}
const EditForm = ({ doneCb, transactionId }: iEditFormProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [bucketList, getBucketList] = useApi(getUserBucketList);
  const [data, loadTransactionData] = useApi(getTransactionDetail);
  const [updateResponse, updateTransaction] = useApi(postTransactionEdit);

  useEffect(() => {
    getBucketList();
    loadTransactionData(transactionId);
  }, []);

  useEffect(() => {
    if (updateResponse.isSuccess) {
      doneCb();
    } else {
      console.log(updateResponse.error);
    }
  }, [updateResponse]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);

  const handleSubmit = (e: FormEvent<iEditForm>) => {
    e.preventDefault();
    const target = e.currentTarget.elements;
    const summary = target["spend-name"].value;
    const amount = parseFloat(target["spend-amount"].value);
    const date = new Date(target["spend-date"].value);
    const bucket = target["spend-bucket"].value;

    const transaction: Partial<iEditTransactionInput> = {
      summary,
      amount,
      date,
      bucket,
      currency: "USD",
      type: "CR",
    };
    updateTransaction(transactionId, transaction);
  };

  return (
    <>
      {bucketList.isFetching || data.isFetching ? (
        <div>Loading ... </div>
      ) : (
        <AddFormView
          handleSubmit={handleSubmit}
          date={date}
          handleDateChange={handleDateChange}
          buckets={bucketList.data ?? []}
          value={data.data ?? undefined}
        />
      )}
    </>
  );
};

const EditPage = () => {
  const navigate = useNavigate();
  const { transactionId } = useParams();

  const handleDone = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="block w-full tex-center text-2xl font-bold text-grey-darkest mb-6">
          Add a Transaction
        </h1>
        <EditForm doneCb={handleDone} transactionId={transactionId ?? ""} />
      </div>
    </div>
  );
};

export default EditPage;
