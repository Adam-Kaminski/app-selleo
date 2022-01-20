import Box from '@mui/material/Box';
import { useState } from 'react';
import DatePickerComponet from './DatePickerComponet';
import EntryList from './EntryList';
import { todayState } from '../../utils/dateHelper';
import './Calendar.scss';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(todayState.getTime()));
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', boxShadow: 2 }}
      className="calendarContainer"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        className="calendarContainer__main"
      >
        <section className="calendarSection">
          <DatePickerComponet stateDateCurrent={currentDate} setStateDateCurrent={setCurrentDate} />
        </section>
        <section className="listSection">
          <EntryList currentDate={currentDate} />
        </section>
      </Box>
    </Box>
  );
};

export default Calendar;
