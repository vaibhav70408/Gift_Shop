import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import DeleteThemeForm from './DeleteThemeComponent';
import Theme from "../../common/types/themesData";

jest.mock('axios');

describe('DeleteThemeForm component', () => {
  const onDelete = jest.fn();
  const onCancel = jest.fn();
  const onThemeDeleted = jest.fn();
  
  const theme: Theme = {
    themeId: '1',
    themeName: 'TestTheme',
    themeDetails: 'Theme Details',
    themePrice: 100 
  };
  
  test('renders without crashing', () => {
    render(
      <DeleteThemeForm
        theme={theme}
        onDelete={onDelete}
        onCancel={onCancel}
        onThemeDeleted={onThemeDeleted}
      />
    );
  });

  test('calls onThemeDeleted when Yes button is clicked', async () => {
    (axios.delete as jest.Mock).mockResolvedValue({});
    const { getByText } = render(
      <DeleteThemeForm
        theme={theme}
        onDelete={onDelete}
        onCancel={onCancel}
        onThemeDeleted={onThemeDeleted}
      />
    );
  
    fireEvent.click(getByText('Yes'));
    await waitFor(() => {
      expect(onThemeDeleted).toHaveBeenCalled();
    });
  });

  test('calls onThemeDeleted and onCancel when No button is clicked', () => {
    const { getByText } = render(
      <DeleteThemeForm
        theme={theme}
        onDelete={onDelete}
        onCancel={onCancel}
        onThemeDeleted={onThemeDeleted}
      />
    );

    fireEvent.click(getByText('No'));
    expect(onThemeDeleted).toHaveBeenCalled();
    expect(onCancel).toHaveBeenCalled();
  });
});