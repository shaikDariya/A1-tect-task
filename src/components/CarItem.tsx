import React from 'react';
import {Grid, Avatar, makeStyles, Typography, Link, Card, CardContent, CardMedia} from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import {CarItemType} from '../store/cars/types';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0`,
    padding: `${theme.spacing(1.5)}px ${theme.spacing(3)}px`,
  },
  mediaContainer: {
    width: 100,
    height: '100%',
  },
  fallbackImage: {
    fontSize: 100,
    color: theme.palette.text.primary,
  },
  contentContainer: {
    width: `calc(100% - 100px)`,
    padding: `0  0  0 ${theme.spacing(2)}px`,
  },
}));

const CarItem = (props: CarItemType) => {
  const {pictureUrl, modelName, manufacturerName, stockNumber} = props;
  const classes = useStyles();
  return (
    <Card variant="outlined" className={classes.root}>
      <Grid container wrap="nowrap" alignItems="center">
        <CardMedia
          component={() => (
            <Avatar variant="square" className={classes.mediaContainer} src={pictureUrl}>
              <BrokenImageIcon className={classes.fallbackImage} />
            </Avatar>
          )}
        />
        <CardContent className={classes.contentContainer}>
          <Typography variant="subtitle2" gutterBottom noWrap>
            {modelName}
          </Typography>
          <Typography variant="body1" gutterBottom noWrap>
            {manufacturerName}
          </Typography>
          <Typography>
            <Link component={RouterLink} variant="body2" to={`/cars/${stockNumber}`}>
              View details
            </Link>
          </Typography>
        </CardContent>
      </Grid>
    </Card>
  );
};

export default CarItem;
