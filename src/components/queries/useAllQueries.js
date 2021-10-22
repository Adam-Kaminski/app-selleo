import { gql, useQuery } from "@apollo/client";

const GET_ALL_ENTRIES = gql`
  query GetAllEntries {
    entryMany {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`;

const useAllQueries = () => {
  const { data, loading, error } = useQuery(GET_ALL_ENTRIES);

  return { data: data && data.entryMany, loading, error };
};

export default useAllQueries;
