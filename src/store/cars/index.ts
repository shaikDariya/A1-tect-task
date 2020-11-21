import {CarStateType} from './types';

export const initalState: CarStateType = {
  isLoading: false,
  data: {
    cars: [],
    totalCarsCount: 0,
    totalPageCount: 0,
  },
  filters: {
    manufacturer: '',
    color: '',
    sort: 'asc',
    page: 1,
  },
};
