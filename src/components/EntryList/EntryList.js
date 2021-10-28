import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StopIcon from '@mui/icons-material/Stop';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { createFilterOptions } from '@mui/material/Autocomplete';
import EntryListItemForm from '../EntryListItemForm';
import './EntryList.scss';

const initialValuesEmpties = {
  timeDate1: null,
  timeDate2: null,
  bundle: 'FirmaTest1',
  tag: '',
};

const entrySeed = {
  startTime: '',
  endTime: '',
  order: -201,
  _id: null,
  tag: '',
  tagId: '',
  tagBundle: '',
  tagBundleId: '',
};

const entriesExmaple = [
  {
    startTime: '11:00',
    endTime: '12:00',
    order: 0,
    _id: '0',
    tag: 'Tag1 dla test1',
    tagId: '1',
    tagBundle: 'FirmaTest1',
    tagBundleId: '0',
  },
  {
    startTime: '12:00',
    endTime: '13:00',
    order: 1,
    _id: '1',
    tag: 'Tag2 dla test2',
    tagId: '2',
    tagBundle: 'FirmaTest2',
    tagBundleId: '1',
  },
];

const bundleArrayExample = [
  { _id: '0', name: 'FirmaTest1' },
  { _id: '1', name: 'FirmaTest2' },
  { _id: '2', name: 'FirmaTest3' },
];

const tagsArrayExample = [
  { _id: '0', name: 'Tag1 dla test2', tagBundleId: '1' },
  { _id: '1', name: 'Tag1 dla test1', tagBundleId: '0' },
  { _id: '2', name: 'Tag2 dla test2', tagBundleId: '1' },
  { _id: '3', name: 'Tag2 dla test1', tagBundleId: '0' },
  { _id: '4', name: 'Tag1 dla test3', tagBundleId: '2' },
  { _id: '5', name: 'Tag2 dla test3', tagBundleId: '2' },
];

const EntryList = () => {
  const [entries, setEntries] = useState(entriesExmaple);
  const [bundles] = useState(bundleArrayExample);
  const [tags, setTags] = useState(tagsArrayExample);
  const newDatetime = new Date();
  newDatetime.setHours(11);
  newDatetime.setMinutes(30);

  const addLineBeforeFirst = () => {
    const emptyEntry = { ...entrySeed };
    emptyEntry._id = `new${entries.length}`;
    setEntries([emptyEntry, ...entries]);
  };
  const addLine = (entryId) => {
    const emptyEntry = { ...entrySeed };
    const newArray = [...entries];
    const index = entries.findIndex((item) => item._id === entryId);
    emptyEntry._id = `new${entries.length}`;
    newArray.splice(index + 1, 0, emptyEntry);
    setEntries(newArray);
  };
  const removeLine = (entryId) => {
    setEntries(entries.filter((entryItem) => entryItem._id !== entryId));
  };

  return (
    <>
      <List
        sx={{
          width: '100%',
          bgcolor: 'background.paper',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <ListItem
          className="entryList"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['110px', '110px', '150px', '300px'].map((widthValue, index) => {
            return <Box key={index.toString()} sx={{ width: widthValue }}></Box>;
          })}
          <Box
            sx={{
              width: '110px',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Button
              variant="contained"
              color="success"
              sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
              onClick={() => {
                addLineBeforeFirst();
              }}
            >
              <AddCircleOutlineIcon />
            </Button>
            <Box sx={{ height: '50px', width: '50px' }}></Box>
          </Box>
        </ListItem>
        {entries?.map((entryItem) => {
          return (
            <ListItem
              key={entryItem._id}
              className="entryList"
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <EntryListItemForm
                initialValues={initialValuesEmpties}
                entries={entryItem}
                bundleArray={bundles}
                tagsArray={tags}
                setTagsState={setTags}
                filter={createFilterOptions()}
              />
              <Box
                sx={{
                  width: '110px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
                  onClick={() => {
                    addLine(entryItem._id);
                  }}
                >
                  <AddCircleOutlineIcon />
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
                  onClick={() => {
                    removeLine(entryItem._id);
                  }}
                >
                  <DeleteOutlineIcon />
                </Button>
              </Box>
            </ListItem>
          );
        })}
      </List>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-end',
        }}
        className="calendarContainer__bottomButtons"
      >
        <Button variant="contained" color="error">
          <StopIcon />
          <PlayArrowIcon />
        </Button>
        <Button variant="contained">
          <CopyAllIcon />
        </Button>
      </Box>
    </>
  );
};

export default EntryList;
