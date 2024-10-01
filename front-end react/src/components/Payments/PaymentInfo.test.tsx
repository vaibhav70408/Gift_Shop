import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import PaymentInfo from './PaymentInfo';
import { useLocation, useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

test('renders all elements correctly', () => {
  (useLocation as jest.Mock).mockReturnValue({
    state: { giftName: "Table Frame", giftImageUrl: "https://images.pexels.com/photos/5472311/pexels-photo-5472311.jpeg?auto=compress&cs=tinysrgb&w=600", giftPrice: 450 }
  });

  render(<Router><PaymentInfo /></Router>);
    
  expect(screen.getByText('Table Frame')).toBeInTheDocument();
  expect(screen.getByText('Price: ₹ 450')).toBeInTheDocument();
  expect(screen.getByText('Payment Methods')).toBeInTheDocument();
  expect(screen.getByLabelText('Credit Card')).toBeInTheDocument();
  expect(screen.getByLabelText('Debit Card')).toBeInTheDocument();
});

test('updates the payment method when clicking on radio buttons', () => {
  render(<Router><PaymentInfo /></Router>);

  fireEvent.click(screen.getByLabelText('Credit Card'));
  expect(screen.getByLabelText('Credit Card')).toBeChecked();
  fireEvent.click(screen.getByLabelText('Debit Card'));
  expect(screen.getByLabelText('Debit Card')).toBeChecked();

  fireEvent.click(screen.getByLabelText('Wallet'));
  expect(screen.getByLabelText('Wallet')).toBeChecked();
  
  fireEvent.click(screen.getByLabelText('UPI'));
  expect(screen.getByLabelText('UPI')).toBeChecked();
});

test('submits the form when Pay is clicked', () => {
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);
  (useLocation as jest.Mock).mockReturnValue({
    state: { giftName: "Table Frame", giftImageUrl: "https://images.pexels.com/photos/5472311/pexels-photo-5472311.jpeg?auto=compress&cs=tinysrgb&w=600", giftPrice: 450 }
  });

  render(<Router><PaymentInfo /></Router>);

  fireEvent.click(screen.getByText('Pay'));
  expect(navigate).toHaveBeenCalledWith('/app/paymentsuccess');
});
