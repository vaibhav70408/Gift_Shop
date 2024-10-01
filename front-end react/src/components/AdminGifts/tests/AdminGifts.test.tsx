import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import { setFormType, setShowAddGiftForm } from '../../../reduxStore/slices/adminGiftsSlice';
import * as AdminGiftsService from '../../../services/AdminGiftsService';
import AdminGifts from '../AdminGifts';

jest.mock('../../../services/AdminGiftsService');

describe('AdminGifts', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const mockStore = configureMockStore();

  beforeEach(() => {
    store = mockStore({
      gifts: { gifts: [] }
    });

    (AdminGiftsService.getAllGifts as jest.Mock) = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ data: ['gift1', 'gift2'] }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    render(
      <Provider store={store}>
        <AdminGifts />
      </Provider>
    );

    const element = await screen.findByText(/Add Gift/i);
    expect(element).toBeInTheDocument();
  });

  it('dispatches setFormType and setShowAddGiftForm when Add Gift button is clicked', async () => {
    render(
      <Provider store={store}>
        <AdminGifts />
      </Provider>
    );
    jest.spyOn(store, 'dispatch');
    const addGiftButton = await screen.findByText(/Add Gift/i);
    fireEvent.click(addGiftButton);

    const actions = store.getActions();
    expect(actions[1]).toEqual(setFormType('ADD'));
    expect(actions[2]).toEqual(setShowAddGiftForm(true));
  });
});