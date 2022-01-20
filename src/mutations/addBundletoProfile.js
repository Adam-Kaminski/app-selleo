import { gql, useMutation } from '@apollo/client';
import { GET_PROFILE_ID } from '../queries/getProfileID';

const ADD_BUNDLE_TO_PROFILE = gql`
  mutation AddBundletoUser($bundleId: ID) {
    assignBundleId(bundleId: $bundleId) {
      _id
    }
  }
`;

const addBundletoProfile = () => {
  const [toggleBundleUsage] = useMutation(ADD_BUNDLE_TO_PROFILE, {
    refetchQueries: [GET_PROFILE_ID, 'GetID'],
  });

  const toggleBundle = (bundleId) => {
    toggleBundleUsage({
      variables: {
        bundleId,
      },
    });
  };

  return { toggleBundle };
};

export default addBundletoProfile;
