export function getTimeStringFromDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;
  return `${hours}:${minutes}`;
}

export function returnDateFormatString(date) {
  const dateNew = new Date(date);
  dateNew.setHours(2, 0, 0, 0);
  const dateSting = dateNew.toISOString().replace(/T(.*)/, 'T00:00:00.000Z');
  return dateSting;
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
export const todayFormatString = returnDateFormatString(new Date());
export const todayState = new Date(today.getTime() - 100);
export const todayString = getDateString(today);
