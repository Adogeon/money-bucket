interface BucketSummaryProps {
  name: string,
  limit: number,
  spend: number,
  fill: number
}

const BucketSummary = ({ name, spend, limit, fill }: BucketSummaryProps) : JSX.Element=> {
  const available = limit - spend;
  const fillStatus = ((available + fill) / limit) * 100;
  const bucketStatus = (available / limit) * 100;

  return (
    <div
      className={"w-full flex flex-col justify-between mb-2 "}
    >
      <div className={"flex flex-row justify-between"}>
        <div className={"font-semibold"}>{name}</div>
        <div className={"flex flex-col"}>
          <p className={"text-sm font-semibold"}>{available}</p>
          <p className={"text-xs font-light text-gray-400"}>{limit}</p>
        </div>
      </div>

      <div className={" w-full bg-gray-200 h-2"}>
        <div
          className={"bg-green-400 h-2 top-0 z-10"}
          style={{ width: `${fillStatus}%` }}
        />
        <div
          className={"bg-blue-600 h-2 relative bottom-2 z-20"}
          style={{ width: `${bucketStatus}%` }}
        />
      </div>
    </div>
  );
};

export default BucketSummary;
