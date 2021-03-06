import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import OutlinedInput from '@mui/material/OutlinedInput';
import useAddTagBundle from '../../../mutations/useAddTagBundle';

const AddNewBundle = () => {
  const [newBundleName, setNewBundleName] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { addBundle } = useAddTagBundle();

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
    addBundle(newBundleName);
    setNewBundleName('');
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
            Dodaj nowy bundle
          </Typography>
          <OutlinedInput
            id="modal-modal-description"
            sx={{ mt: 2, width: '100%' }}
            placeholder="Nazwa"
            onChange={(e) => setNewBundleName(e.target.value)}
            value={newBundleName}
          ></OutlinedInput>
          <Button
            sx={{ width: '100%', display: 'block', marginTop: '20px' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Dodaj
          </Button>
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        sx={{ width: '100%', display: 'block', margin: '10px 0' }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Dodaj bundle
      </Button>
    </>
  );
};

export default AddNewBundle;
