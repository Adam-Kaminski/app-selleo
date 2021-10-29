export function getTimeStringFromDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;
  console.log(minutes, 'minutes');
  console.log(hours, 'hours');
  return `${hours}:${minutes}`;
}

export function retunrDateFormatString(date) {
  const dateNew = new Date(date);
  dateNew.setHours(2, 0, 0, 0);
  const dateSting = dateNew.toISOString();
  return dateSting.substring(0, dateSting.length - 1);
}

export function getDateString(date) {
  const dateDayNumber = date.getDate();
  const dateMonthNumber = date.getMonth() + 1;
  const dateYearNumber = date.getFullYear();
  const day = dateDayNumber < 10 ? '0' : '';
  const month = dateMonthNumber < 10 ? '0' : '';
  const dateString = `${day}${dateDayNumber}.${month}${dateMonthNumber}.${dateYearNumber}`;
  return dateString;
}
export const today = new Date();
export const todayFormatString = retunrDateFormatString(new Date());
console.log(todayFormatString);
export const todayState = new Date(today.getTime() - 100);
export const todayString = getDateString(today);
