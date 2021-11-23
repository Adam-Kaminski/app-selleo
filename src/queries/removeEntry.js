import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_ID } from './getProfileID';

const REMOVE_ENTRY = gql`
  mutation removeEntry($id: ID!) {
    entryRemoveById(_id: $id) {
      _id
    }
  }
`;

const removeMutationEntry = () => {
  const [removeNewEntry] = useMutation(REMOVE_ENTRY, {
    refetchQueries: [GET_PROFILE_ID, 'GetID'],
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
