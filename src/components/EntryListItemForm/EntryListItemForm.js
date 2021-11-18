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
import createNewEntry from '../../queries/createNewEntry';

const stringToDate = (stringTime) => {
  const dateTime = new Date();
  if (!stringTime) {
    return dateTime;
  }
  const [hours, minutes] = stringTime.split(':');
  dateTime.setHours(hours);
  dateTime.setMinutes(minutes);

  return dateTime;
};

const EntryListItemForm = ({
  entryItem,
  bundleArray,
  initialValues,
  tagSelected,
  filterSelectOptions,
}) => {
  const [bundleIndexState, setBundleIndexState] = useState('');

  const [tagsArrayCurrent, setTagsArrayCurrent] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const { newEntry } = createNewEntry();

  const showSnackbarMsg = (msg, variant) => {
    enqueueSnackbar(msg, { variant });
  };
  // console.log(Object.keys(entryItem));startTime

  const formInitialValues = {
    ...entryItem,
    startTime: stringToDate(entryItem.startTime),
    endTime: stringToDate(entryItem.endTime),
  };

  const formik = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values) => {
      console.log('submit', values);

      const startTime = `${values.startTime.getHours()}:${values.startTime.getMinutes()}`;
      const endTime = `${values.endTime.getHours()}:${values.endTime.getMinutes()}`;

      newEntry(values.tag, values.bundle, startTime, endTime);
    },

    isInitialValid: true,
  });

  const updateEntries = () => {
    const entryToSave = {
      ...entryItem,

      tag: formik.values.tag,
      tagBundle: formik.values.bundle,
      tagBundleId: formik.values.bundleId,
    };
  };

  const setBundleSelected = (bundleItem) => {
    setBundleIndexState(bundleItem.index);
    formik.setFieldValue('bundleId', bundleItem._id);
    formik.setFieldValue('bundle', bundleItem.name);
  };

  const handleSelectBundle = (indexArray) => {
    const bundleObj = bundleArray[indexArray];
    if (bundleObj) {
      console.log(bundleObj);
      formik.setFieldValue('tag', '');
      setBundleSelected(bundleObj);
      setTagsArrayCurrent(bundleObj.tags || []);
    }
  };

  const setTagSelected = (name) => {
    formik.setFieldValue('tag', name);
  };

  const handleSelectAddTag = (newValue) => {
    if (typeof newValue === 'string') {
      formik.setFieldValue('tag', newValue);
    } else if (newValue && newValue.name) {
      formik.setFieldValue('tag', newValue.name);
    } else {
      formik.setFieldValue('tag', null);
    }

    formik.handleSubmit();
  };

  useEffect(() => {
    if (
      bundleArray &&
      bundleArray.length > 0 &&
      entryItem.tagBundleId &&
      entryItem.tagBundleId.length > 5
    ) {
      const indexArrayBundles = bundleArray.findIndex((item) => item._id === entryItem.tagBundleId);
      if (indexArrayBundles + 1) {
        const bundleItem = bundleArray[indexArrayBundles];
        setBundleIndexState(indexArrayBundles);
        setBundleSelected(bundleItem);
        if (entryItem.tag) {
          setTagSelected(entryItem.tag);
        }
      }
    }
  }, [bundleArray]);

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
              name="startTime"
              value={formik.values.startTime}
              onChange={(newValue1) => {
                formik.setFieldValue('startTime', newValue1);
                console.log(newValue1);
              }}
              renderInput={(params1) => {
                return <TextField {...params1} />;
              }}
              isInvalid={formik.errors.startTime}
            />
          </div>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
          <div style={{ width: '110px' }}>
            <TimePicker
              name="endTime"
              value={formik.values.endTime}
              onChange={(newValue2) => {
                formik.setFieldValue('endTime', newValue2);
              }}
              renderInput={(params2) => <TextField {...params2} />}
              isInvalid={formik.errors.endTime}
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
              isInvalid={formik.errors.bundle}
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
          value={formik.values.tag}
          onChange={(event, newValue) => {
            handleSelectAddTag(newValue);
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
