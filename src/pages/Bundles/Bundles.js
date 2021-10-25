import React from "react";
import "../Bundle/Bundle.scss";
import getAllTagBundles from "../../queries/getAllTagBundles";
import { Box } from "@mui/system";
import CircularProgress from "@mui/material/CircularProgress";
import { Link } from "react-router-dom";

const Bundle = () => {
  const { data, loading, error } = getAllTagBundles();

  if (loading)
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  if (error) return <div>error</div>;

  return (
    <>
      <ul className="bundle-list">
        {data.map((singleTagBundle) => {
          return (
            <Link
              key={singleTagBundle._id}
              to={`/dashboard/bundle/${singleTagBundle._id}`}
            >
              <li>
                {singleTagBundle.name}
                <span>{singleTagBundle.description}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
};

export default Bundle;
