import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import TodayIcon from '@mui/icons-material/Today';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import plLocale from 'date-fns/locale/pl';
import './DatePickerComponet.scss';
import { getDateString, today, todayState, todayString } from '../../utils/dateHelper';

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const minDate = new Date('2000-01-01T00:00:00.000');
const maxDate = new Date(todayState.getTime());

const isToday = (dateValue) => {
  return (
    dateValue.getDate() === today.getDate() &&
    dateValue.getMonth() === today.getMonth() &&
    dateValue.getFullYear() === today.getFullYear()
  );
};

const DatePickerComponet = ({ stateDateCurrent, setStateDateCurrent }) => {
  const [valueDatePicker, setValueDatePicker] = useState(new Date(todayState.getTime()));
  const [choosenDayString, setChoosenDayString] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  function nextDay() {
    let currentDay = stateDateCurrent.getDate();
    const currentMonth = stateDateCurrent.getMonth();
    const currentYear = stateDateCurrent.getFullYear();
    const newDate = new Date(stateDateCurrent.getTime());
    currentDay++;
    newDate.setDate(currentDay);
    newDate.setMonth(currentMonth);
    newDate.setFullYear(currentYear);
    if (newDate.getDate() < currentDay) {
      newDate.setMonth(currentMonth + 1);
    }
    if (today.getTime() > newDate.getTime()) {
      setStateDateCurrent(newDate);
    }
  }

  function prevDay() {
    let currentDay = stateDateCurrent.getDate();
    const currentMonth = stateDateCurrent.getMonth();
    const currentYear = stateDateCurrent.getFullYear();
    currentDay--;
    const newDate = new Date(stateDateCurrent.getTime());
    newDate.setDate(currentDay);
    newDate.setMonth(currentMonth);
    newDate.setFullYear(currentYear);
    if (newDate.getDate() > currentDay) {
      newDate.setMonth(currentMonth - 1);
    }
    setStateDateCurrent(newDate);
  }

  function chooseDayInDatePicker(newDate) {
    if (today.getTime() > newDate.getTime()) {
      setValueDatePicker(newDate);
      setStateDateCurrent(newDate);
    }
  }

  useEffect(() => {
    const newDateString = getDateString(stateDateCurrent);
    setChoosenDayString(newDateString);
    setValueDatePicker(stateDateCurrent);
  }, [stateDateCurrent]);

  const htmlModal = (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={styleModal}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h2>Wybierz datę</h2>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={plLocale}>
            <StaticDatePicker
              openTo="day"
              value={valueDatePicker}
              minDate={minDate}
              maxDate={maxDate}
              shouldDisableDate={isWeekend}
              onChange={(newValueDate) => {
                chooseDayInDatePicker(newValueDate);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Modal>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
      className="datePickerMainContainer"
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="changeDay"
      >
        <Button variant="contained" onClick={() => prevDay()}>
          <ArrowBackIcon />
        </Button>
        <h1 style={{ width: '125px', textAlign: 'center' }}>
          {isToday(stateDateCurrent) ? 'Dzisiaj' : choosenDayString}
        </h1>
        <Button variant="contained" onClick={() => nextDay()} disabled={isToday(stateDateCurrent)}>
          <ArrowForwardIcon />
        </Button>
      </Box>
      <Button
        variant="contained"
        onClick={() => setStateDateCurrent(new Date(todayState.getTime()))}
      >
        <h2>Dzisiaj: {todayString}</h2>
      </Button>
      <Button variant="contained" onClick={() => handleOpenModal()}>
        <TodayIcon />
      </Button>
      {htmlModal}
    </Box>
  );
};

export default DatePickerComponet;
