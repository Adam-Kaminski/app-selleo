import React, { useState } from 'react';
import './Bundles.scss';
import CircularProgress from '@mui/material/CircularProgress';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import getProfileID from '../../queries/getProfileID';
import getAllTagBundles from '../../queries/getAllTagBundles';
import AddNewBundle from '../../components/AddNewBundle/AddNewBundle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Bundle = () => {
  const { data, loading, error } = getAllTagBundles();

  const { dataID, loadingID, errorID } = getProfileID();

  const [showMyBundles, setShowMyBundles] = useState(false);

  if (loading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>error</div>;

  return (
    <>
      <div className="bundles">
        <ul className="bundles__list">
          <AddNewBundle />
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="moje Bundle"
              onChange={() => setShowMyBundles(!showMyBundles)}
            />
          </FormGroup>
          {data.map((singleTagBundle) => {
            const isCreatedByCurrentUser = dataID?._id === singleTagBundle.creatorId;

            if (showMyBundles && !isCreatedByCurrentUser) {
              return null;
            }
            return (
              <Link key={singleTagBundle._id} to={`/dashboard/bundle/${singleTagBundle._id}`}>
                <li>
                  {singleTagBundle.name}
                  {isCreatedByCurrentUser && (
                    <span className="bundles__user">
                      <AccountCircleIcon />
                    </span>
                  )}
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
