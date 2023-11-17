export interface iBucketBase {
  name: string;
  id: string;
}

export interface iBucketSummary extends iBucketBase {
  limit: number;
  totalSpend: number;
}
