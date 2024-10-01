import React from 'react';
import configureMockStore, { MockStoreEnhanced } from 'redux-mock-store';
import resetGiftData from '../../../common/constants/resetEditGiftData';
import { setEditGiftData, setEditGiftId, setShowAddGiftForm } from '../../../reduxStore/slices/adminGiftsSlice';
import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import GiftsFormModal from '../GiftsFormModal';

jest.mock('../../../services/AdminGiftsService');

describe('Gift form modal', () => {
  let store: MockStoreEnhanced<unknown, {}>;
  const mockStore = configureMockStore();

  beforeEach(() => {
    store = mockStore({
      gifts: { showAddGiftForm: true, formType: 'ADD' }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should disptach action on hide click', async () => {
    render(
        <Provider store={store}>
            <GiftsFormModal />
        </Provider>
    );
  
    const closeButton = screen.getByTestId('modal-close-button');
    fireEvent.click(closeButton);

    const actions = store.getActions();
  
    expect(actions[0]).toEqual(setEditGiftId(null));
    expect(actions[1]).toEqual(setEditGiftData(resetGiftData));
    expect(actions[2]).toEqual(setShowAddGiftForm(false));
  });
});