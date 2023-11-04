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
