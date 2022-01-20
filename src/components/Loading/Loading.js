import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import './Loading.scss';

const Loading = ({ normal }) => {
  return (
    <div className={!normal ? 'loading-wrapper' : 'loading-entires'}>
      <img className="logo" src="/assets/img/logo.png" />
      <Box sx={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
        <CircularProgress />
      </Box>
    </div>
  );
};

export default Loading;
