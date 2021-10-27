import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import getProfileID from '../../queries/getProfileID';
import tagBundlebyID from '../../queries/tagBundlebyID';
import './Bundle.scss';
import EditBundleDesc from '../../components/EditBundleDesc/EditBundleDesc';

const Bundle = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { dataID, loadingID, errorID } = getProfileID();

  const { tagBundle, loading, error } = tagBundlebyID(id, currentPage);

  if (loading)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>error</div>;

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
            {dataID._id === tagBundle.creatorId && (
              <EditBundleDesc editDesc={tagBundle.description} bundleID={id} />
            )}
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
