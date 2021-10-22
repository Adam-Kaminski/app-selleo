import useAllQueries from "../queries/useAllQueries";

const Entries = () => {
  const { data, loading, error } = useAllQueries();

  if (loading) return <div>loading... </div>;
  if (error) return <div>Error !</div>;

  return (
    <div>
      <h1>My entries</h1>
      {data.map((singleEntry) => {
        return (
          <div key={singleEntry._id}>
            <span>startTime: {singleEntry.startTime}</span>
            <span>endTime: {singleEntry.endTime}</span>
            <span> Tag: {singleEntry.tag?.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
