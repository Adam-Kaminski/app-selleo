import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';
import { useSnackbar } from 'notistack';
import plLocale from 'date-fns/locale/pl';
import './EntryListItemForm.scss';
import calendarEntrySchema from '../../schemas/calendarEntrySchema';
import { getTimeStringFromDate } from '../../utils/dateHelper';

const EntryListItemForm = ({
  entryItem,
  bundleArray,
  initialValues,
  tagSelected,
  filterSelectOptions,
}) => {
  const [changesInEntry, setChangesInEntry] = useState(false);
  const [valueTime1, setValueTime1] = useState(null);
  const [valueTime2, setValueTime2] = useState(null);
  const [valueTime1String] = useState(entryItem.startTime);
  const [valueTime2String] = useState(entryItem.endTime);
  const [bundleIndexState, setBundleIndexState] = useState('');
  const [valueTag, setValueTag] = useState(tagSelected);
  const [tagsArrayCurrent, setTagsArrayCurrent] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [initialStart] = useState('initial');

  const showSnackbarMsg = (msg, variant) => {
    enqueueSnackbar(msg, { variant });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (event) => {
      console.log('submit', event);
      console.log('changesInEntry:', changesInEntry);
      if (changesInEntry) {
        showSnackbarMsg(`run Submit for line: ${entryItem.order}`, 'success');
      }
    },
    validationSchema: calendarEntrySchema,
    isInitialValid: false,
  });

  const updateEntries = () => {
    const startTime = getTimeStringFromDate(valueTime1);
    const endTime = getTimeStringFromDate(valueTime2);
    const entryToSave = {
      ...entryItem,
      startTime,
      endTime,
      tag: formik.values.tag,
      tagBundle: formik.values.bundle,
      tagBundleId: formik.values.bundleId,
    };
    // const entriesNew = [...entries];
    // const index = entriesNew.findIndex((i) => i._id === entryToSave._id);
    // entriesNew[index] = entryToSave;
    // setEntries(entriesNew);
  };

  const setBundleSelected = (bundleItem) => {
    setBundleIndexState(bundleItem.index);
    formik.setFieldValue('bundleId', bundleItem._id);
    formik.setFieldValue('bundle', bundleItem.name);
  };

  const handleSelectBundle = (indexArray) => {
    console.log(indexArray);
    const bundleObj = bundleArray[indexArray];
    if (bundleObj) {
      setValueTag('');
      formik.setFieldValue('tag', '');
      setBundleSelected(bundleObj);
      setTagsArrayCurrent(bundleObj.tags || []);
    }
  };

  const setTagSelected = (name) => {
    formik.setFieldValue('tag', name);
    setValueTag(name);
  };

  const handleSelectAddTag = (newValue) => {
    if (typeof newValue === 'string') {
      setValueTag({
        name: newValue,
      });
      formik.setFieldValue('tag', newValue);
    } else if (newValue && newValue.inputValue) {
      // Create a new value from the user input
      setValueTag({
        name: newValue.inputValue,
      });
      const newTag = {
        _id: '0',
        name: newValue.inputValue,
        tagBundleId: formik.values.bundleId,
      };
      // setTagsState([...tagsArray, newTag]);
      // and add to frontend
      // save to backend
      // formik.setFieldValue('tag', newValue.inputValue);
    } else {
      setValueTag(newValue);
      if (newValue && newValue.name) {
        formik.setFieldValue('tag', newValue.name);
      } else {
        formik.setFieldValue('tag', null);
      }
    }
  };

  useEffect(() => {
    setChangesInEntry(false);
  }, [initialStart]);

  useEffect(() => {
    if (
      bundleArray &&
      bundleArray.length > 0 &&
      entryItem.tagBundleId &&
      entryItem.tagBundleId.length > 5
    ) {
      const indexArrayBundles = bundleArray.findIndex((item) => item._id === entryItem.tagBundleId);
      console.log(indexArrayBundles);
      if (indexArrayBundles + 1) {
        const bundleItem = bundleArray[indexArrayBundles];
        setBundleIndexState(indexArrayBundles);
        if (entryItem.tag) {
          setTagSelected(entryItem.tag);
          setBundleSelected(bundleItem);
        }
      }
    }
  }, [bundleArray]);

  useEffect(() => {
    if (valueTag) {
      formik.setFieldValue('tag', valueTag);
    }
  }, [valueTag]);

  useEffect(() => {
    if (valueTime1String) {
      const startTime = valueTime1String.split(':');
      if (startTime && startTime.length === 2) {
        const newTime1 = new Date();
        newTime1.setHours(startTime[0], startTime[1]);
        setValueTime1(newTime1);
        formik.setFieldValue('timeDate1', newTime1);
      }
    }
  }, [valueTime1String]);

  useEffect(() => {
    if (valueTime2String) {
      const endTime = valueTime2String.split(':');
      if (endTime && endTime.length === 2) {
        const newTime2 = new Date();
        newTime2.setHours(endTime[0], endTime[1]);
        setValueTime2(newTime2);
        formik.setFieldValue('timeDate2', newTime2);
      }
    }
  }, [valueTime2String]);

  return (
    <form>
      <Box
        className="entryListBox"
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
          <div style={{ width: '110px' }}>
            <TimePicker
              name="timeDate1"
              value={valueTime1}
              onChange={(newValue1) => {
                setValueTime1(newValue1);
                formik.setFieldValue('timeDate1', newValue1);
                setChangesInEntry(true);
              }}
              onAccept={() => {
                formik.handleSubmit();
                setChangesInEntry(true);
              }}
              renderInput={(params1) => {
                return (
                  <TextField
                    onBlur={() => {
                      formik.handleSubmit();
                    }}
                    isInvalid={formik.errors.valueTime1String}
                    {...params1}
                  />
                );
              }}
              isInvalid={formik.errors.timeDate1}
            />
          </div>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
          <div style={{ width: '110px' }}>
            <TimePicker
              name="timeDate2"
              value={valueTime2}
              onChange={(newValue2) => {
                setValueTime2(newValue2);
                formik.setFieldValue('timeDate2', newValue2);
                setChangesInEntry(true);
              }}
              onAccept={() => {
                formik.handleSubmit();
                setChangesInEntry(true);
              }}
              renderInput={(params2) => (
                <TextField
                  onBlur={() => {
                    formik.handleSubmit();
                  }}
                  {...params2}
                />
              )}
              isInvalid={formik.errors.timeDate2}
            />
          </div>
        </LocalizationProvider>
        <Box sx={{ width: 150 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bundle</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={bundleIndexState}
              label="Bundle"
              name="bundle"
              onChange={(newValueBundle) => {
                handleSelectBundle(newValueBundle.target.value);
              }}
              onAccept={() => {
                setChangesInEntry(true);
              }}
              isInvalid={formik.errors.bundle}
              onBlur={() => {
                formik.handleSubmit();
              }}
            >
              {bundleArray.map((bundle, index) => {
                return (
                  <MenuItem key={bundle._id} value={index}>
                    {bundle.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Autocomplete
          name="tag"
          value={valueTag}
          onChange={(event, newValue) => {
            handleSelectAddTag(newValue);
            setChangesInEntry(true);
          }}
          filterOptions={(options, params) => {
            const filtered = filterSelectOptions(options, params);
            const { inputValue } = params;
            const isExisting = options.some((option) => inputValue === option.name);
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                name: `Utwórz i dodaj nowy Tag: "${inputValue}"`,
              });
            }
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          onBlur={() => {
            formik.handleSubmit();
          }}
          handleHomeEndKeys
          id="free-solo-with-text-demo"
          options={tagsArrayCurrent}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.name;
          }}
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          sx={{ width: 300 }}
          freeSolo
          renderInput={(params) => <TextField {...params} label="Wybierz tag lub dodaj nowy Tag" />}
          disabled={formik.errors.bundle}
          isInvalid={formik.errors.tag}
        />
      </Box>
    </form>
  );
};

export default EntryListItemForm;
