import { useState, useEffect } from "react";
import type { FormEvent, ReactEventHandler, ChangeEvent } from "react";
import type { Transaction } from "../../types/transaction";
import { getUserBucketList } from "../../API/bucket.api";
import { addTransaction } from "../../API/transaction.api";
import { useApi } from "../../hooks/useAPI";
import { useNavigate } from "react-router-dom";

interface inputTransaction extends Partial<Omit<Transaction, "bucket">> {
  bucket: string;
}
interface iBucket {
  name: string;
  _id: string;
}
interface iAddFormViewProps {
  handleSubmit: (e: FormEvent<iAddForm>) => void;
  date: string;
  handleDateChange: ReactEventHandler;
  buckets: Array<iBucket>;
  value?: Transaction;
}
export const AddFormView = ({
  handleSubmit,
  date,
  handleDateChange,
  buckets,
  value,
}: iAddFormViewProps) => {
  const navigate = useNavigate();
  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="flex flex-col mb-4">
        <label htmlFor="spend-name" className="mb-1 text-grey text-left">
          Transaction Summary
        </label>
        <input
          name="spend-name"
          type="text"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50 "
          defaultValue={value !== undefined ? value.summary : ""}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="spend-amount" className="mb-1 text-grey text-left">
          Amount
        </label>
        <input
          name="spend-amount"
          type="number"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
          defaultValue={value !== undefined ? value.amount : 0}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="spend-date" className="mb-1 text-grey text-left">
          Date
        </label>
        <input
          name="spend-date"
          type="date"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
          value={
            value !== undefined
              ? new Date(value.date).toISOString().split("T")[0]
              : date
          }
          onChange={handleDateChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="spend-bucket" className="mb-1 text-grey text-left">
          Bucket
        </label>
        <select
          name="spend-bucket"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {buckets.map((bucket, index) => {
            if (value !== undefined && bucket._id === value.bucket.id) {
              return (
                <option
                  key={`bucket-${index}`}
                  value={bucket._id}
                  selected={true}
                >
                  {bucket.name}
                </option>
              );
            } else {
              return (
                <option key={`bucket-${index}`} value={bucket._id}>
                  {bucket.name}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="spend-note" className="mb-1 text-grey text-left">
          Additional details
        </label>
        <textarea
          name="spend-note"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div className="flex justify-around py-4">
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="block bg-red-400 hover:bg-red-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </form>
  );
};

interface iAddFormElements extends HTMLFormControlsCollection {
  ["spend-name"]: HTMLInputElement;
  ["spend-amount"]: HTMLInputElement;
  ["spend-date"]: HTMLInputElement;
  ["spend-bucket"]: HTMLInputElement;
}
interface iAddForm extends HTMLFormElement {
  readonly elements: iAddFormElements;
}
interface iAddFormProps {
  doneCb: () => void;
}
const AddForm = ({ doneCb }: iAddFormProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [bucketList, getBucketList] = useApi(getUserBucketList);
  const [addNewResponse, addNewTransaction] = useApi(addTransaction);

  useEffect(() => {
    getBucketList();
  }, []);

  useEffect(() => {
    if (addNewResponse.isSuccess) {
      doneCb();
    } else {
      console.log(addNewResponse.error);
    }
  });

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) =>
    setDate(e.target.value);

  const handleSubmit = (e: FormEvent<iAddForm>) => {
    e.preventDefault();
    const target = e.currentTarget.elements;
    const summary = target["spend-name"].value;
    const amount = parseFloat(target["spend-amount"].value);
    const date = new Date(target["spend-date"].value);
    const bucket = target["spend-bucket"].value;

    const transaction: inputTransaction = {
      summary,
      amount,
      date,
      bucket,
      currency: "USD",
      type: "CR",
    };
    addNewTransaction(transaction);
  };

  return (
    <>
      {bucketList.isFetching ? (
        <div>Loading ... </div>
      ) : (
        <AddFormView
          handleSubmit={handleSubmit}
          date={date}
          handleDateChange={handleDateChange}
          buckets={bucketList.data ?? []}
        />
      )}
    </>
  );
};

const AddPage = () => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="block w-full tex-center text-2xl font-bold text-grey-darkest mb-6">
          Add a Transaction
        </h1>
        <AddForm doneCb={handleDone} />
      </div>
    </div>
  );
};

export default AddPage;
