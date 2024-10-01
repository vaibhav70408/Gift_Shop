import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import GiftCard from './Card';

test('should display correct gift details', () => {
    const mockGift = {
        giftName: "Table Frame",
        giftImageUrl: "https://images.pexels.com/photos/5472311/pexels-photo-5472311.jpeg",
        giftPrice: 450,
    };

    render(
        <BrowserRouter>
            <GiftCard {...mockGift} />
        </BrowserRouter>
    );

    expect(screen.getByText(/Table Frame/i)).toBeInTheDocument();
    expect(screen.getByText(/450/i)).toBeInTheDocument();
});