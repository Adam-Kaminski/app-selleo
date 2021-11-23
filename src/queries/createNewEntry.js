import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_ID } from './getProfileID';

const CREATE_NEW_ENTRY = gql`
  mutation addNewEntry(
    $tagName: String
    $tagBundleName: String
    $startTime: String
    $endTime: String
    $order: Int
  ) {
    createEntry(
      record: {
        tagName: $tagName
        tagBundleName: $tagBundleName
        startTime: $startTime
        endTime: $endTime
        order: $order
      }
    ) {
      _id
    }
  }
`;

const createNewEntry = () => {
  const [addNewEntry, { data }] = useMutation(CREATE_NEW_ENTRY, {
    refetchQueries: [GET_PROFILE_ID, 'GetID'],
  });

  const newEntry = (tagName, tagBundleName, startTime, endTime, order) => {
    addNewEntry({
      variables: {
        tagName,
        tagBundleName,
        startTime,
        endTime,
        order,
      },
    });
  };

  return { newEntry, data };
};

export default createNewEntry;
