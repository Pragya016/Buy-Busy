import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Media(props) {
  return (
    <Grid container wrap="wrap" style={{width:'fit-content', margin:'auto 10px'}}>
        <Box sx={{ width: 240, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={240} height={250} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
        </Box>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function ProductSkeleton() {
  return (
    <>
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
      <Media />
    </>
  );
}
