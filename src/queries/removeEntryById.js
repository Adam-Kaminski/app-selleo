import { gql, useQuery } from '@apollo/client';

export const REMOVE_ENTRY_BY_ID = gql`
  query entryRemoveById($entryId: MongoID!) {
    entryMany(_id: $entryId) {
      recordId
    }
  }
`;

const removeEntryById = (entryId) => {
  const { data, loading, error } = useQuery(REMOVE_ENTRY_BY_ID, {
    variables: { entryId },
  });
  return { data: data?.entryMany, loading, error };
};

export default removeEntryById;
