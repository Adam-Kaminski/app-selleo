import { gql, useQuery } from '@apollo/client';

export const GET_ALL_TAG_BUNDLES = gql`
  query GetAllTagBundles {
    tagBundleMany {
      _id
      name
      description
      tags {
        name
      }
    }
  }
`;

const getAllTagBundles = () => {
  const { data, loading, error } = useQuery(GET_ALL_TAG_BUNDLES);
  return { data: data?.tagBundleMany, loading, error };
};

export default getAllTagBundles;
