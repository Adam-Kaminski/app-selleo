import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_ID } from './getProfileID';

const UPDATE_ENTRY = gql`
  mutation updateEntry(
    $id: ID!
    $tagName: String
    $tagBundleName: String
    $startTime: String
    $endTime: String
  ) {
    updateEntry(
      _id: $id
      record: {
        tagName: $tagName
        tagBundleName: $tagBundleName
        startTime: $startTime
        endTime: $endTime
      }
    ) {
      _id
    }
  }
`;

const updateMutationEntry = () => {
  const [updateNewEntry] = useMutation(UPDATE_ENTRY, {
    refetchQueries: [GET_PROFILE_ID, 'GetID'],
  });

  const updateEntry = (id, tagName, tagBundleName, startTime, endTime) => {
    console.log('id', id);
    updateNewEntry({
      variables: {
        id,
        tagName,
        tagBundleName,
        startTime,
        endTime,
      },
    });
  };

  return { updateEntry };
};

export default updateMutationEntry;
