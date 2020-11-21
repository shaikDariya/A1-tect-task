import React, {Fragment, useState} from 'react';
import {Typography, Grid, Button} from '@material-ui/core';
import {
  getFavouriteFromLocalStorage,
  saveFavouriteToLocalStorage,
  removeFromFavouriteList,
} from '../utils/browser-storage';

type FavouriteProps = {
  stockNumber: number;
};

const Favourite = ({stockNumber}: FavouriteProps): React.ReactElement => {
  const [isSaved, setIsSaved] = useState(getFavouriteFromLocalStorage(stockNumber));
  const saveToFavourite = (): void => {
    saveFavouriteToLocalStorage(stockNumber);
    setIsSaved(true);
  };
  const removeFromFavourite = (): void => {
    removeFromFavouriteList(stockNumber);
    setIsSaved(false);
  };

  return (
    <Fragment>
      <Typography variant="body1">
        {isSaved
          ? `You can remove it from the favourite collection`
          : `If you like this car, click the button and save it in your collection of favourite items.`}{' '}
      </Typography>
      <Grid container justify="flex-end">
        {isSaved ? (
          <Button variant="contained" color="primary" onClick={removeFromFavourite}>
            Remove
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={saveToFavourite}>
            Save
          </Button>
        )}
      </Grid>
    </Fragment>
  );
};

export default Favourite;
