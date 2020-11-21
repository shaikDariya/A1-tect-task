import {
  FETCH_COLORS_REQ,
  FETCH_COLORS_SUCCESS,
  FETCH_COLORS_FAILED,
  FETCH_MANUFACTURERS_REQ,
  FETCH_MANUFACTURERS_SUCCESS,
  FETCH_MANUFACTURERS_FAILED,
} from './constants';
import {CarFilterActionsType, CarFilterState} from './types';

export const initalState: CarFilterState = {
  colors: {
    isLoading: false,
    data: [],
  },
  manufacturers: {
    isLoading: false,
    data: [],
  },
};

const filterReducer = (state: CarFilterState, action: CarFilterActionsType): CarFilterState => {
  switch (action.type) {
    case FETCH_COLORS_REQ:
      return {...state, colors: {isLoading: true, data: []}};
    case FETCH_COLORS_SUCCESS:
      return {...state, colors: {isLoading: false, data: action.payload}};
    case FETCH_COLORS_FAILED:
      return {...state, colors: {...state.colors, isLoading: false}};
    case FETCH_MANUFACTURERS_REQ:
      return {...state, manufacturers: {isLoading: true, data: []}};
    case FETCH_MANUFACTURERS_SUCCESS:
      return {...state, manufacturers: {isLoading: false, data: action.payload}};
    case FETCH_MANUFACTURERS_FAILED:
      return {...state, manufacturers: {...state.manufacturers, isLoading: false}};
    default:
      return initalState;
  }
};

export default filterReducer;
