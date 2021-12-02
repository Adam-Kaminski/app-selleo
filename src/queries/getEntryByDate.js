import { gql, useQuery } from '@apollo/client';

export const GET_BY_DATE = gql`
  query GetEntryByData($dateValue: Date) {
    entryMany(filter: { date: $dateValue }, sort: STARTTIME_ASC) {
      _id
      startTime
      endTime
      order
      tag {
        _id
        name
        tagBundle {
          _id
          name
        }
      }
      creatorId
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
