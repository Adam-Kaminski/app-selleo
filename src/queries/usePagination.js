import { gql, useQuery } from '@apollo/client';

export const USE_PAGINATION = gql`
  query usePagination($bundleID: MongoID!) {
    tagPagination(filter: { tagBundleId: $bundleID }, page: 1, perPage: 10) {
      pageInfo {
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
        currentPage
      }
      count
    }
  }
`;

const usePagination = (bundleID) => {
  const { data, loading, error } = useQuery(USE_PAGINATION, {
    variables: { bundleID },
  });

  return { dataPag: data?.tagPagination, loading, error };
};

export default usePagination;
