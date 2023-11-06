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
    <div className="w-full flex justify-center">
      <button onClick={goBackAMonth}>{"<"}</button>
      <div>{displayMonth}</div>
      <button onClick={goForwardAMonth}>{">"}</button>
    </div>
  );
}

export default MonthPicker;
