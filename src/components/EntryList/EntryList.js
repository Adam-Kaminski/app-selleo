import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { createFilterOptions } from '@mui/material/Autocomplete';
import './EntryList.scss';
import { useState } from 'react';
import EntryListItemForm from '../EntryListItemForm';

const initialValuesEmpties = {
  timeDate1: null,
  timeDate2: null,
  timeDate1String: '11:11',
  timeDate2String: '',
  bundle: 'FirmaTest1',
  tag: '',
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

const filter = createFilterOptions();

const EntryList = () => {
  const [bundles, setBundles] = useState(bundleArrayExample);
  const [tags, setTags] = useState(tagsArrayExample);
  const newDatetime = new Date();
  newDatetime.setHours(11);
  newDatetime.setMinutes(30);
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
            >
              <AddCircleOutlineIcon />
            </Button>
            <Box sx={{ height: '50px', width: '50px' }}></Box>
          </Box>
        </ListItem>
        {/* {[0, 1, 2, 3].map((value) => {
          return (
            <ListItem className="entryList" key={value}>
            </ListItem>
          );
        })} */}
        <ListItem
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
            bundleArray={bundles}
            tagsArray={tags}
            setTagsState={setTags}
            filter={createFilterOptions()}
          />
        </ListItem>
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
