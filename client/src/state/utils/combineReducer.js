export default function (reducers) {
  return (state, action) => {
    return Object.keys(reducers).reduce(
      (acc, nextKey) => ({
        ...acc,
        [nextKey]: reducers[nextKey](acc[nextKey], action),
      }),
      state
    );
  };
}
