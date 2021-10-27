import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';
import plLocale from 'date-fns/locale/pl';

const calendarEntrySchema = yup.object().shape({
  timeDate1: yup.date().default(null).required(),
  timeDate2: yup
    .date()
    .default(null)
    .required()
    .min(yup.ref('timeDate1'), 'Drugi wybrany czas musi być późniejszy niż pierwszy'),
});

const initialValues = {
  timeDate1: null,
  timeDate2: null,
};

const EntryListItemForm = () => {
  const [valueTime1, setValueTime1] = useState(null);
  const [valueTime2, setValueTime2] = useState(null);

  return (
    <Formik
      validationSchema={calendarEntrySchema}
      onSubmit={console.log}
      initialValues={initialValues}
      isInitialValid={false}
    >
      {({ handleBlur, values, touched, isValid, errors, setFieldValue }) => {
        return (
          <form>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
              <div style={{ width: '110px' }}>
                <TimePicker
                  name="timeDate1"
                  value={valueTime1}
                  onChange={(newValue1) => {
                    setValueTime1(newValue1);
                    setFieldValue('timeDate1', newValue1);
                  }}
                  onBlur={handleBlur}
                  renderInput={(params1) => <TextField {...params1} />}
                  isInvalid={touched.timeDate1 && errors.timeDate1}
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
                    setFieldValue('timeDate2', newValue2, false);
                    // if (errors.timeDate2 !== undefined) console.log('1----błąd');
                  }}
                  // onError={(reason, value) => {
                  //   console.log('2---reason', reason);
                  //   console.log('2---value', value);
                  // }}
                  className={errors.timeDate2 !== undefined ? 'error' : 'notError'}
                  onBlur={handleBlur}
                  renderInput={(params2) => <TextField {...params2} />}
                  isInvalid={touched.timeDate2 && errors.timeDate2}
                />
              </div>
            </LocalizationProvider>
            <Button color="primary" variant="contained" type="submit" disabled={!isValid}>
              Submit
            </Button>
          </form>
        );
      }}
    </Formik>
  );
};

export default EntryListItemForm;
