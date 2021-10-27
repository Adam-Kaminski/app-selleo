import { gql, useQuery } from '@apollo/client';

export const GET_PROFILE_ID = gql`
  query GetID {
    getProfile {
      _id
      }
    }
  }
`;

const getProfileID = () => {
  const { data, loading, error } = useQuery(GET_PROFILE_ID);
  return { data: data?.GetID, loading, error };
};

export default getProfileID;
