import { FormEvent, useState } from "react";
import TextField from "./TextField";
import type { iBucketBase } from "../../types/bucket";

type NewTransactionDAO = {
  name: string;
  amount: number;
  currency: string;
  bucket: iBucketBase;
  date: string;
  note?: string;
};

interface AddTransactionFormProps {
  submitNewTransaction: (input: NewTransactionDAO) => void;
  userBucket: iBucketBase[];
}

const AddTransactionForm = (props: AddTransactionFormProps) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [bucket, setBucket] = useState<iBucketBase>({
    name: "blank",
    id: "000",
  });
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.submitNewTransaction({ name, amount, currency, bucket, date, note });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField name="transaction-name" updateCb={(value) => setName(value)} />
      <TextField
        name="transaction-amount"
        type="number"
        updateCb={(value) => setAmount(parseInt(value))}
      />
      <TextField
        name="transaction-note"
        type="textarea"
        updateCb={(value) => setNote(value)}
      />
    </form>
  );
};

export default AddTransactionForm;
