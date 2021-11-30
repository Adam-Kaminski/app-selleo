import { gql, useMutation } from '@apollo/client';
import { GET_BY_DATE } from './getEntryByDate';

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
    refetchQueries: [GET_BY_DATE, 'GetEntryByData'],
  });

  const updateEntry = (id, tagName, tagBundleName, startTime, endTime) => {
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
