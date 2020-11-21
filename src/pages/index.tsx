import React from 'react';
import {MuiThemeProvider, Grid, CssBaseline} from '@material-ui/core';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import {theme} from '../utils/theme';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cars from './Cars';
import CarDetails from './CarDetails';
import ErrorPage from './ErrorPage';

const App = (): React.ReactElement => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Grid direction="column" style={{height: '100vh'}} justify="space-between" container wrap="nowrap">
        <Header />
        <Grid item xs container>
          <BrowserRouter>
            <Switch>
              <Route path="/" component={Cars} exact />
              <Route path="/cars/:stockNumber" component={CarDetails} />
              <Route exact path="*" component={ErrorPage} />
            </Switch>
          </BrowserRouter>
        </Grid>
        <Footer />
      </Grid>
    </MuiThemeProvider>
  );
};

export default App;
