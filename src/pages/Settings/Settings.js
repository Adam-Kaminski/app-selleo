import React from 'react';
import './Settings.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import addBundletoProfile from '../../queries/addBundletoProfile';
import getProfileID from '../../queries/getProfileID';
import getAllTagBundles from '../../queries/getAllTagBundles';

const Settings = () => {
  const { data } = getAllTagBundles();

  const { dataID } = getProfileID();

  const { toggleBundle } = addBundletoProfile();

  const bundleIDhandler = (bundleID) => () => {
    toggleBundle(bundleID);
  };
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
                control={<Checkbox />}
                label={singleTagBundle.name}
                onClick={bundleIDhandler(singleTagBundle._id)}
              />
            );
          })}
        </FormGroup>
      </div>
    </div>
  );
};

export default Settings;
