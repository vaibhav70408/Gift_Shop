import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminHomePage from './HomeComponent';
import { BrowserRouter as Router } from 'react-router-dom';

jest.mock('./DisplayHome/DisplayHome', () => () => <div>Mock DisplayComponent</div> );

test('renders search input box with placeholder', () => {
  render(<Router><AdminHomePage /></Router>);
  expect(screen.getByPlaceholderText('🔍 Search Gifts')).toBeInTheDocument();
});

test('updates search value on change', () => {
  render(<Router><AdminHomePage /></Router>);
  fireEvent.change(screen.getByPlaceholderText('🔍 Search Gifts'), {
    target: { value: 'New Value' },
  });
  expect(screen.getByPlaceholderText('🔍 Search Gifts')).toHaveValue('New Value');
});

test('renders a mock version of the DisplayComponent', () => {
  render(<Router><AdminHomePage /></Router>);
  expect(screen.getByText('Mock DisplayComponent')).toBeInTheDocument();
});