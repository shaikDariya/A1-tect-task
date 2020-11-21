import {
  FETCH_COLORS_REQ,
  FETCH_COLORS_SUCCESS,
  FETCH_COLORS_FAILED,
  FETCH_MANUFACTURERS_REQ,
  FETCH_MANUFACTURERS_FAILED,
  FETCH_MANUFACTURERS_SUCCESS,
} from './constants';

export type ColorResponse = {
  colors: string[];
};

export type Manufacturer = {
  name: string;
  models: {
    name: string;
  }[];
};

export type ManufacturersResponse = {
  manufacturers: Manufacturer[];
};

/**
 * Car Filter State Types
 */

export type CarFilterState = {
  colors: {
    isLoading: boolean;
    data: string[];
  };
  manufacturers: {
    isLoading: boolean;
    data: Manufacturer[];
  };
};

/**
 * Action Types
 */

// Colors Action Types.
type ListColorsReq = {
  type: typeof FETCH_COLORS_REQ;
};
type ListColorsSuccess = {
  type: typeof FETCH_COLORS_SUCCESS;
  payload: ColorResponse['colors'];
};
type ListColorsFailed = {
  type: typeof FETCH_COLORS_FAILED;
};
export type ListColorsAction = ListColorsReq | ListColorsSuccess | ListColorsFailed;

// Manufacturer Action Types.

type ListManufacturersReq = {
  type: typeof FETCH_MANUFACTURERS_REQ;
};

type ListManufacturersSuccess = {
  type: typeof FETCH_MANUFACTURERS_SUCCESS;
  payload: ManufacturersResponse['manufacturers'];
};

type ListManufacturersFailed = {
  type: typeof FETCH_MANUFACTURERS_FAILED;
};

export type ListManufacturersAction =
  | ListManufacturersReq
  | ListManufacturersSuccess
  | ListManufacturersFailed;

export type CarFilterActionsType = ListColorsAction | ListManufacturersAction;
