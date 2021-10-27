import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';

const EditBundleDesc = ({ editDesc }) => {
  const [desc, setDesc] = useState(editDesc);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Creator ID: 6173da5a59ad24a08eb1702c

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
    setDesc('');
    handleClose();
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
            Edit description
          </Typography>
          <OutlinedInput
            id="modal-modal-description"
            sx={{ mt: 2, width: '100%' }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></OutlinedInput>
          <Button
            sx={{ width: '100%', display: 'block', margin: '10px 0' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        sx={{ width: '80%', display: 'block', margin: '10px 0' }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Edit
      </Button>
    </>
  );
};

export default EditBundleDesc;
