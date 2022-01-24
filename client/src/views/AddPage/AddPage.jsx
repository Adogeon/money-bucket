import React from "react";
import { AddForm } from "../AddPage";
import { useNavigate } from "react-router-dom";

const AddPage = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const name = e.target["spend-name"].value;
    const amount = e.target["spend-amount"].value;
    let date = e.target["spend-date"].value;
    date = new Date(date).toISOString();
    const bucket = e.target["spend-bucket"].value;
    const note = e.target["spend-note"].value;

    const transaction = {
      name,
      amount,
      date,
      bucket,
      note,
      type: "CR",
    };

    console.log(transaction);

    navigate("/", { replace: true });
  };

  return (
    <div className="flex items-center h-screen w-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        <h1 className="block w-full text-center text-2xl font-bold text-grey-darkest mb-6">
          Add a Transaction
        </h1>
        <AddForm handleSubmit={handleLogin} buckets={["Food", "Game"]} />
      </div>
    </div>
  );
};

export default AddPage;
