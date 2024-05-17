const monthShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", ""]

//mm-yyyy to date
export const monthSearchToDate = (search: string) => {
    if (search === "current-month") {
        return new Date()
    } else {
        const splits = search.split("-");
        return new Date(parseInt(splits[1]), monthShort.indexOf(splits[0]))
    }
}

export const dateToMonthSearch = (date: Date) => {
    return `${monthShort[date.getMonth()]}-${date.getFullYear()}`
}