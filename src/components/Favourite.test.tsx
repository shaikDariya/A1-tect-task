import React from 'react';
import {render, waitFor, fireEvent} from '@testing-library/react';

import Favourite from './Favourite';

const renderFavourite = (stockNumber: number) => render(<Favourite stockNumber={stockNumber} />);

describe('Favourite Component', () => {
  afterAll(() => {
    localStorage.clear();
  });
  it('Show Save Button when given StockNumber is not in the Storage List', async () => {
    const {queryByText} = renderFavourite(123456);
    await waitFor(() => queryByText('Save'));
  });

  it('Saving the StockNumber to the storage', async () => {
    const {queryByText} = renderFavourite(123456);
    const saveBtn = await waitFor(() => queryByText('Save'));
    fireEvent.click(saveBtn as HTMLButtonElement);
    await waitFor(() => queryByText('Remove'));
  });

  it('Show Remove button when StockNumber exist on Storage', async () => {
    const {queryByText} = renderFavourite(123456);
    await waitFor(() => queryByText('Remove'));
  });
});
