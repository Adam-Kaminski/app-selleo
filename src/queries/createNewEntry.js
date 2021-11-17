import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_ID } from './getProfileID';

const CREATE_NEW_ENTRY = gql`
  mutation addNewEntry($tagName: String, $tagBundleName: String) {
    createEntry(record: { tagName: $tagName, tagBundleName: $tagBundleName }) {
      _id
    }
  }
`;

const createNewEntry = () => {
  const [addNewEntry] = useMutation(CREATE_NEW_ENTRY, {
    refetchQueries: [GET_PROFILE_ID, 'GetID'],
  });

  const newEntry = (tagName, tagBundleName) => {
    addNewEntry({
      variables: {
        tagName,
        tagBundleName,
      },
    });
  };

  return { newEntry };
};

export default createNewEntry;
