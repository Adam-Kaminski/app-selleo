import React, { useEffect, useState } from 'react';
import './Settings.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import removeBundlefromProfile from '../../queries/removeBundlefromProfile';
import addBundletoProfile from '../../queries/addBundletoProfile';
import getProfileID from '../../queries/getProfileID';
import getAllTagBundles from '../../queries/getAllTagBundles';

const Settings = () => {
  const { data } = getAllTagBundles();

  const [checkedBundles, setCheckedBundles] = useState(false);

  const { dataID } = getProfileID();

  const { toggleBundle } = addBundletoProfile();

  const { removeBundle } = removeBundlefromProfile();

  const profileBundles = [dataID?.tagBundlesIds];

  const bundleIDhandler = (bundleID, checked) => () => {
    checked ? removeBundle(bundleID) : toggleBundle(bundleID);
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
          <FormControlLabel
            control={<Checkbox />}
            label="zaznaczone Bundle"
            onChange={() => setCheckedBundles(!checkedBundles)}
          />
          {data?.map((singleTagBundle) => {
            const userBundles = profileBundles[0].includes(singleTagBundle._id);

            if (checkedBundles && !userBundles) {
              return null;
            }

            return (
              <FormControlLabel
                className="settings__checkbox"
                key={singleTagBundle._id}
                control={<Checkbox />}
                checked={userBundles}
                label={singleTagBundle.name}
                onClick={bundleIDhandler(singleTagBundle._id, userBundles)}
              />
            );
          })}
        </FormGroup>
      </div>
    </div>
  );
};
export default Settings;
