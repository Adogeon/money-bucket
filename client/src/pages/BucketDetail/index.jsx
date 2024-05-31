const MonthlyExpense = () => {
  return (
    <>
      <section>
        <p>
          <em>Spending: </em>
          <span>{`${data?.totalTo ?? 0} USD`}</span>
        </p>
        <p>
          <em>Limit: </em>
          <span>{`${data?.totalFrom ?? 0} USD`}</span>
        </p>
      </section>
      <section>
        {isFetching ? (
          <div> Fetching Transation </div>
        ) : (
          <ShortTransactionTableView transactions={data?.transactions ?? []} />
        )}
      </section>
    </>
  );
};

const AssetDetailPage = () => {};

export default BucketDetail;
