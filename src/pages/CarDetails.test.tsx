import React from 'react';
import {Router} from 'react-router-dom';
import {render, waitFor} from '@testing-library/react';

import CarDetails from './CarDetails';
import {fetchCarDetailsApi} from '../api/cars';
import {mockCarDetails} from '../mocks';
import {createBrowserHistory} from 'history';

jest.mock('../api/cars.ts', () => ({
  fetchCarDetailsApi: jest.fn(),
}));

const history = createBrowserHistory();

const renderCarDetails = () =>
  render(
    <Router history={history}>
      <CarDetails />
    </Router>,
  );

describe('CarDetails Component', () => {
  it('Show Skeltons on Fetching', async () => {
    const {container} = renderCarDetails();
    expect(container.querySelectorAll('.MuiSkeleton-rect').length).toBe(3);
  });

  it('On Api Success Load Car Details', async () => {
    (fetchCarDetailsApi as jest.Mock).mockResolvedValue(mockCarDetails);
    const {queryByText} = renderCarDetails();
    await waitFor(() => {
      expect(queryByText(mockCarDetails.car.modelName)).toBeInTheDocument();
      expect(
        queryByText(
          'This car is currently available and can be delivered as soon as tomorrow morning. Please be aware that delivery times shown in this page are not definitive and may change due to bad weather conditions.',
        ),
      ).toBeInTheDocument();
      expect(queryByText('Save')).toBeInTheDocument();
    });
  });

  it('Fetch fails with 404 error redirect to Error Page', async () => {
    (fetchCarDetailsApi as jest.Mock).mockRejectedValue({
      response: {
        status: 404,
      },
    });
    renderCarDetails();
    await waitFor(() => {
      expect(history.location.pathname).toBe('/404');
    });
  });
});
