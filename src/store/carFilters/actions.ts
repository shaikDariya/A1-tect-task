import {Dispatch} from 'react';
import {
  FETCH_COLORS_REQ,
  FETCH_COLORS_SUCCESS,
  FETCH_MANUFACTURERS_REQ,
  FETCH_MANUFACTURERS_SUCCESS,
  FETCH_MANUFACTURERS_FAILED,
} from './constants';
import {fetchColorsApi, fetchManufacturersApi} from '../../api/cars';

export const listColors = () => async (dispatch: Dispatch<any>): Promise<void> => {
  dispatch({type: FETCH_COLORS_REQ});
  try {
    const {colors} = await fetchColorsApi();
    dispatch({type: FETCH_COLORS_SUCCESS, payload: colors});
  } catch (err) {
    dispatch({type: FETCH_COLORS_REQ});
  }
};

export const listManufacturers = () => async (dispatch: Dispatch<any>): Promise<void> => {
  dispatch({type: FETCH_MANUFACTURERS_REQ});
  try {
    const {manufacturers} = await fetchManufacturersApi();
    dispatch({type: FETCH_MANUFACTURERS_SUCCESS, payload: manufacturers});
  } catch (err) {
    dispatch({type: FETCH_MANUFACTURERS_FAILED});
  }
};
