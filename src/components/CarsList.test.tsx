import React from 'react';
import {render, fireEvent, waitFor, act} from '@testing-library/react';

import CarsList from './CarsList';
import {CarsProvider} from '../store/cars/context';
import {mockCarsList} from '../mocks';
import {BrowserRouter} from 'react-router-dom';
import {fetchCarsListApi} from '../api/cars';

// Mocking Fetch List Api.
jest.mock('../api/cars.ts', () => ({
  fetchCarsListApi: jest.fn(),
}));

const renderCarList = () =>
  render(
    <BrowserRouter>
      <CarsProvider>
        <CarsList></CarsList>
      </CarsProvider>
    </BrowserRouter>,
  );

describe('CarList Component', () => {
  beforeEach(() => {
    (fetchCarsListApi as jest.Mock).mockResolvedValue(mockCarsList);
  });
  it('should render CarsLit with mockCarsList', async () => {
    const showingCount = 10;
    const totalCount = mockCarsList.totalCarsCount;
    const {queryByText, container} = renderCarList();
    await waitFor(() => {
      expect(queryByText('Available Cars')).toBeInTheDocument();
      expect(queryByText(`Showing ${showingCount} of ${totalCount} results`)).toBeInTheDocument();
      const carditems = container.querySelectorAll('.MuiCard-root');
      expect(carditems.length).toBe(mockCarsList.cars.length);
    });
  });

  it('Paggaintion Prev, Next Page Navigation Should Work with Mock CarList', async () => {
    const showingCount = 10;
    const totalCount = mockCarsList.totalCarsCount;
    const {queryByText, getByText} = renderCarList();
    const nextPage = await waitFor(() => getByText(/Next/i));
    act(() => {
      fireEvent.click(nextPage);
    });

    const prevPage = await waitFor(() => {
      expect(fetchCarsListApi).toHaveBeenNthCalledWith(2, {
        page: 2,
        manufacturer: '',
        color: '',
        sort: 'asc',
      });
      expect(queryByText('2 of 10')).toBeInTheDocument();
      return getByText(/Prev/i);
    });

    act(() => {
      fireEvent.click(prevPage);
    });

    await waitFor(() => {
      expect(fetchCarsListApi).toHaveBeenNthCalledWith(3, {
        page: 1,
        manufacturer: '',
        color: '',
        sort: 'asc',
      });
      expect(queryByText('1 of 10')).toBeInTheDocument();
    });
  });

  it('Paggaintion Last First Page Navigation & Disable Navigation Check', async () => {
    (fetchCarsListApi as jest.Mock).mockResolvedValue(mockCarsList);
    const showingCount = 10;
    const totalCount = mockCarsList.totalCarsCount;
    const totalPages = mockCarsList.totalPageCount;
    const {queryByText, getByText} = renderCarList();
    const lastPage = await waitFor(() => getByText(/Last/i));
    act(() => {
      fireEvent.click(lastPage);
    });
    await waitFor(() => {
      expect(fetchCarsListApi).toHaveBeenNthCalledWith(2, {
        page: 10,
        manufacturer: '',
        color: '',
        sort: 'asc',
      });
      expect(queryByText(`${totalPages} of ${totalPages}`)).toBeInTheDocument();
      expect(getByText(/Last/i)).toBeDisabled();
      expect(getByText(/Next/i)).toBeDisabled();
    });
    const firstPage = await waitFor(() => getByText(/First/i));

    act(() => {
      fireEvent.click(firstPage);
    });

    await waitFor(() => {
      expect(fetchCarsListApi).toHaveBeenNthCalledWith(3, {
        page: 1,
        manufacturer: '',
        color: '',
        sort: 'asc',
      });
      expect(queryByText(`1 of ${totalPages}`)).toBeInTheDocument();
      expect(getByText(/First/i)).toBeDisabled();
      expect(getByText(/Prev/i)).toBeDisabled();
    });
  });
});
