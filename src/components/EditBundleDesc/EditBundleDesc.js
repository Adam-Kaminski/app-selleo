import React, { useState } from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import editBundleDesc from '../../queries/editBundleDesc';

const EditBundleDesc = ({ editDesc, bundleID }) => {
  const [desc, setDesc] = useState(editDesc);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { descEdit } = editBundleDesc();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const HandleNewBundle = (e) => {
    e.preventDefault();
    descEdit(bundleID, desc);
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
          <Typography
            style={{ marginBottom: '10px' }}
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Edycja opisu
          </Typography>
          <TextareaAutosize
            minRows={6}
            id="modal-modal-description"
            style={{ fontSize: '18px', width: '100%', padding: '10px' }}
            defaultValue={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></TextareaAutosize>
          <Button
            sx={{ width: '100%', display: 'block', marginTop: '10px' }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Edytuj
          </Button>
        </Box>
      </Modal>

      <Button
        onClick={handleOpen}
        sx={{ width: '60%', display: 'block', margin: '20px auto 0px auto' }}
        type="submit"
        variant="contained"
        color="primary"
      >
        Edytuj
      </Button>
    </>
  );
};

export default EditBundleDesc;
