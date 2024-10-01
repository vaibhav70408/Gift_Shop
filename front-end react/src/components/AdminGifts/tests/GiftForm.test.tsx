import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import * as AdminGiftsService from '../../../services/AdminGiftsService';
import GiftsForm from '../GiftsForm';
import { setGifts, setShowAddGiftForm, setEditGiftId, setEditGiftData } from '../../../reduxStore/slices/adminGiftsSlice';
import resetGiftData from '../../../common/constants/resetEditGiftData';

jest.mock('../../../services/AdminGiftsService');

describe('GiftsForm', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const mockStore = configureMockStore();

  beforeEach(() => {
    store = mockStore({
      gifts: {
        formType: 'ADD',
        editGiftId: null,
        editGiftData: null
      }
    });

    (AdminGiftsService.addGift as jest.Mock) = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    (AdminGiftsService.getAllGifts as jest.Mock) = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: [] }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders form correctly', async () => {
    render(
      <Provider store={store}>
        <GiftsForm />
      </Provider>
    );

    const giftNameInput = screen.getByPlaceholderText(/Enter the gift name/i);
    const giftPriceInput = screen.getByPlaceholderText(/Enter the gift price/i);
    const giftImageUrlInput = screen.getByPlaceholderText(/Enter the gift image url/i);
    const giftDetailsInput = screen.getByPlaceholderText(/Enter the gift details/i);
    const submitButton = await screen.findByText(/^Add$/i);

    expect(giftNameInput).toBeInTheDocument();
    expect(giftPriceInput).toBeInTheDocument();
    expect(giftImageUrlInput).toBeInTheDocument();
    expect(giftDetailsInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('dispatches setGifts, setShowAddGiftForm, setEditGiftId, and setEditGiftData on form submission', async () => {
    render(
      <Provider store={store}>
        <GiftsForm />
      </Provider>
    );

    fireEvent.input(screen.getByPlaceholderText(/Enter the gift name/i), {
      target: { value: 'Test Gift' },
    });
    fireEvent.input(screen.getByPlaceholderText(/Enter the gift price/i), {
      target: { value: '10' },
    });
    fireEvent.input(screen.getByPlaceholderText(/Enter the gift image url/i), {
      target: { value: 'https://test.com/test.jpg' },
    });
    fireEvent.input(screen.getByPlaceholderText(/Enter the gift details/i), {
      target: { value: 'Test details' },
    });

    const addBtn = await screen.findByText(/^Add$/i);
    fireEvent.click(addBtn);

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[2]).toEqual(setGifts([]));
    });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[3]).toEqual(setShowAddGiftForm(false));
    });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(setEditGiftId(null));
    });

    await waitFor(() => {
      const actions = store.getActions();
      expect(actions[1]).toEqual(setEditGiftData(resetGiftData));
    });
  });
});