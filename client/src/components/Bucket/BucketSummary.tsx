export interface iBucketSummary {
  name: string;
  limit: number;
  totalSpend: number;
}
const BucketSummary = ({
  name,
  totalSpend,
  limit,
}: iBucketSummary): JSX.Element => {
  const available = Math.round((limit - totalSpend) * 100) / 100;
  const bucketStatus = (available / limit) * 100;

  return (
    <div className={"w-full flex flex-col mb-2 items-stretch px-2"}>
      <div className={"w-full flex flex-row justify-between"}>
        <div className={"font-semibold"}>{name}</div>
        <div className={"flex flex-col items-end"}>
          <p
            className={`text-sm font-semibold ${
              available < 0 ? "text-red-500" : ""
            }`}
          >
            {available}
          </p>
          <p className={"text-sm font-light text-gray-400"}>{limit}</p>
        </div>
      </div>

      <div className={" w-full bg-gray-200 h-2"}>
        <div
          className={"bg-blue-600 h-2 relative bottom-2 z-20"}
          style={{ width: `${bucketStatus > 0 ? bucketStatus : 0}%` }}
        />
      </div>
    </div>
  );
};

export default BucketSummary;
