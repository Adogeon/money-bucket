import { useState, useEffect } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { getBucketDetail } from "../API/bucket.api";
import { useAuth } from "../context/AuthContext";

import MonthPicker from "../components/MonthPicker";
import { ShortTransactionTableView } from "../components/TransactionTableView";
import { dateToMonthSearch, monthSearchToDate } from "../utils/month";

const bucketDetailQuery = (token: string | null, bucketId: string) => {
  return queryOptions({
    queryKey: ["getBucketDetail", bucketId],
    queryFn: () => getBucketDetail(token, bucketId),
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
  const { data } = bucketQuery;
  const navigate = useNavigate({ from: Route.fullPath });
  //adding route query for month
  //handle month change is equal to changing search query

  const [month, setMonth] = useState(monthSearchToDate(search.monthQuery));

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
        {data.name}
      </h1>
      <MonthPicker month={month} onMonthChange={handleMonthChange} />
      <section>
        <p>
          <em>Spending: </em>
          <span>{`${data.totalSpend} ${data.currency}`}</span>
        </p>
        <p>
          <em>Limit: </em>
          <span>{`${data.defaultLimit} ${data.currency}`}</span>
        </p>
      </section>
      <section>
        <ShortTransactionTableView data={data.transactions} />
      </section>
    </div>
  );
}
