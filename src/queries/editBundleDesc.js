import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { TAG_BUNDLE_BY_ID } from './tagBundlebyID';

const EDIT_BUNDLE_DESC = gql`
  mutation AddNewTagBundle($_id: MongoID!, $description: String!) {
    tagBundleUpdateById(_id: $_id, record: { description: $description }) {
      recordId
    }
  }
`;

const editBundleDesc = () => {
  const [editDesc] = useMutation(EDIT_BUNDLE_DESC, {
    refetchQueries: [TAG_BUNDLE_BY_ID, 'tagBundlebyID'],
  });

  const createNewDesc = (bundleID, desc) => {
    console.log(bundleID);
    console.log(desc);
    editDesc({
      variables: {
        _id: bundleID,
        description: desc,
      },
    });
  };

  return { descEdit: createNewDesc };
};

export default editBundleDesc;
