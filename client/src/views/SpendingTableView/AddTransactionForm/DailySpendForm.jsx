import React, { useState } from "react";

const SpendForm = ({ presetValue, handleFormSubmit }) => {
  const fields = {
    date: "",
    summary: "",
    amount: "",
    bucket: "",
  };

  const [values, setValues] = useState({ ...fields, ...presetValue });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label for="date">Date</label>
        <input
          type="date"
          name="date"
          value={values["date"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label for="summary">Summary of spending</label>
        <input
          type="text"
          name="summary"
          value={values["summary"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label for="amount">Amount</label>
        <input
          type="number"
          name="amount"
          value={values["amount"]}
          onChange={handleChange}
        />
      </div>
      <div>
        <label for="bucket">Bucket</label>
        <input
          type="text"
          name="bucket"
          value={values["bucket"]}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default SpendForm;
