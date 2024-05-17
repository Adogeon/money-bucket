import { Link } from "@tanstack/react-router";
export interface iBucketSummary {
  id: string;
  currency: string;
  name: string;
  limit: number;
  totalTo: number;
  totalFrom: number;
  type: string;
}
interface BucketSummaryProps {
  bucket: iBucketSummary;
}

const BucketSummary = ({ bucket }: BucketSummaryProps): JSX.Element => {
  const { limit, totalTo, totalFrom, name, id, currency, type } = bucket;

  const available = Math.round((totalFrom - totalTo) * 100) / 100;
  const bucketStatus = (available / limit) * 100;

  return (
    <div
      className={"w-full flex flex-col mb-2 items-stretch px-2 py-4 border-b"}
    >
      <Link
        to="/bucket/$bucketId"
        params={{ bucketId: id }}
        search={(prev) => ({ ...prev, monthQuery: "current-month" })}
      >
        <div className={"w-full flex flex-row justify-between"}>
          <div className={"font-semibold text-secondary"}>{name}</div>
          <div className={"flex flex-col items-end"}>
            <p
              className={`text-sm font-semibold ${
                available < 0 ? "text-red-500" : ""
              }`}
            >
              {`${available} ${currency}`}
            </p>
            <p
              className={"text-sm font-light text-gray-400"}
            >{`${limit} ${currency}`}</p>
          </div>
        </div>

        <div className={" w-full bg-gray-200 h-2"}>
          <div
            className={"bg-primary h-2 relative z-20"}
            style={{ width: `${bucketStatus > 0 ? bucketStatus : 0}%` }}
          />
        </div>
      </Link>
    </div>
  );
};

export default BucketSummary;
