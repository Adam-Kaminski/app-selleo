import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import getProfileID from '../../queries/getProfileID';
import getAllTagBundles from '../../queries/getAllTagBundles';
import AddNewBundle from './AddNewBundle/AddNewBundle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Loading from '../../components/Loading';
import './Bundles.scss';

const Bundle = () => {
  const { data, loading, error } = getAllTagBundles();

  const { dataID } = getProfileID();

  const [showMyBundles, setShowMyBundles] = useState(false);

  if (loading) return <Loading />;
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
              <Link key={singleTagBundle._id} to={`/bundle/${singleTagBundle._id}`}>
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
