import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_ID } from './getProfileID';

const REMOVE_BUNDLE_FROM_PROFILE = gql`
  mutation removeBundlefromUser($bundleId: ID) {
    unassignBundleId(bundleId: $bundleId) {
      _id
    }
  }
`;

const removeBundlefromProfile = () => {
  const [removeBundleUsage] = useMutation(REMOVE_BUNDLE_FROM_PROFILE, {
    refetchQueries: [GET_PROFILE_ID, 'GetID'],
  });

  const removeBundle = (bundleId) => {
    removeBundleUsage({
      variables: {
        bundleId,
      },
    });
  };

  return { removeBundle };
};

export default removeBundlefromProfile;
