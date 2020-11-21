import React from 'react';
import {NavLink} from 'react-router-dom';
import {Grid, makeStyles, Typography, Link, Box} from '@material-ui/core';

import Logo from '../components/Logo';

const useErrorPageStyles = makeStyles((theme) => ({
  contentContainer: {
    height: '100%',
  },
  title: {
    margin: `${theme.spacing(3)}px 0`,
  },
}));

const ErrorPage = (): React.ReactElement => {
  const classes = useErrorPageStyles();
  return (
    <Box height={'100%'}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
        className={classes.contentContainer}>
        <Logo />
        <Typography variant="h4" className={classes.title}>
          404 - Not Found
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Sorry, the page you are looking for does not exist. <br />
        </Typography>
        <Typography variant="subtitle1">
          {`You can always go back to the `}
          <Link component={NavLink} to="/">
            homepage
          </Link>
        </Typography>
      </Grid>
    </Box>
  );
};

export default ErrorPage;
