import { useState, useEffect } from "react";
import type { FormEvent, ReactEventHandler, ChangeEvent } from "react";
import type { Transaction } from "../../types/transaction";
import { getUserBucketList } from "../../API/bucket.api";
import { useApi } from "../../hooks/useAPI";

interface inputTransaction extends Omit<Transaction, "bucket"> {
  bucket: string;
}

interface iBucket {
  name: string;
  id: string;
}
interface iAddFormViewProps {
  handleSubmit: (e: FormEvent<iAddForm>) => void;
  date: string;
  handleDateChange: ReactEventHandler;
  buckets: Array<iBucket>;
}

const AddFormView = ({
  handleSubmit,
  date,
  handleDateChange,
  buckets,
}: iAddFormViewProps) => {
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
          value={date}
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
          {buckets.map((bucket, index) => (
            <option key={`bucket-${index}`} value={bucket.id}>
              {bucket.name}
            </option>
          ))}
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
      <button
        type="submit"
        className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
      >
        Save
      </button>
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
  submitNewTransaction: (transaction: inputTransaction) => void;
}
const AddForm = ({ submitNewTransaction }: iAddFormProps) => {
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [bucketList, getBucketList] = useApi(getUserBucketList);

  useEffect(() => {
    getBucketList();
  }, []);

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
    submitNewTransaction(transaction);
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
          buckets={bucketList.data}
        />
      )}
    </>
  );
};

const AddPage = () => {};

export default AddPage;
