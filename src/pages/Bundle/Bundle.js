/* eslint-disable no-unused-vars */
// import { ContactSupportOutlined } from "@mui/icons-material";
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import tagBundlebyID from '../../queries/tagBundlebyID';

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
      <ul className="bundle-list">
        {tagBundle.tags.map((tag) => {
          return <li key="">{tag.name}</li>;
        })}
      </ul>
    </>
  );
};

export default Bundle;
