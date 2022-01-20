import React from "react";

const AddForm = ({ handleSubmit, buckets }) => (
  <form onSubmit={handleSubmit} className="mb-4">
    <div className="flex flex-col mb-4">
      <label htmlFor="spend-name" className="mb-1 text-grey text-left">
        Transaction Name
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
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
      />
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="spend-bucket" className="mb-1 text-grey text-left">
        Bucket
      </label>
      <select
        name="spend-bucket"
        type="date"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
      >
        {buckets.map((bucket) => (
          <option>{bucket}</option>
        ))}
      </select>
    </div>
    <div className="flex flex-col mb-4">
      <label htmlFor="spend-note" className="mb-1 text-grey text-left">
        Additional details
      </label>
      <textarea
        name="spend-note"
        class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring-indigo-200 focus:ring-opacity-50"
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

export default AddForm;
