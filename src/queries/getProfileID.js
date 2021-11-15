import { gql, useQuery } from '@apollo/client';

export const GET_PROFILE_ID = gql`
  query GetID {
    getProfile {
      _id
      tagBundlesIds
      tagBundles {
        _id
        name
        tags {
          _id
          name
        }
      }
    }
  }
`;

const getProfileID = () => {
  const { data, loading, error } = useQuery(GET_PROFILE_ID);
  return { dataID: data?.getProfile, loadingID: loading, errorID: error };
};

export default getProfileID;
