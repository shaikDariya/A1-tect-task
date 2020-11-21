import React, {useEffect, Fragment} from 'react';
import {Typography, Box, Paper, Grid} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';

import CarItem from './CarItem';
import Paggination from './Paggination';
import {useCarDispatchContext, useCarStateContext} from '../store/cars/context';
import {CarItemType} from '../store/cars/types';

const renderHeadingSkelton = (): React.ReactElement => (
  <Box marginBottom={2}>
    <Skeleton variant="text" width="20%" height="32px" />
    <Skeleton variant="text" width="40%" height="18px" />
  </Box>
);

const renderCarCardSkelton = (): React.ReactElement => (
  <Fragment>
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
      <Paper variant="outlined" key={`s-card-${i}`}>
        <Box padding={3}>
          <Grid container>
            <Grid item xs={2}>
              <Skeleton animation="pulse" variant="rect" width={100} height={80} />
            </Grid>
            <Grid item xs={10}>
              <Skeleton animation="pulse" variant="text" height={32} />
              <Skeleton animation="pulse" variant="text" height={18} />
              <Skeleton animation="pulse" variant="text" height={14} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    ))}
  </Fragment>
);

const CarsList = (): React.ReactElement => {
  const {dispatchCarsList, dispatchSetFilters} = useCarDispatchContext();
  const {
    isLoading,
    data: {cars, totalCarsCount, totalPageCount},
    filters,
  } = useCarStateContext();

  useEffect((): void => {
    dispatchCarsList();
  }, []);

  const handlePageChange = async (page: number): Promise<void> => {
    await dispatchSetFilters({
      ...filters,
      page,
    });
  };

  const currentCount = (filters.page || 1) * 10;
  const showingCount = currentCount > totalCarsCount ? totalCarsCount : currentCount;

  return (
    <div data-testid="cars-list">
      {isLoading ? (
        renderHeadingSkelton()
      ) : (
        <Fragment>
          <Typography variant="subtitle2">Available Cars</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {filters.page && `Showing ${showingCount} of ${totalCarsCount} results`}
          </Typography>
        </Fragment>
      )}
      <Box marginRight={3} marginBottom={3}>
        {isLoading ? (
          renderCarCardSkelton()
        ) : (
          <Fragment>
            {cars.map((car: CarItemType, index: number) => (
              <CarItem {...car} key={`card-${index}`} />
            ))}
            <Paggination page={filters.page} count={totalPageCount} onPageChange={handlePageChange} />
          </Fragment>
        )}
      </Box>
    </div>
  );
};

export default CarsList;
