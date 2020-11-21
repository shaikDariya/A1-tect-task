import React, {useReducer, useEffect, Dispatch} from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';

import filterReducer, {initalState} from '../store/carFilters/reducer';
import {useCarDispatchContext, useCarStateContext} from '../store/cars/context';
import {listColors, listManufacturers} from '../store/carFilters/actions';
import {Manufacturer, ListColorsAction, ListManufacturersAction} from '../store/carFilters/types';

const useCarFilterStyles = makeStyles({
  formControl: {
    minWidth: '200px',
    width: '100%',
    margin: '10px 0',
  },
});

let colorFilter = 'all';
let manfacturersFilter = 'all';

const handleColorChange = ({}: {}, menu: any) => (colorFilter = menu.props.value);

const handleManfacturerChange = ({}: {}, menu: any) => (manfacturersFilter = menu.props.value);

const CarFilters = (): React.ReactElement => {
  const classes = useCarFilterStyles();
  const [state, dispatch] = useReducer(filterReducer, initalState);
  const {filters} = useCarStateContext();
  const {dispatchSetFilters} = useCarDispatchContext();

  const cleanup = () => {
    colorFilter = 'all';
    manfacturersFilter = 'all';
  };

  useEffect(() => {
    listColors()(dispatch as Dispatch<ListColorsAction>);
    listManufacturers()(dispatch as Dispatch<ListManufacturersAction>);
    return cleanup;
  }, []);

  const handleFilter = (): void => {
    dispatchSetFilters({
      ...filters,
      color: colorFilter === 'all' ? '' : colorFilter,
      manufacturer: manfacturersFilter === 'all' ? '' : manfacturersFilter,
      page: 1,
    });
  };

  return (
    <Paper variant="outlined">
      <Box padding={3}>
        <Grid container direction="column">
          <Grid item>
            <FormControl className={classes.formControl}>
              <Box marginBottom={1}>
                <FormLabel component="legend">Color</FormLabel>
              </Box>
              {state.colors.isLoading ? (
                <Skeleton animation="pulse" variant="rect" height={50} data-testid="color-skelton" />
              ) : (
                <Select variant="outlined" onChange={handleColorChange} defaultValue={colorFilter}>
                  <MenuItem value="all">All Car Colors</MenuItem>
                  {state.colors.data.map((color: string, index: number) => (
                    <MenuItem key={`color-${index}`} value={color}>
                      {color}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl className={classes.formControl}>
              <Box marginBottom={1}>
                <FormLabel component="legend">Manufacturer</FormLabel>
              </Box>
              {state.manufacturers.isLoading ? (
                <Skeleton animation="pulse" variant="rect" height={50} data-testid="manufacturer-skelton" />
              ) : (
                <Select
                  variant="outlined"
                  onChange={handleManfacturerChange}
                  defaultValue={manfacturersFilter}>
                  <MenuItem value="all">All Manufacturers</MenuItem>
                  {state.manufacturers.data.map((manufacturer: Manufacturer, index: number) => (
                    <MenuItem key={`manufacturer-${index}`} value={manufacturer.name}>
                      {manufacturer.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </FormControl>
          </Grid>
          <Grid item justify="flex-end" container>
            <Button color="primary" variant="contained" onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default CarFilters;
