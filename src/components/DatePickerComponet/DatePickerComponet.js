/* eslint-disable no-unused-expressions */
import Button from '@mui/material/Button';
import TodayIcon from '@mui/icons-material/Today';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './DatePickerComponet.scss';
import { useEffect, useState } from 'react';

const DatePickerComponet = () => {
  const today = new Date();
  const [choosenDayDate, setChoosenDayDate] = useState(today);
  const [choosenDayString, setChoosenDayString] = useState('');

  function getDayFromState() {
    const dateDayNumber = choosenDayDate.getDate();
    const dateMonthNumber = choosenDayDate.getMonth() + 1;
    const dateYearNumber = choosenDayDate.getFullYear();
    let day = '';
    let month = '';
    dateDayNumber < 10 ? (day = '0') : (day = '');
    dateMonthNumber < 10 ? (month = '0') : (month = '');
    const dateString = `${day}${dateDayNumber}.${month}${dateMonthNumber}.${dateYearNumber}`;
    return dateString;
  }

  function nextDay() {
    let currentDay = choosenDayDate.getDate();
    const currentMonth = choosenDayDate.getMonth();
    const currentYear = choosenDayDate.getFullYear();
    currentDay++;
    const newDate = new Date();
    newDate.setDate(currentDay + 1);
    newDate.setMonth(currentMonth);
    newDate.setFullYear(currentYear);
    if (newDate.getDate() < currentDay) {
      newDate.setMonth(currentMonth + 1);
    }
    setChoosenDayDate(newDate);
  }

  useEffect(() => {
    const newDateString = getDayFromState();
    setChoosenDayString(newDateString);
  }, [choosenDayDate]);

  return (
    <>
      <h1>Calendar</h1>
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
          <Button variant="contained">
            <ArrowBackIcon />
          </Button>
          <h1>{choosenDayString}</h1>
          <Button variant="contained" onClick={() => nextDay()}>
            <ArrowForwardIcon />
          </Button>
        </Box>
        <Button variant="contained">
          <TodayIcon />
        </Button>
      </Box>
    </>
  );
};

export default DatePickerComponet;
