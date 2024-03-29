import type { iBucketBase } from "./bucket";

interface iTransactionBase {
  amount: number;
  summary: string;
  currency: string;
  type: string;
  date: Date;
}

export interface iTransactionUpdate extends iTransactionBase {
  bucket: string;
}

export interface iTransactionDisplay extends iTransactionBase {
  id: string;
  bucket: iBucketBase;
}

export interface Transaction {
  id: string;
  amount: number;
  summary: string;
  currency: string;
  type: string;
  date: Date;
  bucket: {
    name: string;
    id: string;
  };
}

export interface iEditTransactionInput
  extends Omit<Transaction, "user" | "bucket" | "id"> {
  bucket: string;
}
