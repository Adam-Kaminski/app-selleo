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
import { retunrDateFormatString } from '../../utils/dateHelper';
import getProfileID from '../../queries/getProfileID';
import createNewEntry from '../../queries/createNewEntry';
import removeMutationEntry from '../../queries/removeEntry';

const EntryList = ({ stateDateCurrent }) => {
  const { newEntry, data } = createNewEntry();

  const { removeEntry } = removeMutationEntry();

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

  console.log('Bundles:', dataTagBundles);

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

  const addLine = (order) => {
    newEntry(null, null, '00:00', '00:00', order);
  };

  const removeLine = (entryId) => {
    if (entryId) {
      removeEntry(entryId);
    }
  };

  const handleCopyToClipboard = () => {
    let string = '';
    dataEntriesNew.forEach((entry, index) => {
      string += `${entry.startTime} ${entry.endTime} ${entry.tagBundleName}-${entry.tagName}\n`;
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
                addLine(0);
              }}
            >
              <AddCircleOutlineIcon />
            </Button>
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
                <Button
                  variant="contained"
                  color="success"
                  sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
                  onClick={() => {
                    addLine(entryItem.order);
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
