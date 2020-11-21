import React from 'react';
import {render, fireEvent, act} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import CarItem from './CarItem';
import {CarItemType} from '../store/cars/types';
import {mockCarsList} from '../mocks';

const mockCarItem = mockCarsList.cars[0];

const history = createBrowserHistory();
const renderCarItem = (props: CarItemType) =>
  render(
    <Router history={history}>
      <CarItem {...props} />
    </Router>,
  );

describe('CarItem Component', () => {
  it('Should Load all Fields', () => {
    const {container, queryByText} = renderCarItem(mockCarItem);
    expect(container.getElementsByTagName('img')[0].src).toBe(mockCarItem.pictureUrl);
    expect(queryByText(mockCarItem.modelName)).toBeInTheDocument();
    expect(queryByText(mockCarItem.manufacturerName)).toBeInTheDocument();
    expect(queryByText('View details')).toBeInTheDocument();
  });
  it('Click om ViewDetails Should Navigate to Details Page', async () => {
    const {getByText, container} = renderCarItem(mockCarItem);
    act(() => {
      fireEvent.click(getByText('View details'));
    });
    expect(history.location.pathname).toBe(`/cars/${mockCarItem.stockNumber}`);
  });
});
