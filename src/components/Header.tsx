import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles, Link, Typography, Hidden} from '@material-ui/core';

import Logo from './Logo';

const useHeaderStyles = makeStyles((theme) => ({
  headerContainer: {
    height: 80,
    justifyContent: 'space-between',
  },
  logo: {
    width: 160,
    height: 'auto',
  },
  menuItems: {
    margin: theme.spacing(1.5),
  },
}));

const Header = (): React.ReactElement => {
  const classes = useHeaderStyles();
  return (
    <AppBar color="inherit" position="static">
      <Toolbar className={classes.headerContainer}>
        <Logo />
        <Hidden xsDown>
          <Typography variant="subtitle1">
            <Link color="initial" className={classes.menuItems}>
              Purchages
            </Link>
            <Link color="initial" className={classes.menuItems}>
              My Orders
            </Link>
            <Link color="initial" className={classes.menuItems}>
              Sell
            </Link>
          </Typography>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
