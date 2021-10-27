import React, { useState } from 'react';
import './Bundles.scss';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import getAllTagBundles from '../../queries/getAllTagBundles';
import AddNewBundle from '../../components/AddNewBundle/AddNewBundle';

const Bundle = () => {
  const { data, loading, error } = getAllTagBundles();

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
          {data.map((singleTagBundle) => {
            return (
              <Link key={singleTagBundle._id} to={`/dashboard/bundle/${singleTagBundle._id}`}>
                <li>
                  {singleTagBundle.name}
                  <span>{singleTagBundle.description}</span>
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
