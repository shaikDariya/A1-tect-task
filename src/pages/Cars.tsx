import React, {Fragment} from 'react';
import {Grid, Box} from '@material-ui/core';

import CarFilters from '../components/CarFilters';
import CarsList from '../components/CarsList';
import {CarsProvider} from '../store/cars/context';

const Cars = (): React.ReactElement => (
  <Fragment>
    <Grid item md={4}>
      <Box marginTop={3} marginLeft={3}>
        <CarFilters />
      </Box>
    </Grid>
    <Grid item xs>
      <Box minWidth={200} marginTop={3} marginLeft={3}>
        <CarsList />
      </Box>
    </Grid>
  </Fragment>
);

export default (): React.ReactElement => (
  <CarsProvider>
    <Cars />
  </CarsProvider>
);
