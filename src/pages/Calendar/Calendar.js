import React from "react";
import EntryList from '../../components/EntryList';
import Box from '@mui/material/Box';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import Button from '@mui/material/Button';
import './Calendar.scss';

const Calendar = () => {
  const [valueDate, setValueDate] = React.useState(new Date());

  const htmlCalendarSectionIn = (
    <>
      <h1>Calendar</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          orientation="landscape"
          openTo="day"
          value={valueDate}
          shouldDisableDate={isWeekend}
          onChange={(newValue) => {
            setValueDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', boxShadow: 2 }} className="calendarContainer">
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }} className="calendarContainer__main">
        <section className="calendarSection">
          {htmlCalendarSectionIn}
        </section>
        <section className="listSection">
          <EntryList></EntryList>
        </section>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }} className="calendarContainer__bottomButtons">
        <Button variant="contained">Stop/Start</Button>
        <Button variant="contained">ClipCopy</Button>
      </Box>
    </Box>
  );
};

export default Calendar;
