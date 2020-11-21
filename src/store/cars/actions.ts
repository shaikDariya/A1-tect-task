import {Dispatch} from 'react';
import {fetchCarsListApi} from '../../api/cars';
import {CarListParamsType, CarListActions, FetchCarsListAction} from './types';
import {FETCH_CARS_REQ, FETCH_CARS_FAILED, FETCH_CARS_SUCCESS, SET_FILTERS} from './constants';

export const list = (filter: CarListParamsType = {}) => {
  return async (dispatch: Dispatch<FetchCarsListAction>) => {
    dispatch({type: FETCH_CARS_REQ});
    try {
      const carsList = await fetchCarsListApi(filter);
      dispatch({type: FETCH_CARS_SUCCESS, payload: carsList});
    } catch {
      dispatch({type: FETCH_CARS_FAILED});
    }
  };
};

export const setFilters = (filter: CarListParamsType) => async (
  dispatch: Dispatch<CarListActions>,
): Promise<void> => {
  dispatch({type: SET_FILTERS, payload: filter});
  list(filter)(dispatch);
};
