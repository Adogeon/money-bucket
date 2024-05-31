export interface monthDO {
    month: number,
    year: number
}

export interface TransactionVO {
    amount: number,
    currency: string
}

export interface iTransaction {
    summary: string;
    amount: number;
    currency: string;
    date: Date;
    from: iBucket | string;
    to: iBucket | string;
    user: iUser | string;
}

export interface iBucket {
    name: string;
    type: string;
    user: iUser | string;
}

export interface iUser {
    username: string;
    password: string;
    comparePassword: (inputPassword: string) => Promise<boolean>;
}

export interface iBudget {
    period: monthDO;
    bucket: iBucket | string,
    user: iUser | string,
    limit: number,
    type: string
}

export interface iReportBuilder {
    setUser: (userId: string) => void;
    setBucket: (bucketId: string) => void;
    setPeriod: (month: monthDO) => void;
    loadBudget: () => void;
    generateReport: () => void;
}