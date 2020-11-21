import React from 'react';
import Cars from './Cars';
import {BrowserRouter} from 'react-router-dom';
import {render} from '@testing-library/react';

const renderCars = () =>
  render(
    <BrowserRouter>
      <Cars></Cars>
    </BrowserRouter>,
  );

describe('Cars Component', () => {
  it('Load CarFilters, CarsList Component', () => {
    const {queryByText, queryByTestId} = renderCars();
    expect(queryByText(/Color/)).toBeInTheDocument();
    expect(queryByTestId('cars-list')).toBeInTheDocument();
  });
});
