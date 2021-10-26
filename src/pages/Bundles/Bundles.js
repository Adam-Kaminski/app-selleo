import React, { useState } from 'react';
import './Bundles.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import getAllTagBundles from '../../queries/getAllTagBundles';

const Bundle = () => {
  const { data, loading, error } = getAllTagBundles();
  const [newBundleName, setNewBundleName] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>error</div>;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const HandleNewBundle = (e) => {
    e.preventDefault();
    console.log(newBundleName);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={HandleNewBundle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add new bundle
          </Typography>
          <OutlinedInput
            id="modal-modal-description"
            sx={{ mt: 2, width: '100%' }}
            placeholder="Name"
            onChange={(e) => setNewBundleName(e.target.value)}
            value={newBundleName}
          ></OutlinedInput>
          <Button
            sx={{ width: '100%', display: 'block', margin: '10px 0' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
        </Box>
      </Modal>
      <div className="bundles">
        <ul className="bundles__list">
          <Button
            onClick={handleOpen}
            sx={{ width: '100%', display: 'block', margin: '10px 0' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Add
          </Button>
          {data.map((singleTagBundle) => {
            return (
              <Link key={singleTagBundle._id} to={`/dashboard/bundle/${singleTagBundle._id}`}>
                <li>
                  {singleTagBundle.name}
                  <span>{singleTagBundle.description}</span>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Bundle;
