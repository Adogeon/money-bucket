import { useState, useEffect } from "react";
import {
  queryOptions,
  useSuspenseQuery,
  useQuery,
} from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getBucketDetail } from "../API/bucket.api";
import { useAuth } from "../context/AuthContext";

import MonthPicker from "../components/MonthPicker";
import { ShortTransactionTableView } from "../components/TransactionTableView";
import { dateToMonthSearch, monthSearchToDate } from "../utils/month";
import { getBucketMonthlyTransaction } from "../API/transaction.api";

const bucketDetailQuery = (token: string | null, bucketId: string) => {
  return queryOptions({
    queryKey: ["getBucketDetail", bucketId],
    queryFn: () => getBucketDetail(token, bucketId),
  });
};

const bucketMonthlyTransactionQuery = (
  token: string | null,
  bucketId: string,
  month: Date
) => {
  return queryOptions({
    queryKey: ["getBucketMonthlyTransaction", bucketId, month],
    queryFn: () => getBucketMonthlyTransaction(token, month, bucketId),
  });
};

type MonthSearch = {
  monthQuery: string;
};

export const Route = createFileRoute("/bucket/$bucketId")({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      bucketDetailQuery(context.auth.token, params.bucketId)
    );
  },
  validateSearch: (search: Record<string, unknown>): MonthSearch => {
    return {
      monthQuery: (search.monthQuery as string) || "current-month",
    };
  },
  component: BucketDetailComponent,
});

function BucketDetailComponent() {
  const search = Route.useSearch();
  const params = Route.useParams();
  const auth = useAuth();
  const bucketQuery = useSuspenseQuery(
    bucketDetailQuery(auth.token, params.bucketId)
  );
  const { data: bucket } = bucketQuery;
  const navigate = useNavigate({ from: Route.fullPath });
  const [month, setMonth] = useState(monthSearchToDate(search.monthQuery));
  const transactionQuery = useQuery(
    bucketMonthlyTransactionQuery(auth.token, bucket._id, month)
  );

  const { data, isFetching } = transactionQuery;

  useEffect(() => {
    navigate({
      search: (old) => ({
        ...old,
        monthQuery: dateToMonthSearch(month),
      }),
      replace: true,
      params: true,
    });
  }, [month]);

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);
  };

  return (
    <div className="mx-auto container">
      <h1 className="text-center text-2xl font-extrabold text-primary">
        {bucket.name}
      </h1>
      <MonthPicker month={month} onMonthChange={handleMonthChange} />
      {isFetching ? (
        <div> Fetching Transaction </div>
      ) : (
        <>
          <section>
            {bucket.type === "Expense" ? (
              <>
                <p>
                  <em>Spending: </em>
                  <span>{`${data?.totalTo ?? 0} ${bucket.currency}`}</span>
                </p>
                <p>
                  <em>Limit: </em>
                  <span>{`${bucket.defaultLimit} ${bucket.currency}`}</span>
                </p>
              </>
            ) : bucket.type === "Asset" ? (
              <>
                <p>
                  <em>Spending: </em>
                  <span>{`${data?.totalTo ?? 0} ${bucket.currency}`}</span>
                </p>
                <p>
                  <em>Limit: </em>
                  <span>{`${bucket.defaultLimit} ${bucket.currency}`}</span>
                </p>
              </>
            ) : (
              <>
                <p>
                  <em>Spending: </em>
                  <span>{`${data?.totalTo ?? 0} ${bucket.currency}`}</span>
                </p>
                <p>
                  <em>Limit: </em>
                  <span>{`${bucket.defaultLimit} ${bucket.currency}`}</span>
                </p>
              </>
            )}
          </section>
          <section>
            <ShortTransactionTableView
              transactions={data?.transactions ?? []}
            />
          </section>
        </>
      )}
    </div>
  );
}
