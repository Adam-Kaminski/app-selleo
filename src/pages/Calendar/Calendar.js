import Box from '@mui/material/Box';
import { useState } from 'react';
import DatePickerComponet from '../../components/DatePickerComponet';
import EntryList from '../../components/EntryList';
import './Calendar.scss';
import { todayState } from '../../utils/dateHelper';

const Calendar = () => {
  const [stateDateCurrent, setStateDateCurrent] = useState(new Date(todayState.getTime()));
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
          <DatePickerComponet
            stateDateCurrent={stateDateCurrent}
            setStateDateCurrent={setStateDateCurrent}
          />
        </section>
        <section className="listSection">
          <EntryList stateDateCurrent={stateDateCurrent} />
        </section>
      </Box>
    </Box>
  );
};

export default Calendar;
