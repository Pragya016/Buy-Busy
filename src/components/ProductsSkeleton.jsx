import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

function Media(props) {
  return (
    <Grid container wrap="wrap" style={{width:'fit-content', margin:'auto 30px',maxWidth : '80%' }}>
        <Box sx={{ width: 240, marginRight: 0.5, my: 5 }}>
            <Skeleton variant="rectangular" width={230} height={220} />
            <Box sx={{ pt: 0.5 }}>
              <Skeleton width="100%" />
              <Skeleton width="35%" />
              <Skeleton width="50%" />
            </Box>
        </Box>
    </Grid>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function ProductsSkeleton() {
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
