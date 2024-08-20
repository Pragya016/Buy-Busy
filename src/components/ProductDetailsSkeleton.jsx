import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function ProductDetailsSkeleton() {
return (
    <Grid container wrap="wrap" spacing={2} style={{ width: 'fit-content', margin: 'auto 10px' }}>
        
      <Grid item>
        <Box sx={{ width: 240, my: 11, marginLeft:'30px' }}>
          <Skeleton variant="rectangular" width={450} height={450} />
        </Box>
      </Grid>
      
      <Grid item>
        <Box sx={{ width: 450, marginTop:'70px', marginBottom:'10px', marginLeft:'225px' }}>
          <Skeleton variant="text" sx={{ fontSize: '2.5rem', width:'200px' }} style={{position:'relative', top:'25px'}}/>
          <Skeleton variant="text" sx={{ fontSize: '4rem', width:'600px' }} style={{position:'relative', top:'17px'}} />
          <Skeleton variant="text" sx={{ fontSize: '1.8rem', width:'800px' }} style={{position:'relative', top:'8px'}}/>
          <Skeleton variant="text" sx={{ fontSize: '5rem', width:'150px'}} />
          <Skeleton variant="text" sx={{ fontSize: '2em', width:'180px' }} style={{position:'relative', top:'5px'}}/>
          <Skeleton variant="text" sx={{ fontSize: '8em', width:'800px' }} style={{position:'relative', bottom:'25px'}}/>
          
          <Grid container justifyContent="space-between" style={{width:'500px', position:'relative', bottom:'30px'}}>
            <Skeleton variant="text" sx={{ fontSize: '3.5rem', width: '48%' }} />
            {/* <Skeleton variant="text" sx={{ fontSize: '3.5rem', width: '48%' }} /> */}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}
