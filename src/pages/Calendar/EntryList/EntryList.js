import { useMemo } from 'react';
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
import getEntryByData from '../../../queries/getEntryByDate';
import EntryListItemForm from './EntryListItemForm';
import { returnDateFormatString } from '../../../utils/dateHelper';
import getProfileID from '../../../queries/getProfileID';
import createNewEntry from '../../../mutations/createNewEntry';
import updateMutationEntry from '../../../mutations/updateEntry';
import removeMutationEntry from '../../../mutations/removeEntry';
import Loading from '../../../components/Loading';
import './EntryList.scss';

const EntryList = ({ currentDate }) => {
  const date = returnDateFormatString(currentDate);

  const { newEntry } = createNewEntry();

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

  if (loadingEntriesNew) return Loading();

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
    string += `${date.slice(0, 10)}\n`;
    dataEntriesNew.forEach((entry) => {
      string += `${entry.startTime} ${entry.endTime} ${entry.tag?.tagBundle?.name}-${entry.tag?.name}\n`;
    });
    navigator.clipboard.writeText(string);
  };

  const handleNewEntryStartStop = () => {
    const newTime = new Date();
    const time = `${newTime.getHours()}:${
      (newTime.getMinutes() < 10 ? '0' : '') + newTime.getMinutes()
    }`;

    if (dataEntriesNew.at(-1).endTime) {
      newEntry(date, null, null, dataEntriesNew.at(-1).endTime);
    } else {
      updateEntry(
        dataEntriesNew.at(-1)._id,
        dataEntriesNew.at(-1).tag.name,
        dataEntriesNew.at(-1).tag.tagBundle.name,
        dataEntriesNew.at(-1).startTime,
        time
      );
      newEntry(date, null, null, time);
    }
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
