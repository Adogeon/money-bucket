import type { FormEvent } from "react";
import type { iTransactionDisplay } from "../../types/transaction";
import type { iBucketBase } from "../../types/bucket";
import type { iTransactionForm } from "./TransactionFormContainer";

interface iTransactionFormViewProps {
  handleSubmit: (e: FormEvent<iTransactionForm>) => void;
  handleBack: VoidFunction;
  handleValueChange: (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  buckets: Array<iBucketBase>;
  value: iTransactionDisplay | undefined;
}

export const TransactionFormView = ({
  handleSubmit,
  handleValueChange,
  handleBack,
  buckets,
  value,
}: iTransactionFormViewProps) => {
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
          value={value ? value.summary : ""}
          onChange={handleValueChange}
          placeholder="What is the transaction for ?"
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
          value={value ? value.amount : 0}
          onChange={handleValueChange}
          placeholder="How much is the transaction ?"
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
            value
              ? converDateToStrVal(value.date)
              : converDateToStrVal(new Date())
          }
          onChange={handleValueChange}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="spend-bucket" className="mb-1 text-grey text-left">
          Bucket
        </label>
        <select
          name="spend-bucket"
          value={value?.bucket.id ?? buckets[0].id}
          onChange={handleValueChange}
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
