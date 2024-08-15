import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ProductDetailsSkeleton() {
return (
    <Grid container wrap="wrap" spacing={2} style={{ width: 'fit-content', margin: 'auto 10px' }}>
        
      <Grid item>
        <Box sx={{ width: 240, my: 5, marginLeft:'30px' }}>
          <Skeleton variant="rectangular" width={450} height={500} />
        </Box>
      </Grid>
      
      <Grid item>
        <Box sx={{ width: 450, marginTop:'70px', marginBottom:'20px', marginLeft:'225px' }}>
          <Skeleton variant="text" sx={{ fontSize: '3rem', mb: -1, width:'400px' }} />
          <Skeleton variant="text" sx={{ fontSize: '5rem', mb: -2, width:'400px' }} />
          <Skeleton variant="text" sx={{ fontSize: '1.5rem', mb: 0, width:'800px' }} />
          <Skeleton variant="text" sx={{ fontSize: '5rem', mb: 2, width:'200px'}} />
          <Skeleton variant="text" sx={{ fontSize: '2em', mb: -5, width:'300px' }} />
          <Skeleton variant="text" sx={{ fontSize: '10em', mb: -2, width:'700px' }} />
          
          <Grid container justifyContent="space-between" style={{width:'600px'}}>
            <Skeleton variant="text" sx={{ fontSize: '3.5rem', width: '48%' }} />
            <Skeleton variant="text" sx={{ fontSize: '3.5rem', width: '48%' }} />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
