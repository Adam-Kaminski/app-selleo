import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import { GET_ALL_ENTRIES } from '../../queries/useAllEntries';

const CREATE_ENTRY = gql`
  mutation CreateEntry($record: EntryCreateTypeInput) {
    createEntry(record: $record) {
      _id
      startTime
      endTime
      tag {
        name
      }
    }
  }
`;

const NewEntry = () => {
  const [newEntryValue, setNewEntryValue] = useState('');
  const [createEntry] = useMutation(CREATE_ENTRY, {
    refetchQueries: [GET_ALL_ENTRIES, 'GetAllEntries'],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createEntry({
      variables: {
        record: {
          startTime: '10:10',
          endTime: '10:10',
          tagBundleName: '111',
          tagName: newEntryValue,
        },
      },
    });
    setNewEntryValue('');
  };

  return (
    <>
      <h1>New Entry</h1>
      <form onSubmit={handleSubmit}>
        <input value={newEntryValue} onChange={(event) => setNewEntryValue(event.target.value)} />
        <button>ADD ENTRY</button>
      </form>
    </>
  );
};

export default NewEntry;
