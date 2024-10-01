import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { setDeleteGiftId, setGifts, setShowDeleteGiftConfirmation } from '../../../reduxStore/slices/adminGiftsSlice';
import * as AdminGiftsService from '../../../services/AdminGiftsService';
import GiftDeleteConfirmation from '../GiftDeleteConfirmation';
import GiftsData from '../../../common/types/adminGiftsData';

jest.mock('../../../services/AdminGiftsService');

describe('GiftDeleteConfirmation', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const mockStore = configureMockStore();

  const setId = 'testId';
  const mockGifts: GiftsData[] = [
    {
      giftId: '1',
      giftName: 'Gift 1',
      giftImageUrl: 'https://example.com/gift1.jpg',
      giftDetails: 'This is a test gift 1.',
      giftPrice: '10',
      createdAt: '2022-01-01T00:00:00Z',
      updatedAt: '2022-01-01T00:00:00Z'
    },
    {
      giftId: '2',
      giftName: 'Gift 2',
      giftImageUrl: 'https://example.com/gift2.jpg',
      giftDetails: 'This is a test gift 2.',
      giftPrice: '20',
      createdAt: '2022-01-02T00:00:00Z',
      updatedAt: '2022-01-02T00:00:00Z'
    },
  ];

  beforeEach(() => {
    store = mockStore({
      gifts: {
        deleteGiftId: setId,
        showDeleteGiftConfirmation: true
      }
    });

    (AdminGiftsService.deleteGiftById as jest.Mock) = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    (AdminGiftsService.getAllGifts as jest.Mock) = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: mockGifts }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <Provider store={store}>
        <GiftDeleteConfirmation />
      </Provider>
    );

    const element = await screen.findByText(/Are you sure?/i);
    expect(element).toBeInTheDocument();

    const yesButton = await screen.findByText(/Yes/i);
    const noButton = await screen.findByText(/No/i);

    expect(yesButton).toBeInTheDocument();
    expect(noButton).toBeInTheDocument();
  });

  it('dispatches setGifts, setShowDeleteGiftConfirmation and setDeleteGiftId when Yes button is clicked', async () => {
    render(
      <Provider store={store}>
        <GiftDeleteConfirmation />
      </Provider>
    );

    const yesButton = await screen.findByText(/Yes/i);
    fireEvent.click(yesButton);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(setGifts(mockGifts));
    });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual(setShowDeleteGiftConfirmation(false));
    });
  });

  it('dispatches setDeleteGiftId and setShowDeleteGiftConfirmation when No button is clicked', async () => {
    render(
      <Provider store={store}>
        <GiftDeleteConfirmation />
      </Provider>
    );

    const noButton = await screen.findByText(/No/i);
    fireEvent.click(noButton);

    const actions = store.getActions();
    expect(actions[0]).toEqual(setDeleteGiftId(null));
    expect(actions[1]).toEqual(setShowDeleteGiftConfirmation(false));
  });
});