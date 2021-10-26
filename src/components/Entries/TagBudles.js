import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import getAllTagBundles from '../../queries/getAllTagBundles';

const TagBundle = () => {
  const { data, loading, error } = getAllTagBundles();

  if (loading) {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) return <div>error</div>;

  return (
    <div>
      <h1>TagBundles</h1>
      {data.map((singleTagBundle) => (
        <div key={singleTagBundle._id}>
          <span>id: {singleTagBundle._id}</span>
          <span>name: {singleTagBundle.name}</span>
        </div>
      ))}
    </div>
  );
};

export default TagBundle;
