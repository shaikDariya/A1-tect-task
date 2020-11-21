import React, {ReactElement, useReducer, createContext, useMemo, useContext} from 'react';

import {initalState} from '.';
import carsReducerFn from './reducer';
import {CarStateType, CarListParamsType} from './types';
import {list, setFilters} from './actions';

type DispatchProviderValues = {
  dispatchCarsList: (filter?: CarListParamsType) => void;
  dispatchSetFilters: (filter: CarListParamsType) => Promise<void>;
};

interface ProviderProps {
  children: React.ReactElement;
}

export const CarsStateContext = createContext<CarStateType>(initalState);
export const CarsDispatchContext = createContext<DispatchProviderValues>({} as DispatchProviderValues);

const CarsProvider = ({children}: ProviderProps): ReactElement => {
  const [carsState, dispatch] = useReducer(carsReducerFn, initalState);

  function dispatchCarsList(filter?: CarListParamsType): Promise<void> {
    return list(filter)(dispatch);
  }

  function dispatchSetFilters(filter: CarListParamsType): Promise<void> {
    return setFilters(filter)(dispatch);
  }

  const dispatchers: DispatchProviderValues = useMemo(() => ({dispatchCarsList, dispatchSetFilters}), []);

  return (
    <CarsDispatchContext.Provider value={dispatchers}>
      <CarsStateContext.Provider value={carsState}>{children}</CarsStateContext.Provider>
    </CarsDispatchContext.Provider>
  );
};

const useCarStateContext = () => useContext(CarsStateContext);
const useCarDispatchContext = () => useContext(CarsDispatchContext);

export {CarsProvider, useCarStateContext, useCarDispatchContext};
