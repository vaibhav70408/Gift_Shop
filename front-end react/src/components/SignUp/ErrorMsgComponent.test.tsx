import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ErrorMessage } from './ErrorMsgComponent';

describe('ErrorMessage component tests', () => {
    test('renders error message when "message" prop is passed', () => {
        render(<ErrorMessage message="Test Error Message" />);
        expect(screen.getByText(/Test Error Message/i)).toBeInTheDocument();
    });

    test('does not render when "message" prop is not passed', () => {
        render(<ErrorMessage message="" />);
        expect(screen.queryByText(/./)).not.toBeInTheDocument();
    });
});