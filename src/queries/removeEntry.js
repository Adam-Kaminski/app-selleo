import { gql, useMutation } from '@apollo/client';
import { GET_BY_DATE } from './getEntryByDate';

const REMOVE_ENTRY = gql`
  mutation removeEntry($id: MongoID!) {
    entryRemoveById(_id: $id) {
      recordId
    }
  }
`;

const removeMutationEntry = () => {
  const [removeNewEntry] = useMutation(REMOVE_ENTRY, {
    refetchQueries: [GET_BY_DATE, 'GetEntryByData'],
  });

  const removeEntry = (id) => {
    removeNewEntry({
      variables: {
        id,
      },
    });
  };

  return { removeEntry };
};

export default removeMutationEntry;
