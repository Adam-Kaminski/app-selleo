import Box from '@mui/material/Box';
import DatePickerComponet from '../../components/DatePickerComponet';
import EntryList from '../../components/EntryList';
import './Calendar.scss';

const Calendar = () => {
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
          <DatePickerComponet />
        </section>
        <section className="listSection">
          <EntryList />
        </section>
      </Box>
    </Box>
  );
};

export default Calendar;
