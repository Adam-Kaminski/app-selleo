/* eslint-disable no-unused-expressions */
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

function getDateString(date) {
  const dateDayNumber = date.getDate();
  const dateMonthNumber = date.getMonth() + 1;
  const dateYearNumber = date.getFullYear();
  let day = '';
  let month = '';
  dateDayNumber < 10 ? (day = '0') : (day = '');
  dateMonthNumber < 10 ? (month = '0') : (month = '');
  const dateString = `${day}${dateDayNumber}.${month}${dateMonthNumber}.${dateYearNumber}`;
  return dateString;
}

const today = new Date();
const todayState = new Date(today.getTime() - 100);
const todayString = getDateString(today);

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

const DatePickerComponet = () => {
  const [choosenDayDate, setChoosenDayDate] = useState(new Date(todayState.getTime()));
  const [valueDatePicker, setValueDatePicker] = useState(new Date(todayState.getTime()));
  const [choosenDayString, setChoosenDayString] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  function nextDay() {
    let currentDay = choosenDayDate.getDate();
    const currentMonth = choosenDayDate.getMonth();
    const currentYear = choosenDayDate.getFullYear();
    const newDate = new Date(choosenDayDate.getTime());
    currentDay++;
    newDate.setDate(currentDay);
    newDate.setMonth(currentMonth);
    newDate.setFullYear(currentYear);
    if (newDate.getDate() < currentDay) {
      newDate.setMonth(currentMonth + 1);
    }
    if (today.getTime() > newDate.getTime()) {
      setChoosenDayDate(newDate);
    }
  }

  function prevDay() {
    let currentDay = choosenDayDate.getDate();
    const currentMonth = choosenDayDate.getMonth();
    const currentYear = choosenDayDate.getFullYear();
    currentDay--;
    const newDate = new Date(choosenDayDate.getTime());
    newDate.setDate(currentDay);
    newDate.setMonth(currentMonth);
    newDate.setFullYear(currentYear);
    if (newDate.getDate() > currentDay) {
      newDate.setMonth(currentMonth - 1);
    }
    setChoosenDayDate(newDate);
  }

  function chooseDayInDatePicker(newDate) {
    if (today.getTime() > newDate.getTime()) {
      setValueDatePicker(newDate);
      setChoosenDayDate(newDate);
    }
  }

  useEffect(() => {
    const newDateString = getDateString(choosenDayDate);
    setChoosenDayString(newDateString);
    setValueDatePicker(choosenDayDate);
  }, [choosenDayDate]);

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
          {isToday(choosenDayDate) ? 'Dzisiaj' : choosenDayString}
        </h1>
        <Button variant="contained" onClick={() => nextDay()} disabled={isToday(choosenDayDate)}>
          <ArrowForwardIcon />
        </Button>
      </Box>
      <Button variant="contained" onClick={() => setChoosenDayDate(new Date(todayState.getTime()))}>
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
