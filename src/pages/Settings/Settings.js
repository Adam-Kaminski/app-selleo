import React, { useEffect, useState } from 'react';
import './Settings.scss';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import removeBundlefromProfile from '../../queries/removeBundlefromProfile';
import addBundletoProfile from '../../queries/addBundletoProfile';
import getProfileID from '../../queries/getProfileID';
import getAllTagBundles from '../../queries/getAllTagBundles';
import { useAuth0 } from '@auth0/auth0-react';

const Settings = () => {
  const { user } = useAuth0();

  const { data, loading } = getAllTagBundles();

  const [checkedBundles, setCheckedBundles] = useState(false);

  const { dataID } = getProfileID();

  const { toggleBundle } = addBundletoProfile();

  const { removeBundle } = removeBundlefromProfile();

  const profileBundles = [dataID?.tagBundlesIds];

  const bundleIDhandler = (bundleID, checked) => () => {
    checked ? removeBundle(bundleID) : toggleBundle(bundleID);
  };

  if (loading)
    return (
      <div className="login-box">
        <img className="logo" src="/assets/img/logo.png" />
        <Box sx={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
          <CircularProgress />
        </Box>
      </div>
    );

  return (
    <div className="settings">
      <div className="settings__user">
        <h3>{user.name}</h3>
        <h3>email: {user.email}</h3>
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
