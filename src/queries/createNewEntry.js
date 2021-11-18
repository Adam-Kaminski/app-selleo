import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_ID } from './getProfileID';

const CREATE_NEW_ENTRY = gql`
  mutation addNewEntry(
    $tagName: String
    $tagBundleName: String
    $startTime: String
    $endTime: String
  ) {
    createEntry(
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

const createNewEntry = () => {
  const [addNewEntry] = useMutation(CREATE_NEW_ENTRY, {
    refetchQueries: [GET_PROFILE_ID, 'GetID'],
  });

  const newEntry = (tagName, tagBundleName, startTime, endTime) => {
    console.log(tagName);
    addNewEntry({
      variables: {
        tagName,
        tagBundleName,
        startTime,
        endTime,
      },
    });
  };

  return { newEntry };
};

export default createNewEntry;
