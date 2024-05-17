import { createFileRoute } from "@tanstack/react-router";
import { getTransactionDetail } from "../API/transaction.api";
import { useAuth } from "../context/AuthContext";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";

const transactionDetailQuery = (token: string, transactionId: string) => {
  return queryOptions({
    queryKey: ["fetchTransation", transactionId],
    queryFn: () => getTransactionDetail(token, transactionId),
  });
};

export const Route = createFileRoute("/transaction/$transactionId")({
  loader: ({ context, params }) => {
    context.queryClient.ensureQueryData(
      transactionDetailQuery(context.auth.token ?? "", params.transactionId)
    );
  },
  component: TransactionDetailPage,
});

function TransactionDetailPage() {
  const auth = useAuth();
  const params = Route.useParams();
  const { data } = useSuspenseQuery(
    transactionDetailQuery(auth.token ?? "", params.transactionId)
  );

  const handleEdit = () => {
    console.log("You have click edit");
  };

  const handleDelete = () => {
    console.log("You have click delete");
  };

  return (
    <div className="flex items-center w-full h-full">
      <div className="w-full bg-white rounded shadow-sm p-8 m-4 md:max-w-sm md:mx-auto">
        <div className="mb-4">
          <section className="flex flex-col mb-4">
            <h1 className="text-grey text-left text-sm font-mono">Summary:</h1>
            <p className="font-medium text-2xl text-gray-500">
              {data?.summary}
            </p>
          </section>
          <section className="flex flex-col mb-4">
            <h1 className="text-grey text-left text-sm font-mono">Bucket:</h1>
            <p className="font-medium text-2xl text-gray-500">
              {data?.bucket.name}
            </p>
          </section>
          <section className="flex flex-col mb-4">
            <h1 className="text-grey text-left text-sm font-mono">Amount:</h1>
            <p className="font-medium text-2xl text-gray-500">{`${data?.amount} ${data?.currency}`}</p>
          </section>
          <section className="flex flex-col mb-4">
            <h1 className="text-grey text-left text-sm font-mono">Date:</h1>
            <p className="font-medium text-xl text-gray-500">
              {new Date(data.date).toLocaleString("default", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </section>
          <section className="flex justify-between px-4 py-2">
            <button
              className="block bg-blue-400 hover:bg-blue-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
              onClick={handleEdit}
            >
              Edit
            </button>
            <button
              className="block bg-red-400 hover:bg-red-600 text-white uppercase text-lg mx-auto px-4 py-2 rounded"
              onClick={handleDelete}
            >
              Delete
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
