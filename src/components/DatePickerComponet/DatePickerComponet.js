/* eslint-disable no-unused-expressions */
import Button from '@mui/material/Button';
import TodayIcon from '@mui/icons-material/Today';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './DatePickerComponet.scss';
import { useEffect, useState } from 'react';

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

const DatePickerComponet = () => {
  const [choosenDayDate, setChoosenDayDate] = useState(new Date(todayState.getTime()));
  const [choosenDayString, setChoosenDayString] = useState('');

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

  useEffect(() => {
    const newDateString = getDateString(choosenDayDate);
    setChoosenDayString(newDateString);
  }, [choosenDayDate]);

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
        <h1>{choosenDayString}</h1>
        <Button variant="contained" onClick={() => nextDay()}>
          <ArrowForwardIcon />
        </Button>
      </Box>
      <Button variant="contained" onClick={() => setChoosenDayDate(new Date(todayState.getTime()))}>
        <h2>Dziś: {todayString}</h2>
      </Button>
      <Button variant="contained">
        <TodayIcon />
      </Button>
    </Box>
  );
};

export default DatePickerComponet;
