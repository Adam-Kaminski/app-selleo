import React from 'react';
import './Settings.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import getAllTagBundles from '../../queries/getAllTagBundles';

const Settings = () => {
  const { data } = getAllTagBundles();

  return (
    <div className="settings">
      <div className="settings__user">
        <h3>Nazwa użytkownika:</h3>
        <h3>{localStorage.getItem('username')}</h3>
      </div>
      <div className="settings__bundles">
        <h3>Użytkowane Bundle:</h3>
        <FormGroup>
          {data?.map((singleTagBundle) => {
            return (
              <FormControlLabel
                className="settings__checkbox"
                key={singleTagBundle._id}
                control={<Checkbox defaultChecked />}
                label={singleTagBundle.name}
              />
            );
          })}
        </FormGroup>
      </div>
    </div>
  );
};

export default Settings;
