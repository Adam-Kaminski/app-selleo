import { gql, useQuery } from '@apollo/client';

export const GET_PROFILE_ID = gql`
  query GetID {
    getProfile {
      _id
      tagBundlesIds
    }
  }
`;

const getProfileID = () => {
  const { data, loading, error } = useQuery(GET_PROFILE_ID);
  return { dataID: data?.getProfile, loadingID: loading, errorID: error };
};

export default getProfileID;
