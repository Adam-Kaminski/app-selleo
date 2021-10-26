import { createTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import blue from '@material-ui/core/colors/blue';

const ThemeMUI = createTheme({
  palette: {
    type: 'ligth',
    primary: {
      main: indigo[900],
    },
    secondary: {
      main: blue[300],
    },
    background: {
      paper: '#fdfdfd',
    },
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
  },
});
export default ThemeMUI;

// notes
// https://dev.to/vega0507/material-ui-theme-configuration-2mng
// przyszłościowo do testowania
// na razie nie ma co testować i korzystać default theme
// wszystkie nazwy, kolory są:
// https://v1.mui.com/customization/default-theme/
// cały ten obiekt, można tam sobie wyszukać
