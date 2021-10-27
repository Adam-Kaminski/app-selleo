import { gql, useQuery } from '@apollo/client';

const PAGE_LIMIT = 10;

export const TAG_BUNDLE_BY_ID = gql`
  query TagBundleById($bundleID: MongoID!) {
    tagBundleById(_id: $bundleID) {
      _id
      name
      creatorId
      description
      tags(skip: 0, limit: 10) {
        name
      }
    }
  }
`;

const tagBundlebyID = (bundleID, currentPage) => {
  const skip = (currentPage - 1) * PAGE_LIMIT;
  const { data, loading, error } = useQuery(TAG_BUNDLE_BY_ID, {
    variables: { bundleID, skip, limit: PAGE_LIMIT },
  });

  return { tagBundle: data?.tagBundleById, loading, error };
};

export default tagBundlebyID;
