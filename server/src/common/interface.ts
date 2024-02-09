interface monthDO {
    month: number,
    year: number
}

interface monthQueryDO {
    generateQuery(): any
}

interface TransactionVO {
    amount: number,
    currency: string
}

interface iTransaction {
    summary: string;
    amount: number;
    currency: string;
    date: Date;
    from: iBucket | string;
    to: iBucket | string;
    user: iUser | string;
}

interface iBucket {
    name: string;
    type: string;
    user: iUser | string;
}

interface iTransaction {
    amount: number,
    currency: string,
}

interface iUser {
    username: string;
    password: string;
    comparePassword: (inputPassword: string) => Promise<boolean>;
}

interface iBudget {
    period: monthDO;
    bucket: iBucket | string,
    limit: TransactionVO,
    spend: TransactionVO
}

interface iReportBuilder {
    setUser: (userId: string) => void;
    setBucket: (bucketId: string) => void;
    setPeriod: (month: monthDO) => void;
    loadBudget: () => void;
    generateReport: () => void;
}