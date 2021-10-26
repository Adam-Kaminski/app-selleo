import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import tagBundlebyID from '../../queries/tagBundlebyID';
import './Bundle.scss';

const Bundle = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { tagBundle, loading, error } = tagBundlebyID(id, currentPage);

  if (loading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>error</div>;

  console.log(tagBundle);

  return (
    <>
      <div className="bundle">
        <div className="bundle__left">
          <div className="bundle__name">
            <h3>Name:</h3>
            {tagBundle.name}
          </div>
          <div className="bundle__desc">
            <h3>Description:</h3>
            {tagBundle.description}
          </div>
        </div>
        <div className="bundle__right">
          <h3>Tags:</h3>
          <ul className="bundle__list">
            {tagBundle.tags.map((tag) => {
              return <li key="">{tag.name}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Bundle;
