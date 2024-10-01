import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchGiftData, { Gift } from '../../../services/HomeComponentService';
import '@testing-library/jest-dom/extend-expect';

import DisplayComponent from './DisplayHome';

jest.mock('../../../services/HomeComponentService');

const mockGiftData: Gift[] = [
  {
    giftName: "Table Frame",
    giftImageUrl: "https://images.pexels.com/photos/5472311/pexels-photo-5472311.jpeg?auto=compress&cs=tinysrgb&w=600",
    giftPrice: 450,
  },
  {
    giftName: "Wall Frames",
    giftImageUrl: "https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&w=600",
    giftPrice: 900,
  }
];

beforeEach(() => {
  (fetchGiftData as jest.Mock).mockImplementationOnce(() => Promise.resolve(mockGiftData));
});

test('renders gifts after successful fetch', async () => {
  render(
    <Router>
      <DisplayComponent giftSearchQuery="" />
    </Router>
  );

  await waitFor(() => expect(screen.getByText('Table Frame')).toBeInTheDocument());
});

test('shows only matching gifts based on search query', async () => {
  render(
    <Router>
      <DisplayComponent giftSearchQuery="Table Frame" />
    </Router>
  );

  await waitFor(() => expect(screen.getByText('Table Frame')).toBeInTheDocument());

  expect(screen.queryByText('Wall Frames')).toBeNull();
});

test('shows error message when fetching fails', async () => {
  (fetchGiftData as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Failed to fetch')));

  render(
    <Router>
      <DisplayComponent giftSearchQuery="" />
    </Router>
  );

  await waitFor(() => expect(screen.getByText('Gift not Available')).toBeInTheDocument());
});