import React from 'react'

import Grid from '@mui/material/Grid';

import BillingInfoView from './BillingInfoView';

const BillingInfo = () => (
  <Grid container spacing={5} disableEqualOverflow>
    <Grid xs={12} md={12}>
      <BillingInfoView />
    </Grid>
  </Grid>
)

export default BillingInfo