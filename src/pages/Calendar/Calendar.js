import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import EntryList from '../../components/EntryList';
import DatePickerComponet from '../../components/DatePickerComponet';
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
      <Box
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }}
        className="calendarContainer__bottomButtons"
      >
        <Button variant="contained">Stop/Start</Button>
        <Button variant="contained">ClipCopy</Button>
      </Box>
    </Box>
  );
};

export default Calendar;
