import React from 'react';
import Entries from '../components/Entries';
import NewEntry from '../components/NewEntry';
import TagBundle from '../components/Entries/TagBudles';

const Test1 = () => {
  return (
    <>
      <NewEntry />
      <Entries />
      <TagBundle />
    </>
  );
};

export default Test1;
