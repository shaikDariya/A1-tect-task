import React from 'react';
import {makeStyles, Typography, AppBar} from '@material-ui/core';

export const useFooterStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: 'white',
    boxShadow: 'none',
    height: 80,
    borderTop: `1px solid ${theme.palette.divider}`,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Footer = (): React.ReactElement => {
  const classes = useFooterStyles();
  return (
    <AppBar className={classes.footer} position="static">
      <Typography variant="body1">© AUTO1 Group 2018</Typography>
    </AppBar>
  );
};

export default Footer;
