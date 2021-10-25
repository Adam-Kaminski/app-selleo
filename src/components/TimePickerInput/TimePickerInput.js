import React from 'react';
import plLocale from 'date-fns/locale/pl';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

const localeMap = {
  pl: plLocale,
};

const TimePickerInput = ({valueTimeProp}) => {
  const [valueTime, setValueTime] = React.useState(valueTimeProp.newDatetime);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={localeMap['pl']}>
      <div style={{width: '110px'}}>
        <TimePicker
          value={valueTime}
          onChange={(newValue) => setValueTime(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
    </LocalizationProvider>
  );
}

export default TimePickerInput;