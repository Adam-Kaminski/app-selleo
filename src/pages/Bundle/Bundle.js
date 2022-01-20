import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import CircularProgress from '@mui/material/CircularProgress';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import EditBundleDesc from '../../components/EditBundleDesc/EditBundleDesc';
import usePagination from '../../queries/usePagination';
import getProfileID from '../../queries/getProfileID';
import tagBundlebyID from '../../queries/tagBundlebyID';
import './Bundle.scss';

const Bundle = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [skipPages, setSkipPages] = useState(0);

  const { id } = useParams();

  const { dataID } = getProfileID();

  const { dataPag } = usePagination(id);

  const handleChange = (event, value) => {
    setSkipPages((value - 1) * 10);
    setCurrentPage(value);
  };

  const { tagBundle, loading, error } = tagBundlebyID(id, skipPages);

  if (loading)
    return (
      <div className="login-box">
        <img className="logo" src="/assets/img/logo.png" />
        <Box sx={{ justifyContent: 'center', display: 'flex', marginTop: '10px' }}>
          <CircularProgress />
        </Box>
      </div>
    );
  if (error) return <div>error</div>;

  return (
    <>
      <div className="bundle">
        <div className="bundle__left">
          <div className="bundle__name">
            <h3>Nazwa:</h3>
            <p>{tagBundle.name}</p>
          </div>
          <div className="bundle__desc">
            <h3>Opis:</h3>
            <p>
              {tagBundle.description}
              {dataID?._id === tagBundle.creatorId && (
                <EditBundleDesc editDesc={tagBundle.description} bundleID={id} />
              )}
            </p>
          </div>
        </div>
        <div className="bundle__right">
          {tagBundle.tags.length > 0 && <h3>Tagi:</h3>}
          <ul className="bundle__list">
            {tagBundle.tags.map((tag) => {
              return <li key="">{tag.name}</li>;
            })}
          </ul>
          <div className="pagination">
            {tagBundle.tags.length > 0 && (
              <Stack spacing={2}>
                <Pagination
                  count={dataPag?.pageInfo.pageCount}
                  page={currentPage}
                  onChange={handleChange}
                />
              </Stack>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bundle;
