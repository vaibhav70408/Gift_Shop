import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import PaymentSuccess from './PaymentSuccess';

test('renders payment success message', () => {
  render(<PaymentSuccess />);
  
  expect(screen.getByRole('heading')).toHaveTextContent('Payment Page');
});