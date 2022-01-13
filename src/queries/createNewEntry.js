import { gql, useMutation } from '@apollo/client';
import { GET_BY_DATE } from './getEntryByDate';
import { GET_PROFILE_ID } from './getProfileID';

const CREATE_NEW_ENTRY = gql`
  mutation addNewEntry(
    $tagName: String
    $tagBundleName: String
    $startTime: String
    $endTime: String
    $order: Int
    $date: Date
  ) {
    createEntry(
      record: {
        tagName: $tagName
        tagBundleName: $tagBundleName
        startTime: $startTime
        endTime: $endTime
        order: $order
        date: $date
      }
    ) {
      _id
    }
  }
`;

const createNewEntry = () => {
  const [addNewEntry, { data }] = useMutation(CREATE_NEW_ENTRY, {
    refetchQueries: [{ query: GET_BY_DATE }, 'GetEntryByData', { query: GET_PROFILE_ID }, 'GetID'],
  });

  const newEntry = (date, tagName, tagBundleName, startTime, endTime, order) => {
    addNewEntry({
      variables: {
        tagName,
        tagBundleName,
        startTime,
        endTime,
        order,
        date,
      },
    });
  };

  return { newEntry, data };
};

export default createNewEntry;
