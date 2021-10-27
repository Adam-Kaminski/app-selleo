import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { GET_ALL_TAG_BUNDLES } from './getAllTagBundles';

const CREATE_TAG_BUNDLE = gql`
  mutation AddNewTagBundle($name: String!) {
    tagBundleCreateOne(record: { name: $name }) {
      recordId
    }
  }
`;

const AddTagBundle = (newBundleName) => {
  const [createBundle] = useMutation(CREATE_TAG_BUNDLE, {
    refetchQueries: [GET_ALL_TAG_BUNDLES, 'getAllTagBundles'],
  });

  createBundle({
    variables: {
      name: newBundleName,
    },
  });

  return <>{console.log('new value:', newBundleName)}</>;
};

export default AddTagBundle;
