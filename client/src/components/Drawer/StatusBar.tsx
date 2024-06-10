interface StatusBarProps {
  fillPercent: number;
}
const StatusBar = ({ fillPercent }: StatusBarProps) => (
  <div className={" w-full bg-gray-200 h-2"}>
    <div
      className={"bg-primary h-2 relative z-20"}
      style={{ width: `${fillPercent}%` }}
    />
  </div>
);

export default StatusBar;
