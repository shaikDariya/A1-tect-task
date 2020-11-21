import {FETCH_CARS_REQ, FETCH_CARS_SUCCESS, FETCH_CARS_FAILED, SET_FILTERS} from './constants';

export type CarItemType = {
  color: string;
  fuelType: string;
  manufacturerName: string;
  mileage: {number: number; unit: string};
  modelName: string;
  pictureUrl: string;
  stockNumber: number;
};

export type CarListResponseType = {
  cars: CarItemType[];
  totalPageCount: number;
  totalCarsCount: number;
};

export type CarListParamsType = {
  manufacturer?: string;
  color?: string;
  sort?: 'asc' | 'des';
  page?: number;
};

export type CarStateType = {
  isLoading: boolean;
  data: {
    cars: CarItemType[];
    totalPageCount: number;
    totalCarsCount: number;
  };
  filters: CarListParamsType;
};

/**
 * Action Types
 */

// Fetch Cars Action Types.
type FetchCarsListReq = {
  type: typeof FETCH_CARS_REQ;
};

type FetchCarsListFailed = {
  type: typeof FETCH_CARS_FAILED;
};

type FetchCarsListSuccess = {
  type: typeof FETCH_CARS_SUCCESS;
  payload: CarListResponseType;
};

export type FetchCarsListAction = FetchCarsListReq | FetchCarsListSuccess | FetchCarsListFailed;

// Set Filters Action Types.
export type SetFiltersAction = {
  type: typeof SET_FILTERS;
  payload: CarListParamsType;
};

export type CarListActions = FetchCarsListAction | SetFiltersAction;
