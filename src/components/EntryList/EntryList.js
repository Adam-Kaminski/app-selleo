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
// import EntryListItemForm from '../EntryListItemForm';

const initialValuesEmpties = {
  timeDate1: null,
  timeDate2: null,
  project: '',
  tag: '',
};

const projectsArrayExample = [
  { id: '0', name: 'FirmaTest1' },
  { id: '1', name: 'FirmaTest2' },
  { id: '2', name: 'FirmaTest3' },
];

const tagsArrayExample = [
  { _id: '0', name: 'Se7en', tagBundleId: '' },
  { _id: '1', name: 'The Silence of the Lambs', tagBundleId: '' },
  { _id: '2', name: "It's a Wonderful Life", tagBundleId: '' },
  { _id: '3', name: 'Life Is Beautiful', tagBundleId: '' },
  { _id: '4', name: 'The Usual Suspects', tagBundleId: '' },
  { _id: '5', name: 'Léon: The Professional', tagBundleId: '' },
];

const filter = createFilterOptions();

const EntryList = () => {
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
        {[0, 1, 2, 3].map((value) => {
          return (
            <ListItem className="entryList" key={value}>
              {/* <EntryListItemForm /> */}
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
