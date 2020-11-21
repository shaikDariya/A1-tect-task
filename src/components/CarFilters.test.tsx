import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react';

import CarFilters from './CarFilters';
import {CarsProvider} from '../store/cars/context';
import {fetchColorsApi, fetchManufacturersApi, fetchCarsListApi} from '../mocks/api';
import {mockCarColors, mockManufacturers} from '../mocks';

jest.mock('../api/cars.ts', () => ({
  fetchCarsListApi: jest.fn(),
  fetchColorsApi: jest.fn(),
  fetchManufacturersApi: jest.fn(),
}));

const rendeCarFilters = () =>
  render(
    <CarsProvider>
      <CarFilters />
    </CarsProvider>,
  );

const DEFAULT_COLOR_LABEL = 'All Car Colors';
const DEFAULT_MANUFACTURER_LABEL = 'All Manufacturers';
const FILTER_SUBMIT = 'Filter';

describe('CarFilters Component', () => {
  beforeEach(() => {
    (fetchColorsApi as jest.Mock).mockResolvedValue(mockCarColors);
    (fetchManufacturersApi as jest.Mock).mockResolvedValue(mockManufacturers);
  });
  it('Test Labels Colors, Manufacturers, Filters Button', async () => {
    const {queryByText} = rendeCarFilters();
    await waitFor(() => {
      expect(queryByText(DEFAULT_COLOR_LABEL)).toBeInTheDocument();
      expect(queryByText(DEFAULT_MANUFACTURER_LABEL)).toBeInTheDocument();
      expect(queryByText(FILTER_SUBMIT)).toBeInTheDocument();
    });
  });

  it('Fetch the Colors and Manufacturers on First Load', async () => {
    const {queryByText, getByText} = rendeCarFilters();
    const colorSelect = await waitFor(() => getByText(DEFAULT_COLOR_LABEL));
    fireEvent.mouseDown(colorSelect);
    await waitFor(() => expect(queryByText(/white/)).toBeInTheDocument());
    const manufacturerSelect = await waitFor(() => getByText(DEFAULT_MANUFACTURER_LABEL));
    fireEvent.mouseDown(manufacturerSelect);
    await waitFor(() => expect(queryByText(/Fiat/)).toBeInTheDocument());
  });

  it('Fetch Cars List with selected filters', async () => {
    const {getByText} = rendeCarFilters();
    const colorSelect = await waitFor(() => getByText(DEFAULT_COLOR_LABEL));
    fireEvent.mouseDown(colorSelect);
    fireEvent.click(getByText(/white/));
    const manufacturerSelect = await waitFor(() => getByText(DEFAULT_MANUFACTURER_LABEL));
    fireEvent.mouseDown(manufacturerSelect);
    fireEvent.click(getByText(/Fiat/));
    await act(async () => {
      fireEvent.click(getByText(/Filter/));
    });

    expect(fetchCarsListApi).toHaveBeenCalledWith({
      color: 'white',
      manufacturer: 'Fiat',
      page: 1,
      sort: 'asc',
    });
  });
});
