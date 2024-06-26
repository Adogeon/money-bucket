import type { monthDO } from "src/common/types";
export class MongoMonthQueryDO {
    readonly _month: number;
    readonly _year: number;
    constructor(input: monthDO) {
        this._month = input.month;
        this._year = input.year;
    };

    generateQuery() {
        return this._month === 12
            ? {
                $gte: new Date(`${this._year}-${this._month}-01`),
                $lt: new Date(`${this._year + 1}-1-01`)
            } : {
                $gte: new Date(`${this._year}-${this._month}-01`),
                $lt: new Date(`${this._year}-${this._month + 1}-01`),
            }
    }
}