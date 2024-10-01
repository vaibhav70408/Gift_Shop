import React from 'react';
import { render, fireEvent, waitFor,getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import EditThemeForm from './EditThemeComponent';
import Theme from "../../common/types/themesData";

jest.mock('axios');
console.error = jest.fn();

describe('EditThemeForm component', () => {
    const theme: Theme = {
        themeId: '1',
        themeName: 'TestTheme',
        themeDetails: 'Theme Details',
        themePrice: 100 
    };

    const onClose = jest.fn();
    const onThemeUpdated = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test('renders without crashing', () => {
        render(<EditThemeForm theme={theme} onClose={onClose} onThemeUpdated={onThemeUpdated} />);
    });

    test('handles error when updating theme fails', async () => {
        (axios.put as jest.Mock).mockRejectedValue(new Error('Test error'));
        const { getByText } = render(<EditThemeForm theme={theme} onClose={onClose} onThemeUpdated={onThemeUpdated} />);
        fireEvent.click(getByText('Update'));
        await waitFor(() => {
            expect(console.error).toHaveBeenCalled(); 
        });
    });

test('populates the form with initial data', () => {
  const { getByDisplayValue } = render(<EditThemeForm theme={theme} onClose={onClose} onThemeUpdated={onThemeUpdated} />);
  expect(getByDisplayValue('TestTheme')).toBeInTheDocument();
  expect(getByDisplayValue('100')).toBeInTheDocument();
  expect(getByDisplayValue('Theme Details')).toBeInTheDocument();
});

test('displays success message and calls onThemeUpdated on successful theme update', async () => {
    (axios.put as jest.Mock).mockResolvedValueOnce({ data: {} });
    const { getByText } = render(<EditThemeForm theme={theme} onClose={onClose} onThemeUpdated={onThemeUpdated} />);
    fireEvent.click(getByText('Update'));
    await waitFor(() => {
        expect(getByText('Theme Updated Successfully !')).toBeInTheDocument();
        expect(onThemeUpdated).toHaveBeenCalled(); 
    });
  });

  test('displays error message for invalid theme price input', async () => {
    const { getByTestId, getByText } = render(<EditThemeForm theme={theme} onClose={onClose} onThemeUpdated={onThemeUpdated} />);
    fireEvent.change(getByTestId('enterThemePrice'), { target: { value: 'invalid' } });
    await waitFor(() => {
        expect(getByText('Please enter a valid number !')).toBeInTheDocument();
    });
  });  

  test('updates state correctly on input changes', () => {
    const { getByTestId } = render(<EditThemeForm theme={theme} onClose={onClose} onThemeUpdated={onThemeUpdated} />);
    fireEvent.change(getByTestId('enterThemeName'), { target: { value: 'New Theme Name' } });
    fireEvent.change(getByTestId('enterThemePrice'), { target: { value: '200' } });
    fireEvent.change(getByTestId('enterThemeDescription'), { target: { value: 'New Theme Description' } });
    
    expect((getByTestId('enterThemeName') as HTMLInputElement).value).toBe('New Theme Name');
    expect((getByTestId('enterThemePrice') as HTMLInputElement).value).toBe('200');
    expect((getByTestId('enterThemeDescription') as HTMLTextAreaElement).value).toBe('New Theme Description');
  });

});