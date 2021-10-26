import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { GET_ALL_TAG_BUNDLES } from './getAllTagBundles';

const CREATE_TAG_BUNDLE = gql`
  mutation AddTagBundle($name: String!) {
    tagBundleCreateOne(record: { name: "$name" })
  }
`;

const AddTagBundle = () => {
  const [newBundleName, setNewBundleName] = useState('');
  const [createEntry] = useMutation(CREATE_TAG_BUNDLE, {
    refetchQueries: [GET_ALL_TAG_BUNDLES, 'getAllTagBundles'],
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    createEntry({
      variables: {
        name: '111000',
      },
    });
    setNewBundleName('');
  };

  return (
    <>
      <h1>New Entry</h1>
      <form onSubmit={handleSubmit}>
        <input value={newBundleName} onChange={(event) => setNewBundleName(event.target.value)} />
        <button>ADD ENTRY</button>
      </form>
    </>
  );
};

export default AddTagBundle;
