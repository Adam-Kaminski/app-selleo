import { gql, useQuery } from '@apollo/client';

const PAGE_LIMIT = 10;

export const TAG_BUNDLE_BY_ID = gql`
  query TagBundleById($bundleID: MongoID!, $skipPages: Int) {
    tagBundleById(_id: $bundleID) {
      _id
      name
      creatorId
      description
      tags(skip: $skipPages, limit: 10) {
        name
      }
    }
  }
`;

const tagBundlebyID = (bundleID, skipPages) => {
  const { data, loading, error } = useQuery(TAG_BUNDLE_BY_ID, {
    variables: { bundleID, skipPages, limit: PAGE_LIMIT },
  });

  return { tagBundle: data?.tagBundleById, loading, error };
};

export default tagBundlebyID;
