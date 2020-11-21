import React from 'react';
import {renderHook, act} from '@testing-library/react-hooks';
import {CarsProvider, useCarStateContext, useCarDispatchContext} from './context';
import {fetchCarsListApi} from '../../api/cars';
import {mockCarsList} from '../../mocks';
import {CarListParamsType} from './types';

jest.mock('../../api/cars.ts', () => ({
  fetchCarsListApi: jest.fn(),
}));

const wrapper = ({children}: any) => <CarsProvider>{children}</CarsProvider>;

describe('CarsStore', () => {
  it('Test DispatchCarsList Should toggle loading while fethcing and store data in state', async () => {
    (fetchCarsListApi as jest.Mock).mockResolvedValue(mockCarsList);
    const {result, rerender, waitForNextUpdate} = renderHook(
      () => ({
        state: useCarStateContext(),
        dispatch: useCarDispatchContext(),
      }),
      {wrapper},
    );
    expect(result.current.state.isLoading).toBeFalsy();
    act(() => {
      result.current.dispatch.dispatchCarsList();
    });
    expect(result.current.state.isLoading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.state.isLoading).not.toBeTruthy();
    expect(result.current.state.data).toEqual(mockCarsList);
  });

  it('dispatchSetFilters should save filters and fetch cars list with new filters', async () => {
    (fetchCarsListApi as jest.Mock).mockResolvedValue(mockCarsList);
    const {result, waitForNextUpdate} = renderHook(
      () => ({
        state: useCarStateContext(),
        dispatch: useCarDispatchContext(),
      }),
      {wrapper},
    );
    const filetrs: CarListParamsType = {
      color: 'red',
      manufacturer: 'Fiat',
      sort: 'asc',
      page: 1,
    };
    expect(result.current.state.data.cars.length).toBe(0);
    act(() => {
      result.current.dispatch.dispatchSetFilters(filetrs);
    });
    await waitForNextUpdate();
    expect(result.current.state.filters).toEqual(filetrs);
    expect(result.current.state.data.cars.length).toBe(100);
  });
});
