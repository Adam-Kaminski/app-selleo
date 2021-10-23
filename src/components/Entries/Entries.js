import React from "react";
import useAllEntries from "../../queries/useAllEntries";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Entries = () => {
  const { data, loading, error } = useAllEntries();

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>error</div>;

  return (
    <div>
      <h1>My entries</h1>
      {data.map((singleEntry) => {
        console.log(singleEntry);
        return (
          <div key={singleEntry._id}>
            <span>startTime: {singleEntry.startTime}</span>
            <span>endTime: {singleEntry.endTime}</span>
            <span>Tag: {singleEntry.tag?.name}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Entries;
