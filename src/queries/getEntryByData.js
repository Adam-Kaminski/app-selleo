import { gql, useQuery } from '@apollo/client';

// entryMany(filter: { date: "2021-10-28T00:00:00.000" }) {
export const GET_BY_DATE = gql`
  query GetEntryByData($dateValue: Date) {
    entryMany(filter: { date: $dateValue }) {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`;

const getEntryByData = (dateValue) => {
  const { data, loading, error } = useQuery(GET_BY_DATE, {
    variables: { dateValue },
  });
  return { data: data?.entryMany, loading, error };
};

export default getEntryByData;
