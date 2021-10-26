import React from 'react';
import Entries from '../components/Entries';
import NewEntry from '../components/NewEntry';
import TagBundle from '../components/Entries/TagBudles';
import AddTagBundle from '../queries/AddTagBundle';

const Test1 = () => {
  return (
    <>
      <NewEntry />
      <Entries />
      <TagBundle />
      <AddTagBundle />
    </>
  );
};

export default Test1;
