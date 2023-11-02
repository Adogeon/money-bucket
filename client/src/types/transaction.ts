export interface Transaction {
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
