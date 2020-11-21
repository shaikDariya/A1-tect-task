import React from 'react';
import {Avatar, makeStyles} from '@material-ui/core';

const useLogoStyles = makeStyles({
  logo: {
    width: 160,
    height: 'auto',
  },
});

const Logo = (): React.ReactElement => {
  const classes = useLogoStyles();
  return <Avatar variant="square" src="/logo.png" className={classes.logo}></Avatar>;
};

export default Logo;
