import {initalState} from '.';
import {CarStateType, CarListActions} from './types';
import {FETCH_CARS_REQ, FETCH_CARS_SUCCESS, FETCH_CARS_FAILED, SET_FILTERS} from './constants';

export default (state = initalState, action: CarListActions): CarStateType => {
  switch (action.type) {
    case FETCH_CARS_REQ:
      return {...state, isLoading: true};
    case FETCH_CARS_SUCCESS:
      return {...state, data: action.payload, isLoading: false};
    case FETCH_CARS_FAILED:
      return {...state, isLoading: false};
    case SET_FILTERS:
      return {
        ...state,
        filters: {...state.filters, ...action.payload},
      };
    default:
      return state;
  }
};
