import { useState } from 'react';
import { Formik } from 'formik';
import Button from '@mui/material/Button';
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
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import plLocale from 'date-fns/locale/pl';
import './EntryListItemForm.scss';
import calendarEntrySchema from '../../schemas/calendarEntrySchema';

const EntryListItemForm = ({ initialValues, bundleArray, tagsArray, filter }) => {
  const [valueTime1, setValueTime1] = useState(null);
  const [valueTime2, setValueTime2] = useState(null);
  const [bundleState, setBundleState] = useState('');
  const [valueTag, setValueTag] = useState(null);
  const [tagsArrayCurrent, setTagsArrayCurrent] = useState([]);

  return (
    <>
      <Formik
        validationSchema={calendarEntrySchema}
        onSubmit={(event) => {
          console.log('submit', event);
        }}
        initialValues={initialValues}
        isInitialValid={false}
      >
        {({ touched, isValid, errors, setFieldValue, handleSubmit }) => {
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
                  <div style={{ width: '110px' }} className={errors.timeDate1 ? 'error' : ''}>
                    <TimePicker
                      name="timeDate1"
                      value={valueTime1}
                      onChange={(newValue1) => {
                        setValueTime1(newValue1);
                        setFieldValue('timeDate1', newValue1);
                      }}
                      onAccept={() => {
                        handleSubmit();
                      }}
                      renderInput={(params1) => (
                        <TextField
                          onBlur={() => {
                            handleSubmit();
                          }}
                          {...params1}
                        />
                      )}
                      isInvalid={errors.timeDate1}
                    />
                  </div>
                </LocalizationProvider>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
                  <div style={{ width: '110px' }} className={errors.timeDate2 ? 'error' : ''}>
                    <TimePicker
                      name="timeDate2"
                      value={valueTime2}
                      onChange={(newValue2) => {
                        setValueTime2(newValue2);
                        setFieldValue('timeDate2', newValue2);
                      }}
                      onAccept={() => {
                        handleSubmit();
                      }}
                      renderInput={(params2) => (
                        <TextField
                          onBlur={() => {
                            handleSubmit();
                          }}
                          {...params2}
                        />
                      )}
                      isInvalid={errors.timeDate2}
                    />
                  </div>
                </LocalizationProvider>
                <Box sx={{ width: 150 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Bundle</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={bundleState}
                      label="Bundle"
                      name="bundle"
                      onChange={(newValueBundle) => {
                        const indexArray = newValueBundle.target.value;
                        const bundleObj = bundleArray[indexArray];
                        setBundleState(indexArray);
                        setFieldValue('bundle', bundleObj.name);
                        setTagsArrayCurrent(
                          tagsArray.filter((tagItem) => tagItem.tagBundleId === bundleObj._id)
                        );
                      }}
                      isInvalid={errors.bundle}
                      onBlur={() => {
                        handleSubmit();
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
                    if (typeof newValue === 'string') {
                      setValueTag({
                        name: newValue,
                      });
                      setFieldValue('tag', newValue);
                    } else if (newValue && newValue.inputValue) {
                      // Create a new value from the user input
                      setValueTag({
                        name: newValue.inputValue,
                      });
                      // save to backend
                      // and add to frontend
                      // setFieldValue('tag', newValue.inputValue);
                    } else {
                      setValueTag(newValue);
                      if (newValue && newValue.name) {
                        setFieldValue('tag', newValue.name);
                      } else {
                        setFieldValue('tag', null);
                      }
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    const { inputValue } = params;
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Dodaj: "${inputValue}"`,
                      });
                    }
                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  onBlur={() => {
                    handleSubmit();
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
                  renderInput={(params) => (
                    <TextField {...params} label="Wybierz tag lub dodaj nowy tag" />
                  )}
                  disabled={errors.bundle}
                />
              </Box>
            </form>
          );
        }}
      </Formik>
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
        <Button
          color="error"
          variant="contained"
          sx={{ borderRadius: '50%', minWidth: '50px', height: '50px', width: '50px' }}
        >
          <DeleteOutlineIcon />
        </Button>
      </Box>
    </>
  );
};

export default EntryListItemForm;
