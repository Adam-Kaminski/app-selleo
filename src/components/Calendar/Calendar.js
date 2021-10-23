import React from "react";
import Box from '@mui/material/Box';
import './Calendar.scss';
// import './Calendar.css';

const Calendar = () => {
  return (
    <>
      <Box sx={{ flexDirection: 'row', flexWrap: 'wrap' }} className="calendarMainContainer">
        <section>
          <h1>Calendar</h1>
        </section>
        <section>
          <h1>List</h1>
        </section>
      </Box>
      <Box sx={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end' }} className="calendarBottomButtonsContainer">
        <button>Stop/Start</button>
        <button>ClipCopy</button>
      </Box>
    </>
  );
};

export default Calendar;
