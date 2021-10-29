import { gql, useMutation } from '@apollo/client';
import { GET_ALL_TAG_BUNDLES } from './getAllTagBundles';

const ADD_BUNDLE_TO_PROFILE = gql`
  mutation AddBundletoUser($bundleId: ID) {
    assignBundleId(bundleId: $bundleId) {
      _id
    }
  }
`;

const addBundletoProfile = () => {
  const [toggleBundleUsage] = useMutation(ADD_BUNDLE_TO_PROFILE, {
    refetchQueries: [GET_ALL_TAG_BUNDLES, 'GetAllEntries'],
  });

  const toggleBundle = (bundleId) => {
    console.log(bundleId);
    toggleBundleUsage({
      variables: {
        bundleId,
      },
    });
  };

  return { toggleBundle };
};

export default addBundletoProfile;
