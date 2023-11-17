import type { FormEvent, ReactEventHandler } from "react";
import type { iTransactionUpdate } from "../../types/transaction";
import type { iBucketBase } from "../../types/bucket";

interface iTransactionFormElements extends HTMLFormControlsCollection {
  ["spend-name"]: HTMLInputElement;
  ["spend-amount"]: HTMLInputElement;
  ["spend-date"]: HTMLInputElement;
  ["spend-bucket"]: HTMLInputElement;
}

interface iTransactionForm extends HTMLFormElement {
  readonly elements: iTransactionFormElements;
}

interface iTransactionFormViewProps {
  handleSubmit: (e: FormEvent<iTransactionForm>) => void;
  handleBack: VoidFunction;
  handleDateChange: ReactEventHandler;
  buckets: Array<iBucketBase>;
  value?: iTransactionUpdate;
}

export const TransactionFormView = ({
  handleSubmit,
  handleDateChange,
  handleBack,
  buckets,
  value,
}: iTransactionFormViewProps) => {
  let valueBucketIndex = 0;
  if (value !== undefined) {
    valueBucketIndex = buckets.findIndex(
      (bucket) => bucket.id === value.bucket
    );
  }

  const converDateToStrVal = (date: Date) =>
    new Date(date).toISOString().split("T")[0];

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
          step="0.01"
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
          defaultValue={
            value !== undefined
              ? converDateToStrVal(value.date)
              : converDateToStrVal(new Date())
          }
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="spend-bucket" className="mb-1 text-grey text-left">
          Bucket
        </label>
        <select
          name="spend-bucket"
          defaultValue={buckets[valueBucketIndex].id}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {buckets.map((bucket, index) => {
            return (
              <option key={`bucket-${index}`} value={bucket.id}>
                {bucket.name}
              </option>
            );
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
            handleBack();
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

export default TransactionFormView;
