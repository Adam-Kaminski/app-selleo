import React from 'react';
import './Settings.scss';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Settings = () => {
  return (
    <>
      <FormGroup>
        <h3>Settings</h3>
        <FormControlLabel control={<Checkbox />} label="project 1" />
        <FormControlLabel control={<Checkbox />} label="project 2" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="client 3" />
        <FormControlLabel control={<Checkbox defaultChecked />} label="something" />
        <FormControlLabel control={<Checkbox />} label="something else" />
      </FormGroup>
    </>
  );
};

export default Settings;
