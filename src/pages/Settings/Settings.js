import React from 'react';
import './Settings.scss';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import getAllTagBundles from '../../queries/getAllTagBundles';

const Settings = () => {
  const { data } = getAllTagBundles();

  return (
    <>
      <FormGroup>
        {data?.map((singleTagBundle) => {
          return (
            <FormControlLabel
              key={singleTagBundle._id}
              control={<Checkbox defaultChecked />}
              label={singleTagBundle.name}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default Settings;
