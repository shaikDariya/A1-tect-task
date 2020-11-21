import React, {useState, useEffect, Fragment, ReactElement} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Box, Grid, makeStyles, Typography} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';

import {fetchCarDetailsApi} from '../api/cars';
import Favourite from '../components/Favourite';
import {CarItemType} from '../store/cars/types';

const useCarDetailStyles = makeStyles((theme) => ({
  imageContainer: {
    backgroundColor: '#EDEDED',
    textAlign: 'center',
    padding: theme.spacing(1.5),
    height: 300,
    '& img': {
      width: 'auto',
      height: '100%',
    },
  },
  contentContainer: {
    maxWidth: 800,
    width: '100%',
    margin: theme.spacing(1.5),
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  favouriteContainer: {
    padding: theme.spacing(3),
    maxWidth: 320,
    maxHeight: 150,
    border: `1px solid ${theme.palette.divider}`,
  },
}));

const CarDetails = () => {
  const classes = useCarDetailStyles();
  const history = useHistory();
  const {stockNumber} = useParams<{stockNumber: string}>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [car, setCar] = useState<CarItemType>();

  const fetchCarDetails = async (stockNumber: number) => {
    try {
      const {car: carDetails} = await fetchCarDetailsApi(stockNumber);
      setCar(carDetails);
      setLoading(false);
    } catch (error) {
      if (error && error.response && error.response.status === 404) {
        history.push('/404');
      }
    }
  };

  const renderSubTitle = (): ReactElement => (
    <Typography variant="subtitle1" gutterBottom>
      {`Stock # ${car?.stockNumber} - ${car?.mileage.number} - `}
      <span className={classes.upperCase}>{`${car?.mileage.unit} - `}</span>
      <span className={classes.capitalize}>{car?.fuelType}</span>
      {` - ${car?.mileage.number} - `}
      <span className={classes.capitalize}>{car?.color}</span>
    </Typography>
  );

  useEffect(() => {
    fetchCarDetails(Number(stockNumber));
  }, []);

  return (
    <Grid container justify="center">
      <Grid item xs={12} className={classes.imageContainer}>
        {!isLoading && car ? (
          <img src={car.pictureUrl} />
        ) : (
          <Skeleton height={270} variant="rect" animation="wave" />
        )}
      </Grid>
      <Grid item container className={classes.contentContainer}>
        <Grid item sm={12} md={7}>
          <Box marginRight={2}>
            {!isLoading && car ? (
              <Fragment>
                <Typography variant="h4" gutterBottom>
                  {car.modelName}
                </Typography>
                {renderSubTitle()}
                <Typography variant="body1" gutterBottom>
                  {`This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather conditions.`}
                </Typography>
              </Fragment>
            ) : (
              <Skeleton height={150} variant="rect" />
            )}
          </Box>
        </Grid>
        <Grid item className={classes.favouriteContainer} sm={12} md={5}>
          {!isLoading && car ? (
            <Favourite stockNumber={Number(stockNumber)} />
          ) : (
            <Skeleton height={100} variant="rect" />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarDetails;
