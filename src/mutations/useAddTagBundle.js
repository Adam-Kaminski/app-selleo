import { gql, useMutation } from '@apollo/client';
import { GET_ALL_TAG_BUNDLES } from '../queries/getAllTagBundles';

const CREATE_TAG_BUNDLE = gql`
  mutation AddNewTagBundle($name: String!) {
    tagBundleCreateOne(record: { name: $name }) {
      recordId
    }
  }
`;

const useAddTagBundle = () => {
  const [createBundle] = useMutation(CREATE_TAG_BUNDLE, {
    refetchQueries: [GET_ALL_TAG_BUNDLES, 'GetAllEntries'],
  });

  const createNewBundle = (newBundleName) => {
    createBundle({
      variables: {
        name: newBundleName,
      },
    });
  };

  return { addBundle: createNewBundle };
};

export default useAddTagBundle;
