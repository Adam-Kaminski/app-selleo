import { useEffect, useState, useMemo } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import StopIcon from '@mui/icons-material/Stop';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CircularProgress from '@mui/material/CircularProgress';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useSnackbar } from 'notistack';
import getAllTagBundles from '../../queries/getAllTagBundles';
import getEntryByData from '../../queries/getEntryByDate';
import EntryListItemForm from '../EntryListItemForm';
import './EntryList.scss';
import { returnDateFormatString } from '../../utils/dateHelper';
import getProfileID from '../../queries/getProfileID';
import createNewEntry from '../../queries/createNewEntry';
import updateMutationEntry from '../../queries/updateEntry';
import removeMutationEntry from '../../queries/removeEntry';

const EntryList = ({ currentDate }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [startTime, setStartTime] = useState('');

  const { newEntry, data } = createNewEntry();

  const { updateEntry } = updateMutationEntry();

  const { removeEntry } = removeMutationEntry();

  const {
    dataID: dataTagBundles,
    loading: loadingTagBundles,
    error: errorTagBundles,
  } = getProfileID();
  const {
    data: dataEntriesNew,
    loading: loadingEntriesNew,
    error: errorEntriesNew,
  } = getEntryByData(returnDateFormatString(currentDate));

  console.log('Entries:', dataEntriesNew);

  const bundles = useMemo(() => {
    return (
      dataTagBundles?.tagBundles?.map((bundleItem, index) => {
        const newBundle = {
          _id: bundleItem._id || null,
          name: bundleItem.name || null,
          tags: bundleItem.tags || [],
          index,
        };
        return newBundle;
      }) || []
    );
  }, [dataTagBundles]);

  if (loadingTagBundles && loadingEntriesNew) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (errorEntriesNew && errorTagBundles) return <div>errors</div>;

  const addLine = () => {
    const date = returnDateFormatString(currentDate);

    const newTime = new Date(currentDate);
    const time = `${newTime.getHours()}:${
      (newTime.getMinutes() < 10 ? '0' : '') + newTime.getMinutes()
    }`;

    newEntry(date, null, null, time);
  };

  const removeLine = (entryId) => {
    if (entryId) {
      removeEntry(entryId);
    }
  };

  const handleCopyToClipboard = () => {
    let string = '';
    dataEntriesNew.forEach((entry) => {
      string += `${entry.startTime} ${entry.endTime} ${entry.tag.tagBundle.name}-${entry.tag.name}\n`;
    });
    navigator.clipboard.writeText(string);
  };

  const handleNewEntryStartStop = () => {
    const newTime = new Date();
    const time = `${newTime.getHours()}:${
      (newTime.getMinutes() < 10 ? '0' : '') + newTime.getMinutes()
    }`;

    if (!dataEntriesNew.at(-1).endTime) {
      newEntry(null, null, time);
      setStartTime(time);
    } else {
      updateEntry(data?.createEntry?._id, null, null, startTime, time);
    }

    setTimerRunning(!timerRunning);
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
            <Box sx={{ height: '50px', width: '50px' }}></Box>
          </Box>
        </ListItem>
        {dataEntriesNew?.map((entryItem) => {
          const filterSelectOptions = createFilterOptions();
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
                entryItem={entryItem}
                bundleArray={bundles}
                filterSelectOptions={filterSelectOptions}
              />
              <Box
                sx={{
                  width: '110px',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {/* <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
                  onClick={() => {
                    addLine(entryItem.order);
                  }}
                >
                  <AddCircleOutlineIcon />
                </Button> */}
                <Button
                  color="error"
                  variant="contained"
                  sx={{ borderRadius: '', minWidth: '50px', height: '50px', width: '50px' }}
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
        <Button
          variant="contained"
          color="success"
          sx={{ borderRadius: '', minWidth: '50px', height: '50px', width: '50px' }}
          onClick={() => {
            addLine();
          }}
        >
          <AddCircleOutlineIcon />
        </Button>
        <Button variant="contained" color="error" onClick={() => handleNewEntryStartStop()}>
          <StopIcon />
          <PlayArrowIcon />
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            handleCopyToClipboard();
          }}
        >
          <CopyAllIcon />
        </Button>
      </Box>
    </>
  );
};

export default EntryList;
