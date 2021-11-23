import { useEffect, useState } from 'react';
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
import { retunrDateFormatString } from '../../utils/dateHelper';
import getProfileID from '../../queries/getProfileID';

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

// const filter = createFilterOptions();

const EntryList = ({ stateDateCurrent }) => {
  const [entries, setEntries] = useState([]);
  const [bundles, setBundles] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const showSnackbarMsg = (msg, variant) => {
    enqueueSnackbar(msg, { variant });
  };

  const {
    dataID: dataTagBundles,
    loading: loadingTagBundles,
    error: errorTagBundles,
  } = getProfileID();
  const {
    data: dataEntriesNew,
    loading: loadingEntriesNew,
    error: errorEntriesNew,
  } = getEntryByData(retunrDateFormatString(stateDateCurrent));

  useEffect(() => {
    if (dataEntriesNew && dataEntriesNew !== undefined && typeof dataEntriesNew !== 'undefined') {
      const newEntries = dataEntriesNew.map((entry, index) => {
        return {
          startTime: entry.startTime || '',
          endTime: entry.endTime || '',
          order: entry.order || '',
          _id: entry._id || null,
          tagName: entry.tag?.name || '',
          tagBundleName: entry.tag?.tagBundle.name || '',
          index,
        };
      });
      setEntries(newEntries);
    }
  }, [dataEntriesNew]);

  useEffect(() => {
    if (dataTagBundles && dataTagBundles !== undefined) {
      const newTagBundles = dataTagBundles.tagBundles.map((bundleItem, index) => {
        const newBundle = {
          _id: bundleItem._id || null,
          name: bundleItem.name || null,
          tags: bundleItem.tags || [],
          index,
        };
        return newBundle;
      });
      setBundles(newTagBundles);
    }
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

  const addLineBeforeFirst = () => {
    const emptyEntry = { ...entrySeed };
    emptyEntry._id = `new${entries.length}`;
    setEntries([emptyEntry, ...entries]);
    showSnackbarMsg(`add after line: ${1}`, 'success');
  };
  const addLine = (entryId) => {
    const emptyEntry = { ...entrySeed };
    const newArray = [...entries];
    const index = entries.findIndex((item) => item._id === entryId);
    // emptyEntry._id = `new${entries.length}`;
    newArray.splice(index + 1, 0, emptyEntry);
    setEntries(newArray);
    showSnackbarMsg(`add after line: ${index + 1}`, 'success');
  };
  const removeLine = (entryId) => {
    setEntries(entries.filter((entryItem) => entryItem._id !== entryId));
  };

  const handleCopyToClipboard = () => {
    let string = '';
    entries.forEach((entry, index) => {
      string += `${entry.startTime} ${entry.endTime} ${entry.tagBundle}-${entry.tag}\n`;
    });
    navigator.clipboard.writeText(string);
  };

  const handleNewEntryStartStop = () => {
    // const newEntries = [...entries];
    // const now = getTimeStringFromDate(new Date());
    // newEntries[newEntries.length - 1].endTime = now;
    // newEntries.push({ ...entrySeed });
    // newEntries[newEntries.length - 1].startTime = now;
    // setEntries(newEntries);
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
        {entries.map((entryItem) => {
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
