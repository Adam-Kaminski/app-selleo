import { gql, useMutation } from '@apollo/client';
import { GET_BY_DATE } from './getEntryByDate';

const CREATE_NEW_ENTRY = gql`
  mutation addNewEntry(
    $tagName: String
    $tagBundleName: String
    $startTime: String
    $endTime: String
    $order: Int
  ) {
    createEntry(
      record: {
        tagName: $tagName
        tagBundleName: $tagBundleName
        startTime: $startTime
        endTime: $endTime
        order: $order
      }
    ) {
      _id
    }
  }
`;

const createNewEntry = () => {
  const [addNewEntry, { data }] = useMutation(CREATE_NEW_ENTRY, {
    refetchQueries: [GET_BY_DATE, 'GetEntryByData'],
  });

  const newEntry = (tagName, tagBundleName, startTime, endTime, order) => {
    console.log('mutacja');
    addNewEntry({
      variables: {
        tagName,
        tagBundleName,
        startTime,
        endTime,
        order,
      },
    });
  };

  return { newEntry, data };
};

export default createNewEntry;
