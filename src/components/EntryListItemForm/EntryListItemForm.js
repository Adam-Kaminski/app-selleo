import { useState, useEffect, useMemo } from 'react';
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
import updateMutationEntry from '../../queries/updateEntry';

const stringToDate = (stringTime) => {
  const dateTime = new Date();
  if (!stringTime) {
    return null;
  }
  const [hours, minutes] = stringTime.split(':');
  dateTime.setHours(hours);
  dateTime.setMinutes(minutes);

  return dateTime;
};

const EntryListItemForm = ({ entryItem, bundleArray, filterSelectOptions }) => {
  const [currentTags, setCurrentTags] = useState([]);

  const { newEntry, data } = createNewEntry();

  const { updateEntry } = updateMutationEntry();

  const formInitialValues = useMemo(
    () => ({
      ...entryItem,
      tagBundleName: entryItem?.tag?.tagBundle.name,
      tagName: entryItem?.tag?.name,
      startTime: stringToDate(entryItem.startTime),
      endTime: stringToDate(entryItem.endTime),
    }),
    [entryItem]
  );

  const formik = useFormik({
    initialValues: formInitialValues,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log('submit', values);

      const startTime = `${
        (values.startTime.getHours() < 10 ? '0' : '') + values.startTime.getHours()
      }:${(values.startTime.getMinutes() < 10 ? '0' : '') + values.startTime.getMinutes()}`;

      const endTime = values.endTime
        ? `${(values.endTime.getHours() < 10 ? '0' : '') + values.endTime.getHours()}:${
            (values.endTime.getMinutes() < 10 ? '0' : '') + values.endTime.getMinutes()
          }`
        : null;

      if (values._id) {
        console.log(
          'update:',
          values._id,
          values.tagName,
          values.tagBundleName,
          startTime,
          endTime
        );
        updateEntry(values._id, values.tagName, values.tagBundleName, startTime, endTime);
      } else {
        alert('uwaga');
      }
    },

    isInitialValid: true,
  });

  useEffect(() => {
    if (data?.createEntry?._id) {
      formik.setFieldValue('_id', data.createEntry._id);
    }
  }, [data]);

  useEffect(() => {
    const bundleObject = bundleArray.filter(
      (bundle) => bundle.name === entryItem?.tag?.tagBundle.name
    )[0];
    if (bundleObject) {
      setCurrentTags(bundleObject.tags || []);
    }
  }, []);

  const handleSelectBundle = (bundleName) => {
    const bundleObject = bundleArray.filter((bundle) => bundle.name === bundleName)[0];
    formik.setFieldValue('tagName', '');
    formik.setFieldValue('tagBundleName', bundleName);
    if (bundleObject) {
      setCurrentTags(bundleObject.tags || []);
    }
  };

  const handleSelectChangeTag = (newValue) => {
    if (typeof newValue === 'string') {
      formik.setFieldValue('tagName', newValue);
    } else if (newValue && newValue.inputValue) {
      formik.setFieldValue('tagName', newValue.inputValue);
    } else if (newValue && newValue.name) {
      formik.setFieldValue('tagName', newValue.name);
    } else {
      formik.setFieldValue('tagName', null);
    }

    formik.handleSubmit();
  };
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
              onChange={(value) => {
                formik.setFieldValue('startTime', value);
                formik.handleSubmit();
              }}
              renderInput={(params) => {
                return <TextField {...params} />;
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
              onChange={(value) => {
                formik.setFieldValue('endTime', value);
                formik.handleSubmit();
              }}
              renderInput={(params) => <TextField {...params} />}
              isInvalid={formik.errors.endTime}
            />
          </div>
        </LocalizationProvider>

        <Box sx={{ width: 150 }}>
          <FormControl fullWidth>
            <InputLabel>Bundle</InputLabel>
            <Select
              value={formik.values.tagBundleName}
              label="Bundle"
              name="tagBundleName"
              onChange={(input) => {
                handleSelectBundle(input.target.value);
              }}
              isInvalid={formik.errors.bundle}
            >
              {bundleArray.map((bundle, index) => {
                return (
                  <MenuItem key={bundle._id} value={bundle.name}>
                    {bundle.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Autocomplete
          name="tagName"
          value={formik.values.tagName}
          onChange={(event, newValue) => {
            handleSelectChangeTag(newValue);
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
          options={currentTags}
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
