export interface Transaction {
    date: string,
    summary: string,
    bucket: string,
    amount: PaymentCurrencyAmount
}