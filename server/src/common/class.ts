class mongoMonthQueryDO implements monthQueryDO {
    private _month: number;
    private _year: number;
    constructor(input: monthDO) {
        this._month = input.month;
        this._year = input.year;
    }
    generateQuery() {
        return this._month === 12
            ? {
                $gte: `${this._year}-${this._month}-01`,
                $lt: `${this._year + 1}-1-01`
            } : {
                $gte: `${this._year}-${this._month}-01`,
                $lt: `${this._year}-${this._month + 1}-01`
            }
    }
}