import axios from 'axios';

import urls from './url';
import {CarListParamsType, CarListResponseType, CarItemType} from '../store/cars/types';
import {ColorResponse, ManufacturersResponse} from '../store/carFilters/types';

export const fetchCarsListApi = async (filter: CarListParamsType): Promise<CarListResponseType> => {
  const response = await axios.get(urls.cars.list, {
    params: {
      ...filter,
    },
  });
  return response.data;
};

export const fetchColorsApi = async (): Promise<ColorResponse> => {
  const response = await axios.get(urls.colors);
  return response.data;
};

export const fetchManufacturersApi = async (): Promise<ManufacturersResponse> => {
  const response = await axios.get(urls.manufacturers);
  return response.data;
};

export const fetchCarDetailsApi = async (stockNumber: number): Promise<{car: CarItemType}> => {
  const response = await axios.get(urls.cars.details(stockNumber));
  return response.data;
};
