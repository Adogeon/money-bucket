interface MonthPickerProps {
  month: Date;
  onMonthChange: (newMonth: Date) => void;
}

function MonthPicker({ month, onMonthChange }: MonthPickerProps): JSX.Element {
  const displayMonth = month.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const goBackAMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() - 1);
    onMonthChange(newMonth);
  };

  const goForwardAMonth = () => {
    const newMonth = new Date(month);
    newMonth.setMonth(newMonth.getMonth() + 1);
    onMonthChange(newMonth);
  };

  return (
    <div className="w-full flex justify-evenly mb-3">
      <button
        className="rounded-full p-2 hover:bg-secondary hover:bg-opacity-10 hover:brightness-125"
        onClick={goBackAMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <div className="font-semibold text-lg text-primary py-2">
        {displayMonth}
      </div>
      <button
        className="rounded-full p-2 hover:bg-secondary hover:bg-opacity-10 hover:brightness-125"
        onClick={goForwardAMonth}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-primary"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default MonthPicker;
